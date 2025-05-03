import {
  createProblemService,
  getProblemsService,
  getProblemByIdService,
  updateProblemService,
  deleteProblemService,
} from "../services/problem.service.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

export const createProblem = asyncHandler(async (req, res) => {
  const newProblem = await createProblemService(req.loggedInUser.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Problem created successfully.", newProblem));
});

export const getProblems = asyncHandler(async (req, res) => {
  const problems = await getProblemsService();
  return res
    .status(200)
    .json(new ApiResponse(200, "Problems fetched successfully.", problems));
});

export const getProblemById = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const problem = await getProblemByIdService(problemId);
  return res
    .status(200)
    .json(new ApiResponse(200, "Problem fetched successfully.", problem));
});

export const updateProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  const updatedProblem = await updateProblemService(problemId, req.body);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Problem updated successfully.", updatedProblem)
    );
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  await deleteProblemService(problemId, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, "Problem deleted successfully."));
});
