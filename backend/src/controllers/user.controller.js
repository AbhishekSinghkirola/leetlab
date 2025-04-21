import { ApiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

import {} from "../services/user.service.js";

export const getMyDetails = asyncHandler(async (req, res) => {
  const { loggedInUser } = req;

  return res
    .status(200)
    .json(
      new ApiResponse(200, "User details fetched successfully.", loggedInUser)
    );
});
