import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(
      5,
      "Título deve possuir pelo menos 5 caracteres"
    ),

  description: z
    .string()
    .min(
      20,
      "Descrição deve possuir pelo menos 20 caracteres"
    ),

  price: z.coerce
    .number()
    .positive("Preço inválido"),

  area: z.coerce
    .number()
    .positive("Área inválida"),

  bedrooms: z.coerce
    .number()
    .min(0),

  bathrooms: z.coerce
    .number()
    .min(0),

  garageSpots: z.coerce
    .number()
    .min(0),

  city: z
    .string()
    .min(2),

  district: z
    .string()
    .min(2),

  address: z
    .string()
    .min(5),

  latitude: z.coerce
    .number()
    .optional(),

  longitude: z.coerce
    .number()
    .optional(),

  propertyType: z.enum([
    "HOUSE",
    "APARTMENT",
    "LAND",
    "COMMERCIAL",
  ]),
});

export type PropertyFormData =
  z.infer<
    typeof propertySchema
  >;