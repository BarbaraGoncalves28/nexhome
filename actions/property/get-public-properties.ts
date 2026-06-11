"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicProperties() {
  return prisma.properties.findMany({
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
      images: {
        select: {
          image_url: true,
        },
        take: 1,
      },
    },

    orderBy: {
      created_at: "desc",
    },
  });
}
