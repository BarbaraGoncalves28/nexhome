"use server";

import { prisma } from "@/lib/prisma";

export async function getLatestVisits() {
  return prisma.visits.findMany({
    select: {
      id: true,
      status: true,
      visit_date: true,
      created_at: true,

      properties: {
        select: {
          id: true,
          title: true,
          city: true,
        },
      },

      users: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    take: 5,

    orderBy: {
      created_at: "desc",
    },
  });
}