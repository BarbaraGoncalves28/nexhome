"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getVisits() {
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

  if (user.role === "ADMIN") {
    return prisma.visit.findMany({
      include: {
        user: true,
        property: true,
      },

      orderBy: {
        visitDate: "desc",
      },
    });
  }

  if (
    user.role === "REALTOR"
  ) {
    return prisma.visit.findMany({
      where: {
        property: {
          ownerId:
            user.userId,
        },
      },

      include: {
        user: true,
        property: true,
      },

      orderBy: {
        visitDate: "desc",
      },
    });
  }

  return [];
}