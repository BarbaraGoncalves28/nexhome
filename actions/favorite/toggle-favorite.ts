"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function toggleFavorite(
  propertyId: string
) {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")
      ?.value;

  if (!token) {
    return {
      success: false,
    };
  }

  const user =
    verifyToken(token);

  if (!user) {
    return {
      success: false,
    };
  }

  const favorite =
    await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId:
            user.userId,

          propertyId,
        },
      },
    });

  if (favorite) {
    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return {
      success: true,
      favorited: false,
    };
  }

  await prisma.favorite.create({
    data: {
      userId:
        user.userId,

      propertyId,
    },
  });

  return {
    success: true,
    favorited: true,
  };
}