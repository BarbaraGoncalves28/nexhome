"use server";

import { prisma } from "@/lib/prisma";
import { createNotification } from "@/actions/notification/create-notification";

export async function createLead(
  formData: FormData
) {
  try {
    const propertyId = String(
      formData.get("propertyId")
    );

    const property =
      await prisma.properties.findUnique({
        where: {
          id: propertyId,
        },
        select: {
          ownerId: true,
          title: true,
        },
      });

    if (!property) {
      return {
        success: false,
      };
    }

    const lead =
      await prisma.leads.create({
      data: {
        name: String(
          formData.get("name")
        ),

        email: String(
          formData.get("email")
        ),

        phone: String(
          formData.get("phone")
        ),

        message: String(
          formData.get("message")
        ),

        propertyId,
      },
    });

    await createNotification(
      property.ownerId,
      "Novo Lead",
      `${lead.name} demonstrou interesse em ${property.title}`
    );

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
    };
  }
}
