"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getLeads() {
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
    return prisma.lead.findMany({
      include: {
        property: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (
    user.role === "REALTOR"
  ) {
    return prisma.lead.findMany({
      where: {
        property: {
          ownerId:
            user.userId,
        },
      },

      include: {
        property: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return [];
}