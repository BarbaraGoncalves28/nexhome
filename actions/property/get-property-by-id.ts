"use server";

import { prisma } from "@/lib/prisma";

export async function getPropertyById(
  propertyId: string
) {
  return prisma.property.findUnique({
    where: {
      id: propertyId,
    },

    include: {
      images: true,

      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}