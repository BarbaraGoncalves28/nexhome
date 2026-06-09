"use server";

import { prisma } from "@/lib/prisma";

export async function getLatestProperties() {
  return prisma.property.findMany({
    include: {
      images: true,
    },

    take: 5,

    orderBy: {
      createdAt: "desc",
    },
  });
}