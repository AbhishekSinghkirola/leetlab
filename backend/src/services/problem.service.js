import { ApiError } from "../utils/apiError.utils.js";
import { verifyReferenceSolutions } from "../utils/judge0.utils.js";
import { db } from "../utils/db.utils.js";

export const createProblemService = async (userId, problemData) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testcases,
      codeSnippets,
      referenceSolutions,
    } = problemData;

    await verifyReferenceSolutions(referenceSolutions, testcases);

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId,
      },
    });

    return newProblem;
  } catch (error) {
    throw error;
  }
};

export const getProblemsService = async () => {
  try {
    const problems = await db.problem.findMany();

    if (!problems) {
      throw new ApiError(404, "Problems not found.");
    }

    return problems;
  } catch (error) {
    throw error;
  }
};

export const getProblemByIdService = async (problemId) => {
  try {
    const problem = await db.problem.findUnique({ where: { id: problemId } });

    if (!problem) {
      throw new ApiError(404, "Problem not found.");
    }

    return problem;
  } catch (error) {
    throw error;
  }
};

export const updateProblemService = async (problemId, problemData) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = problemData;

  try {
    await verifyReferenceSolutions(referenceSolutions, testcases);

    const updatedProblem = await db.problem.update({
      where: {
        id: problemId,
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });

    return updatedProblem;
  } catch (error) {
    throw error;
  }
};

export const deleteProblemService = async (problemId) => {
  try {
    const existingProblem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!existingProblem) {
      throw new ApiError(404, "Problem does not exist.");
    }

    await db.problem.delete({ where: { id: problemId } });
  } catch (error) {
    throw error;
  }
};
