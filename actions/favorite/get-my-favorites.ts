"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getMyFavorites() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")
      ?.value;

  if (!token) {
    return [];
  }

  const user =
    verifyToken(token);

  if (!user) {
    return [];
  }

  return prisma.favorites.findMany({
    where: {
      user_id:
        user.userId,
    },

    include: {
      properties: {
        include: {
          property_images: true,
        },
      },
    },
  });
}