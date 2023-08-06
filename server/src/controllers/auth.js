import { User } from "../db";
import logger from "../logger";
import { comparePassword, hashPassword } from "../utils/auth.utils";
import {
  generateResetToken,
  verifyResetToken,
  generateToken,
} from "../utils/token";
const { validationResult } = require("express-validator");

export const signup = async (req, res) => {
  try {
    // validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        data: errors.array(),
      });
    }
    const { firstName, lastName, email, password } = req.body;
    // create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(201).json({
      message: "Signup successfull",
      success: true,
      data: newUser,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    // validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        data: errors.array(),
      });
    }
    const { email, password } = req.body;
    // create a new user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
        success: false,
        data: null,
      });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
        success: false,
        data: null,
      });
    }
    const token = generateToken({
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      initials: user.initials,
      role: user.role,
    });
    return res.status(201).json({
      message: "Login successfull",
      success: true,
      data: { token },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        data: errors.array(),
      });
    }
    // check if user exists in the DB
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User with this email not found",
        success: false,
        data: null,
      });
    }
    // generate a token and send email
    const token = generateResetToken({
      email,
    });
    const resetPasswordLink = `http://localhost:8080/auth/reset-password/${token}`;
    // send the email
    return res.status(200).json({
      message: "Reset password link sent to email",
      success: true,
      data: { resetPasswordLink, token },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        data: errors.array(),
      });
    }
    const { password } = req.body;
    const { token } = req.params;
    // verify the token
    const payload = verifyResetToken(token);
    if (!payload) {
      return res.status(400).json({
        message: "Invalid or expired token",
        success: false,
        data: null,
      });
    }
    const { email } = payload;
    await User.findOneAndUpdate({ email }, { password });
    
    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
