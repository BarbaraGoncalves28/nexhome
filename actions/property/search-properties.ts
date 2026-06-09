"use server";

import { prisma } from "@/lib/prisma";

type SearchParams = {
  city?: string;
  district?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  realtorId?: string;
};

export async function searchProperties(
  filters: SearchParams
) {
  return prisma.property.findMany({
    where: {
      city: filters.city
        ? {
            contains:
              filters.city,
            mode:
              "insensitive",
          }
        : undefined,

      district:
        filters.district
          ? {
              contains:
                filters.district,
              mode:
                "insensitive",
            }
          : undefined,

      propertyType:
        filters.propertyType
          ? (filters.propertyType as any)
          : undefined,

          ownerId:
            filters.realtorId,

      price: {
        gte:
          filters.minPrice,

        lte:
          filters.maxPrice,
      },

      bedrooms:
        filters.minBedrooms
          ? {
              gte:
                filters.minBedrooms,
            }
          : undefined,

      bathrooms:
        filters.minBathrooms
          ? {
              gte:
                filters.minBathrooms,
            }
          : undefined,
    },

    include: {
      images: true,
      owner: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}