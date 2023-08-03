import { Router } from "express";
import { resetPassword, changePassword } from "../controllers/auth";
import { signup } from "../controllers/auth";
const { body } = require("express-validator");
const router = Router();

// create reset pass link
router.post("/reset-password", resetPassword);
// reset the password
router.post("/reset-password/:token", changePassword);

router.post(
  "/signup",
  //validate User data using express validator
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

export default router;
