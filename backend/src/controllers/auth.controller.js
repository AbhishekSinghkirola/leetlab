import { ApiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { registerUserService } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const data = await registerUserService({ name, email, password });

  res.cookie("accessToken", data.accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24, // For 1 Day
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", data));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  await loginUserService({ email, password });
  return res.status(200).json(new ApiResponse(200, "Logged in successfully."));
});
