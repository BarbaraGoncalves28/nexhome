"use server";

import { prisma } from "@/lib/prisma";
import type { PropertyType } from "@prisma/client";

export async function getRelatedProperties(propertyId: string) {
  const properties = await prisma.properties.findMany({
    where: {
      id: {
        not: propertyId,
      },
    },

    take: 6,

    orderBy: {
      created_at: "desc",
    },

    select: {
      id: true,
      title: true,
      price: true,
      area: true,
      bedrooms: true,
      bathrooms: true,
      garage_spots: true,
      city: true,
      district: true,
      property_type: true,

      property_images: {
        select: {
          image_url: true,
        },
        take: 5,
      },
    },
  });

  return properties.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    area: p.area,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,

    garage_spots: p.garage_spots,

    property_type:
      p.property_type as PropertyType,

    property_images:
      p.property_images,

    city: p.city,
    district: p.district,
  }));
}