"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { resend } from "@/lib/resend";
import { createNotification } from "@/actions/notification/create-notification";

export async function createVisit(
  propertyId: string,
  visitDate: Date,
  notes?: string
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
          "Usuário não autenticado",
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
      await prisma.property.findUnique({
        where: {
          id: propertyId,
        },

        include: {
          owner: true,
        },
      });

    if (!property) {
      return {
        success: false,
        message:
          "Imóvel não encontrado",
      };
    }

    const visit =
      await prisma.visit.create({
        data: {
          propertyId,

          userId:
            user.userId,

          visitDate,

          notes,
        },
      });

      await createNotification(
  property.ownerId,
  "Nova Visita",
  `Uma visita foi agendada para ${property.title}`
);

    const client =
      await prisma.user.findUnique({
        where: {
          id: user.userId,
        },
      });

    if (
      property.owner.email
    ) {
      await resend.emails.send({
        from:
          "NexHome <onboarding@resend.dev>",

        to:
          property.owner.email,

        subject:
          "Nova visita agendada",

        html: `
          <h2>Nova visita agendada</h2>

          <p>
            <strong>Cliente:</strong>
            ${client?.name}
          </p>

          <p>
            <strong>Imóvel:</strong>
            ${property.title}
          </p>

          <p>
            <strong>Data:</strong>
            ${visitDate.toLocaleString(
              "pt-BR"
            )}
          </p>

          <p>
            <strong>Observações:</strong>
            ${
              notes ||
              "Nenhuma"
            }
          </p>
        `,
      });
    }

    return {
      success: true,
      message:
        "Visita agendada com sucesso",
      visitId: visit.id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        "Erro ao agendar visita",
    };
  }
}