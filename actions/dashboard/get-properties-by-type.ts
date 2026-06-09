"use server";

import { prisma } from "@/lib/prisma";

export async function getPropertiesByType() {
  const properties =
    await prisma.property.groupBy({
      by: ["propertyType"],

      _count: {
        propertyType: true,
      },
    });

  return properties.map(
    (property) => ({
      type:
        property.propertyType,

      total:
        property._count
          .propertyType,
    })
  );
}