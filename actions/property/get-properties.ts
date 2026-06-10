"use server";

import { prisma } from "@/lib/prisma";

export async function getProperties() {
  return prisma.properties.findMany({
    include: {
      property_images: true,
    },

    orderBy: {
      created_at: "desc",
    },
  });
}