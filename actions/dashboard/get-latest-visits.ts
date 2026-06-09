"use server";

import { prisma } from "@/lib/prisma";

export async function getLatestVisits() {
  return prisma.visit.findMany({
    include: {
      property: true,
      user: true,
    },

    take: 5,

    orderBy: {
      createdAt: "desc",
    },
  });
}