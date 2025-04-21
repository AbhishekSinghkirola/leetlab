import { db } from "../utils/db.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
import {
  generateAccessToken,
  hashPassword,
  generateRefreshToken,
} from "../utils/hash.utils.js";

export const registerUserService = async ({ email, password, name }) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, "User already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const accessToken = await generateAccessToken(newUser.id);
    const refreshToken = await generateRefreshToken();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);

    await db.user.update({
      where: { id: newUser.id },
      data: {
        refreshToken,
        refreshTokenExpiry,
      },
    });

    const data = {
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        name: newUser?.name,
        email: newUser?.email,
        image: newUser?.image,
        role: newUser.role,
      },
    };

    return data;
  } catch (error) {
    throw error;
  }
};
