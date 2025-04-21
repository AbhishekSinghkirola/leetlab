import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.utils.js";
import { findUserById } from "../services/user.service.js";

export const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Unauthorized - No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const user = await findUserById(decoded.userId);

      if (!user) {
        throw new ApiError(404, "User does not exist.");
      }
      req.loggedInUser = user;
    } catch (error) {
      throw new ApiError(500, error?.message ?? "Internal processing error.");
    }

    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized - Invalid or expired token");
  }
};
