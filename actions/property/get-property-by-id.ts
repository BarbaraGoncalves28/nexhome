"use server";

import { prisma } from "@/lib/prisma";

export async function getPropertyById(
  propertyId: string
) {
  const property =
    await prisma.properties.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        property_images: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

  if (!property) return null;

  return property;
}