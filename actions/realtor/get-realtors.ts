"use server";

import { prisma } from "@/lib/prisma";

export async function getRealtors() {
  return prisma.users.findMany({
    where: {
      role: "REALTOR",
    },

    select: {
      id: true,
      name: true,
      email: true,
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
