"use server";

import { prisma } from "@/lib/prisma";

export async function getLatestProperties() {
  return prisma.properties.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      city: true,
      district: true,
      created_at: true,
      property_images: {
        select: {
          image_url: true,
        },
        take: 1,
      },
    },

    take: 5,

    orderBy: {
      created_at: "desc",
    },
  });
}
