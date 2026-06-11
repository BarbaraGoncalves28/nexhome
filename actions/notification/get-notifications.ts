"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getNotifications() {
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

  return prisma.notification.findMany({
    where: {
      userId:
        user.userId,
    },

    orderBy: {
      created_at: "desc",
    },

    take: 20,
  });
}