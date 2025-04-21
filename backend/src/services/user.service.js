import { db } from "../utils/db.utils.js";

export const findUserById = async (userId) => {
  try {
    return await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });
  } catch (error) {
    throw error;
  }
};
