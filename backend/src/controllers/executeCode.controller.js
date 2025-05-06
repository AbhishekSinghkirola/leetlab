import { executeCodeService } from "../services/executeCode.service.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

export const executeCode = asyncHandler(async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;

  const { loggedInUser } = req;

  const submissionWithTestCases = await executeCodeService(loggedInUser.id, {
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Code executed successfully.",
        submissionWithTestCases
      )
    );
});
