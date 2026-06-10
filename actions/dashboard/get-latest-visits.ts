"use server";

import { prisma } from "@/lib/prisma";

export async function getLatestVisits() {
  return prisma.visit.findMany({
    select: {
      id: true,
      status: true,
      visitDate: true,
      createdAt: true,
      property: {
        select: {
          id: true,
          title: true,
          city: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    take: 5,

    orderBy: {
      createdAt: "desc",
    },
  });
}
