"use server";

import { prisma } from "@/lib/prisma";

export async function getFeaturedProperties() {
  return prisma.property.findMany({
    include: {
      images: true,
    },

    take: 6,

    orderBy: {
      createdAt: "desc",
    },
  });
}