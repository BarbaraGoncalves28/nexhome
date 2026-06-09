"use server";

import { prisma } from "@/lib/prisma";

export async function getProperty(
  propertyId: string
) {
  return prisma.property.findUnique({
    where: {
      id: propertyId,
    },

    include: {
      images: true,
    },
  });
}