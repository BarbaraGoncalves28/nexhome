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

  return prisma.favorite.findMany({
    where: {
      userId:
        user.userId,
    },

    include: {
      property: {
        include: {
          images: true,
        },
      },
    },
  });
}