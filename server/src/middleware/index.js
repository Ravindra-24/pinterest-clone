import { verifyAuthToken } from "../utils/token";

export const authMiddleware = (req, res, next) => {
  try {
    // if (!req.headers.authorization) return next();
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const payload = verifyAuthToken(token);
    if (!payload) {
      return res.status(401).json({
        message: "Invalid or expired token",
        success: false,
        data: null,
      });
    }
    req.user = { id: payload.id };
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};
