import { body, param } from "express-validator";

const problemValidatonRules = {
  refreshToken: [
    // body("refreshToken")
    //   .exists()
    //   .withMessage("Refresh token field is required.")
    //   .notEmpty()
    //   .withMessage("Refresh token field can not be empty.")
    //   .isString()
    //   .withMessage("Refresh token should be a valid string.")
    //   .trim(),
  ],

  getProblemById: [
    param("problemId")
      .exists()
      .withMessage("ProblemId field is required.")
      .notEmpty()
      .withMessage("ProblemId field can not be empty.")
      .isString()
      .withMessage("ProblemId should be a valid string.")
      .trim(),
  ],

  updateProblem: [
    param("problemId")
      .exists()
      .withMessage("ProblemId field is required.")
      .notEmpty()
      .withMessage("ProblemId field can not be empty.")
      .isString()
      .withMessage("ProblemId should be a valid string.")
      .trim(),
  ],

  deleteProblem: [
    param("problemId")
      .exists()
      .withMessage("ProblemId field is required.")
      .notEmpty()
      .withMessage("ProblemId field can not be empty.")
      .isString()
      .withMessage("ProblemId should be a valid string.")
      .trim(),
  ],
};

export default problemValidatonRules;
