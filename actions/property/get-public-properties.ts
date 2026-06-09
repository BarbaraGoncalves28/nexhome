"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicProperties() {
  return prisma.property.findMany({
    include: {
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}