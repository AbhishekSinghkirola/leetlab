import express from "express";

import { getMyDetails } from "../controllers/user.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import userValidationRules from "../validators/user.validators.js";

import { authenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.get("/me", authenticate, getMyDetails);

export default router;
