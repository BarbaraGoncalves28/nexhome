"use server";

import { prisma } from "@/lib/prisma";

export async function getPropertiesByType() {
  const properties =
    await prisma.properties.groupBy({
      by: ["property_type"],

      _count: {
        property_type: true,
      },
    });

  return properties.map(
    (property) => ({
      type:
        property.property_type,

      total:
        property._count
          .property_type,
    })
  );
}