"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function deleteProperty(
  propertyId: string
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
          id: propertyId,
        },
      });

    if (!property) {
      return {
        success: false,
        message:
          "Imóvel não encontrado",
      };
    }

    // CLIENT nunca pode excluir
    if (
      user.role === "CLIENT"
    ) {
      return {
        success: false,
        message:
          "Sem permissão para remover imóveis",
      };
    }

    // REALTOR só pode excluir imóveis dele
    if (
      user.role === "REALTOR" &&
      property.owner_id !==
        user.userId
    ) {
      return {
        success: false,
        message:
          "Sem permissão para remover este imóvel",
      };
    }

    // ADMIN pode excluir qualquer imóvel

    await prisma.properties.delete({
      where: {
        id: propertyId,
      },
    });

    revalidatePath(
      "/dashboard/properties"
    );

    return {
      success: true,
      message:
        "Imóvel removido com sucesso",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Erro ao remover imóvel",
    };
  }
}