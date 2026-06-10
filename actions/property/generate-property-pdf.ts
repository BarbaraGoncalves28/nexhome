"use server";

import { prisma } from "@/lib/prisma";

import { PDFDocument } from "pdf-lib";

export async function generatePropertyPdf(
  propertyId: string
) {
  const property =
    await prisma.properties.findUnique({
      where: {
        id: propertyId,
      },
    });

  if (!property) {
    throw new Error(
      "Imóvel não encontrado"
    );
  }

  const pdf =
    await PDFDocument.create();

  const page =
    pdf.addPage([600, 800]);

  page.drawText(
    `Imóvel: ${property.title}`,
    {
      x: 50,
      y: 750,
      size: 18,
    }
  );

  page.drawText(
    `Preço: R$ ${property.price}`,
    {
      x: 50,
      y: 710,
      size: 12,
    }
  );

  page.drawText(
    `Cidade: ${property.city}`,
    {
      x: 50,
      y: 680,
      size: 12,
    }
  );

  page.drawText(
    `Bairro: ${property.district}`,
    {
      x: 50,
      y: 650,
      size: 12,
    }
  );

  page.drawText(
    `Área: ${property.area}m²`,
    {
      x: 50,
      y: 620,
      size: 12,
    }
  );

  page.drawText(
    `Quartos: ${property.bedrooms}`,
    {
      x: 50,
      y: 590,
      size: 12,
    }
  );

  page.drawText(
    `Banheiros: ${property.bathrooms}`,
    {
      x: 50,
      y: 560,
      size: 12,
    }
  );

  page.drawText(
    `Garagem: ${property.garage_spots}`,
    {
      x: 50,
      y: 530,
      size: 12,
    }
  );

  page.drawText(
    property.description,
    {
      x: 50,
      y: 470,
      size: 12,
      maxWidth: 500,
    }
  );

  const pdfBytes =
    await pdf.save();

  return Array.from(
    pdfBytes
  );
}