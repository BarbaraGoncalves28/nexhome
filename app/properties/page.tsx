import Link from "next/link";

import { searchProperties } from "@/actions/property/search-properties";

type Props = {
  searchParams: Promise<{
    city?: string;
    district?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
    minBedrooms?: string;
    minBathrooms?: string;
    realtorId?: string;
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

      realtorId:
        searchParams.realtorId,

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

      minBedrooms:
        searchParams.minBedrooms
          ? Number(
              searchParams.minBedrooms
            )
          : undefined,

      minBathrooms:
        searchParams.minBathrooms
          ? Number(
              searchParams.minBathrooms
            )
          : undefined,
    });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Imóveis
      </h1>

      {/* FILTROS */}

      <form className="mb-10 grid gap-4 rounded-xl border bg-white p-6 md:grid-cols-4">
        <input
          name="city"
          placeholder="Cidade"
          defaultValue={
            searchParams.city
          }
          className="rounded-lg border p-3"
        />

        <input
          name="district"
          placeholder="Bairro"
          defaultValue={
            searchParams.district
          }
          className="rounded-lg border p-3"
        />

        <select
          name="propertyType"
          defaultValue={
            searchParams.propertyType
          }
          className="rounded-lg border p-3"
        >
          <option value="">
            Tipo
          </option>

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

        <input
          name="minPrice"
          type="number"
          placeholder="Preço mínimo"
          defaultValue={
            searchParams.minPrice
          }
          className="rounded-lg border p-3"
        />

        <input
          name="maxPrice"
          type="number"
          placeholder="Preço máximo"
          defaultValue={
            searchParams.maxPrice
          }
          className="rounded-lg border p-3"
        />

        <input
          name="minBedrooms"
          type="number"
          placeholder="Quartos mínimos"
          defaultValue={
            searchParams.minBedrooms
          }
          className="rounded-lg border p-3"
        />

        <input
          name="minBathrooms"
          type="number"
          placeholder="Banheiros mínimos"
          defaultValue={
            searchParams.minBathrooms
          }
          className="rounded-lg border p-3"
        />

        <button
          className="rounded-lg bg-blue-600 p-3 font-semibold text-white"
        >
          Buscar
        </button>
      </form>

      {/* LISTAGEM */}

      {properties.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          Nenhum imóvel encontrado
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map(
            (property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
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
                    {
                      property.city
                    }
                    {" • "}
                    {
                      property.district
                    }
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
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </main>
  );
}