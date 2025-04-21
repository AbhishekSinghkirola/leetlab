import { db } from "../utils/db.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
import {
  generateAccessToken,
  hashPassword,
  generateRefreshToken,
  verifyPassword,
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
    const { refreshToken, refreshTokenExpiry } = await generateRefreshToken();

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

export const loginUserService = async (email, password) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new ApiError(404, "User does not exist.");
    }

    const isValidPassword = await verifyPassword(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      throw new ApiError(401, "Invalid credentials.");
    }

    const accessToken = await generateAccessToken(existingUser.id);
    const { refreshToken, refreshTokenExpiry } = await generateRefreshToken();

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        refreshToken,
        refreshTokenExpiry,
      },
    });

    const data = {
      accessToken,
      refreshToken,
      user: {
        id: existingUser?.id,
        name: existingUser?.name,
        email: existingUser?.email,
        image: existingUser?.image,
      },
    };

    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async (userId) => {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
        refreshTokenExpiry: null,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export const refreshTokenService = async (token) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { refreshToken: token },
    });

    if (!existingUser) {
      throw new ApiError(401, "Invalid refresh token.");
    }

    const accessToken = await generateAccessToken(existingUser.i);
    const { refreshToken, refreshTokenExpiry } = await generateRefreshToken();

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        refreshToken,
        refreshTokenExpiry,
      },
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
