import express from "express";

import { executeCode } from "../controllers/executeCode.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import executeValidationules from "../validators/executeCode.validators.js";

import { authenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  executeValidationules.executeCode,
  validate,
  executeCode
);

export default router;
