"use client";

import { useState } from "react";

import { updateProperty } from "@/actions/property/update-property";

export default function EditPropertyForm({
  property,
}: any) {
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    formData: FormData
  ) {
    setLoading(true);

    const result =
      await updateProperty({
        id: property.id,

        title:
          formData.get(
            "title"
          ) as string,

        description:
          formData.get(
            "description"
          ) as string,

        price: Number(
          formData.get(
            "price"
          )
        ),

        area: Number(
          formData.get(
            "area"
          )
        ),

        bedrooms: Number(
          formData.get(
            "bedrooms"
          )
        ),

        bathrooms: Number(
          formData.get(
            "bathrooms"
          )
        ),

        garageSpots: Number(
          formData.get(
            "garageSpots"
          )
        ),

        city:
          formData.get(
            "city"
          ) as string,

        district:
          formData.get(
            "district"
          ) as string,

        address:
          formData.get(
            "address"
          ) as string,

        propertyType:
          formData.get(
            "propertyType"
          ) as any,
      });

    setLoading(false);

    alert(result.message);
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Editar Imóvel
      </h1>

      <form
        action={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          defaultValue={
            property.title
          }
          className="w-full rounded border p-3"
        />

        <textarea
          name="description"
          defaultValue={
            property.description
          }
          className="w-full rounded border p-3"
        />

        <input
          name="price"
          type="number"
          defaultValue={
            Number(
              property.price
            )
          }
          className="w-full rounded border p-3"
        />

        <input
          name="area"
          type="number"
          defaultValue={
            property.area
          }
          className="w-full rounded border p-3"
        />

        <input
          name="bedrooms"
          type="number"
          defaultValue={
            property.bedrooms
          }
          className="w-full rounded border p-3"
        />

        <input
          name="bathrooms"
          type="number"
          defaultValue={
            property.bathrooms
          }
          className="w-full rounded border p-3"
        />

        <input
          name="garageSpots"
          type="number"
          defaultValue={
            property.garageSpots
          }
          className="w-full rounded border p-3"
        />

        <input
          name="city"
          defaultValue={
            property.city
          }
          className="w-full rounded border p-3"
        />

        <input
          name="district"
          defaultValue={
            property.district
          }
          className="w-full rounded border p-3"
        />

        <input
          name="address"
          defaultValue={
            property.address
          }
          className="w-full rounded border p-3"
        />

        <select
          name="propertyType"
          defaultValue={
            property.propertyType
          }
          className="w-full rounded border p-3"
        >
          <option value="HOUSE">
            Casa
          </option>

          <option value="APARTMENT">
            Apartamento
          </option>

          <option value="LAND">
            Terreno
          </option>

          <option value="COMMERCIAL">
            Comercial
          </option>
        </select>

        <button
          disabled={loading}
          className="rounded bg-blue-600 px-5 py-3 text-white"
        >
          {loading
            ? "Salvando..."
            : "Salvar Alterações"}
        </button>
      </form>
    </main>
  );
}