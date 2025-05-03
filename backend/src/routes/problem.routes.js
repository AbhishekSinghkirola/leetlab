import express from "express";

import {
  createProblem,
  getProblems,
  getProblemById,
  deleteProblem,
  updateProblem,
} from "../controllers/problem.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import problemValidatonRules from "../validators/problem.validators.js";

import { authenticate } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  problemValidatonRules.refreshToken,
  validate,
  createProblem
);

router.get("/", authenticate, getProblems);

router.get(
  "/:problemId",
  authenticate,
  problemValidatonRules.getProblemById,
  validate,
  getProblemById
);

router.put(
  "/:problemId",
  authenticate,
  problemValidatonRules.updateProblem,
  validate,
  updateProblem
);

router.delete(
  "/:problemId",
  authenticate,
  problemValidatonRules.deleteProblem,
  validate,
  deleteProblem
);
export default router;
