"use server";

import { prisma } from "@/lib/prisma";

export async function getProperty(
  propertyId: string
) {
  return prisma.properties.findUnique({
    where: {
      id: propertyId,
    },

    include: {
      property_images: true,
    },
  });
}