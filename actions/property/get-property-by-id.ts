"use server";

import { prisma } from "@/lib/prisma";
import type { PropertyType } from "@prisma/client";

export async function getPropertyById(propertyId: string) {
  const property = await prisma.properties.findUnique({
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

  return {
    ...property,

    garageSpots: property.garage_spots,
    propertyType: property.property_type as PropertyType,
    images: property.property_images.map((img) => img.image_url),
  } as const;
}