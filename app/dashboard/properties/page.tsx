import Link from "next/link";

import { DeletePropertyButton } from "@/components/property/delete-property-button";
import { PropertyFilters } from "@/components/property/property-filters";

import { searchProperties } from "@/actions/property/search-properties";

type Props = {
  searchParams: Promise<{
    city?: string;
    district?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

export default async function PropertiesPage(
  props: Props
) {
  const searchParams =
    await props.searchParams;

  const properties =
    await searchProperties({
      city:
        searchParams.city,

      district:
        searchParams.district,

      propertyType:
        searchParams.propertyType,

      minPrice:
        searchParams.minPrice
          ? Number(
              searchParams.minPrice
            )
          : undefined,

      maxPrice:
        searchParams.maxPrice
          ? Number(
              searchParams.maxPrice
            )
          : undefined,
    });

  return (
    <main className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Imóveis
          </h1>

          <p className="text-gray-500">
            Gerencie os imóveis cadastrados
          </p>
        </div>

        <Link
          href="/dashboard/properties/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Novo Imóvel
        </Link>
      </div>

      <PropertyFilters />

      {properties.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          Nenhum imóvel encontrado
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map(
            (property) => (
              <div
                key={property.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <img
                  src={
                    property.images[0]
                      ?.imageUrl ??
                    "https://placehold.co/600x400"
                  }
                  alt={
                    property.title
                  }
                  className="h-60 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {
                      property.title
                    }
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {property.city} •{" "}
                    {property.district}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Corretor: {property.owner.name}
                  </p>

                  <p className="mt-3 text-xl font-bold text-green-600">
                    {Number(
                      property.price
                    ).toLocaleString(
                      "pt-BR",
                      {
                        style:
                          "currency",
                        currency:
                          "BRL",
                      }
                    )}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/dashboard/properties/${property.id}/edit`}
                      className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
                    >
                      Editar
                    </Link>

                    <DeletePropertyButton
                      propertyId={
                        property.id
                      }
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}