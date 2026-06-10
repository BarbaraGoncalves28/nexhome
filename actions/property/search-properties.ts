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
  orderBy?: "newest" | "price-asc" | "price-desc";
  take?: number;
  skip?: number;
};

export async function searchProperties(
  filters: SearchParams
) {
  const propertyType = filters.propertyType;

  const orderBy =
    filters.orderBy === "price-asc"
      ? {
          price: "asc" as const,
        }
      : filters.orderBy ===
          "price-desc"
        ? {
            price: "desc" as const,
          }
        : {
            createdAt: "desc" as const,
          };

  return prisma.properties.findMany({
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

      property_type: propertyType,

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

    select: {
      id: true,
      title: true,
      price: true,
      area: true,
      bedrooms: true,
      bathrooms: true,
      garageSpots: true,
      city: true,
      district: true,
      propertyType: true,
      images: {
        select: {
          imageUrl: true,
        },
        take: 1,
      },
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          favorites: true,
          visits: true,
          leads: true,
        },
      },
    },

    orderBy,

    take: filters.take,
    skip: filters.skip,
  });
}
