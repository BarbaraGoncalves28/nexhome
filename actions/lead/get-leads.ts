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
    return prisma.leads.findMany({
      include: {
        properties: true,
      },

      orderBy: {
        created_at: "desc",
      },
    });
  }

  if (
    user.role === "REALTOR"
  ) {
    return prisma.leads.findMany({
      where: {
        properties: {
          owner_id:
            user.userId,
        },
      },

      include: {
        properties: true,
      },

      orderBy: {
        created_at: "desc",
      },
    });
  }

  return [];
}