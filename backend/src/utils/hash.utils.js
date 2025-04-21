import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

export const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

export const generateAccessToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  } catch (error) {
    throw error;
  }
};

export const generateRefreshToken = async () => {
  try {
    return await crypto.randomBytes(32).toString("hex");
  } catch (error) {
    throw error;
  }
};
