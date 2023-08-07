import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  login,
  signup,
  validate,
} from "../controllers/auth";
import { User } from "../db";
const { body } = require("express-validator");
const router = Router();

// create reset pass link
router.post("/forgot-password",
body("email").isEmail().withMessage("Please enter a valid email"),
forgotPassword);

// reset the password
router.post("/reset-password/:token",
body("password").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
resetPassword);

router.post(
  "/signup",
  //validate User data using express validator
  body("email").custom(async (value) => await User.findByEmail(value)),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name is required"),
  body("lastName").trim().not().isEmpty().withMessage("Last Name is required"),
  signup
);

router.post(
  "/login",
  //validate User data using express validator
  body("email").isEmail().withMessage("Please enter a valid email"),
  login
);

router.get("/validate/:token", validate)

export default router;
