"use server";

import { prisma } from "@/lib/prisma";

export async function getProperties() {
  return prisma.property.findMany({
    include: {
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}