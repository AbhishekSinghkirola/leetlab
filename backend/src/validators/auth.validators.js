import { body } from "express-validator";

const authValidationRules = {
  register: [
    body("name")
      .exists()
      .withMessage("Name field is required.")
      .notEmpty()
      .withMessage("Name field can not be empty.")
      .isString()
      .withMessage("Name field should be a valid string.")
      .trim(),

    body("email")
      .exists()
      .withMessage("Email field is required.")
      .notEmpty()
      .withMessage("Email field can not be empty.")
      .isEmail()
      .withMessage("Email field should be a valid email address.")
      .normalizeEmail(),

    body("password")
      .exists()
      .withMessage("Password field is required.")
      .notEmpty()
      .withMessage("Password field can not be empty.")
      .isString()
      .withMessage("Password field should be a valid string.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[@$!%*?&]/)
      .withMessage("Password must contain at least one special character")
      .trim(),
  ],

  login: [
    body("email")
      .exists()
      .withMessage("Email field is required.")
      .notEmpty()
      .withMessage("Email field can not be empty.")
      .isEmail()
      .withMessage("Email field should be a valid email address.")
      .normalizeEmail(),

    body("password")
      .exists()
      .withMessage("Password field is required.")
      .notEmpty()
      .withMessage("Password field can not be empty.")
      .isString()
      .withMessage("Password field should be a valid string.")
      .trim(),
  ],

  refreshToken: [
    body("refreshToken")
      .exists()
      .withMessage("Refresh token field is required.")
      .notEmpty()
      .withMessage("Refresh token field can not be empty.")
      .isString()
      .withMessage("Refresh token should be a valid string.")
      .trim(),
  ],
};

export default authValidationRules;
