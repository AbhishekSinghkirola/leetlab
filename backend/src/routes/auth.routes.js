import express from "express";

import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import authValidationRules from "../validators/auth.validators.js";

import { authenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post("/register", authValidationRules.register, validate, register);

router.post("/login", authValidationRules.login, validate, login);

router.post("/logout", authenticate, logout);

router.post(
  "/refresh-token",
  authValidationRules.refreshToken,
  validate,
  refreshToken
);

export default router;
