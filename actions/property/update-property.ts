"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

type UpdatePropertyData = {
  id: string;
  title: string;
  description: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  garageSpots: number;
  city: string;
  district: string;
  address: string;
  propertyType:
    | "HOUSE"
    | "APARTMENT"
    | "LAND"
    | "COMMERCIAL";
};

export async function updateProperty(
  data: UpdatePropertyData
) {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get("token")
        ?.value;

    if (!token) {
      return {
        success: false,
        message:
          "Não autorizado",
      };
    }

    const user =
      verifyToken(token);

    if (!user) {
      return {
        success: false,
        message:
          "Sessão inválida",
      }; 
    }

    const property =
      await prisma.properties.findUnique({
        where: {
          id: data.id,
        },
      });

    if (!property) {
      return {
        success: false,
        message:
          "Imóvel não encontrado",
      };
    }

    // CLIENT nunca pode editar
    if (
      user.role === "CLIENT"
    ) {
      return {
        success: false,
        message:
          "Sem permissão para editar imóveis",
      };
    }

    // REALTOR só pode editar imóveis dele
    if (
      user.role === "REALTOR" &&
      property.owner_id !==
        user.userId
    ) {
      return {
        success: false,
        message:
          "Sem permissão para editar este imóvel",
      };
    }

    // ADMIN pode editar qualquer imóvel

    await prisma.properties.update({
      where: {
        id: data.id,
      },

      data: {
        title: data.title,

        description:
          data.description,

        price: data.price,

        area: data.area,

        bedrooms:
          data.bedrooms,

        bathrooms:
          data.bathrooms,

        garage_spots:
          data.garageSpots,

        city: data.city,

        district:
          data.district,

        address:
          data.address,

        property_type:
          data.propertyType,
      },
    });

    revalidatePath(
      "/dashboard/properties"
    );

    revalidatePath(
      `/dashboard/properties/${data.id}`
    );

    return {
      success: true,
      message:
        "Imóvel atualizado com sucesso",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Erro ao atualizar imóvel",
    };
  }
}