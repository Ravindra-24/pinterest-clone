import { User } from "../db";
import logger from "../logger";
import {
  generateToken,
  generateResetToken,
  verifyResetToken,
  verifyAuthToken,
} from "../utils/token";
import { comparePassword } from "../utils/auth.utils";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import axios from "axios";

const handleResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    message,
    success: status >= 200 && status < 300,
    data,
  });
};

const createUserToken = (user) => {
  return generateToken({
    id: user._id,
    email: user.email,
    profilePicture: user.profilePicture,
    firstName: user.firstName,
    fullName: user.fullName,
    initials: user.initials,
    role: user.role,
  });
};

export const oneTapLogin = async (req, res) => {
  try {
    const { CredentialResponse } = req.body;
    const { credential } = CredentialResponse;
    const userData = jwt.decode(credential);
    const {
      email,
      given_name: firstName,
      family_name: lastName,
      picture: profilePicture,
      jti: password,
    } = userData;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        profilePicture,
        password,
      });
    }
    let loginUser = await User.findOne({ email });
    const token = createUserToken(loginUser);
    return res.status(201).json({
      message: "Login successfull",
      success: true,
      data: {
        token,
        user: {
          id: loginUser._id,
          email: loginUser.email,
          profilePicture: loginUser.profilePicture,
          firstName: loginUser.firstName,
          fullName: loginUser.fullName,
          initials: loginUser.initials,
          role: loginUser.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { codeResponse } = req.body;
    const { access_token } = codeResponse;
    const googleUserInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = googleUserInfoResponse.data;

    const {
      email,
      given_name: firstName,
      family_name: lastName,
      picture: profilePicture,
      password: id,
    } = userData;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        firstName,
        lastName,
        profilePicture,
        password: id,
      });
    }

    const token = createUserToken(user);

    return handleResponse(res, 201, "Login successful", {
      token,
      user: {
        id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        fullName: user.fullName,
        initials: user.initials,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(error);
    return handleResponse(res, 500, error.message);
  }
};

export const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse(res, 400, "Validation failed", errors.array());
    }

    const { firstName, lastName, email, password } = req.body;

    await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return handleResponse(res, 201, "Signup successful");
  } catch (error) {
    logger.error(error);
    return handleResponse(res, 500, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse(res, 400, "Validation failed", errors.array());
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return handleResponse(res, 400, "User with this email does not exist");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return handleResponse(res, 400, "Invalid credentials");
    }

    const token = createUserToken(user);

    return handleResponse(res, 201, "Login successful", {
      token,
      user: {
        id: user._id,
        email: user.email,
        profilePicture: user.profilePicture,
        firstName: user.firstName,
        fullName: user.fullName,
        initials: user.initials,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(error);
    return handleResponse(res, 500, error.message);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse(res, 400, "Validation failed", errors.array());
    }

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return handleResponse(res, 400, "User with this email not found");
    }

    const token = generateResetToken({ email });
    const resetPasswordLink = `http://localhost:3000/reset-password/${token}`;

    return handleResponse(res, 200, "Reset password link sent to email", {
      resetPasswordLink,
      token,
    });
  } catch (error) {
    logger.error(error);
    return handleResponse(res, 500, error.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleResponse(res, 400, "Validation failed", errors.array());
    }

    const { password } = req.body;
    const { token } = req.params;

    const payload = verifyResetToken(token);
    if (!payload) {
      return handleResponse(res, 400, "Invalid or expired token");
    }

    const { email } = payload;
    const user = await User.findOne({ email });
    user.password = password;
    await user.save();

    return handleResponse(res, 200, "Password updated successfully");
  } catch (error) {
    logger.error(error);
    return handleResponse(res, 500, error.message);
  }
};

export const validate = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = verifyAuthToken(token);
    if (!payload) {
      return handleResponse(res, 401, "Invalid or expired token");
    }

    const currentUser = await User.findById(payload.id);

    return handleResponse(res, 200, "User verified", {
      token,
      user: {
        id: currentUser._id,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture,
        firstName: currentUser.firstName,
        fullName: currentUser.fullName,
        initials: currentUser.initials,
        role: currentUser.role,
      },
    });
  } catch (error) {
    logger.error(error);
    return handleResponse(res, 500, error.message);
  }
};
