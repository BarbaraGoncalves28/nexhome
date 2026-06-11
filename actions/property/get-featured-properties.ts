"use server";

import { prisma } from "@/lib/prisma";
import type { PropertyType } from "@prisma/client";

export async function getFeaturedProperties() {
  const properties = await prisma.properties.findMany({
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
        take: 1,
      },
    },

    take: 6,

    orderBy: {
      created_at: "desc",
    },
  });

  return properties.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    area: p.area,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,

    garageSpots: p.garage_spots,

    propertyType: p.property_type as PropertyType,

    images: p.property_images.map((img) => ({
      image_url: img.image_url,
    })),

    city: p.city,
    district: p.district,
  }));
}