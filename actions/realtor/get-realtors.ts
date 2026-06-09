"use server";

import { prisma } from "@/lib/prisma";

export async function getRealtors() {
  return prisma.user.findMany({
    where: {
      role: "REALTOR",
    },

    include: {
      _count: {
        select: {
          properties: true,
        },
      },
    },

    orderBy: {
      name: "asc",
    },
  });
}