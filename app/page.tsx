import Link from "next/link";

import { getFeaturedProperties } from "@/actions/property/get-featured-properties";
import { getPublicStats } from "@/actions/public/get-public-stats";

export default async function HomePage() {
  const properties =
    await getFeaturedProperties();

  const stats =
    await getPublicStats();

  return (
    <main>
      {/* HERO */}

      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-4xl text-5xl font-bold leading-tight">
            Encontre o imóvel ideal
            para você e sua família
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Casas, apartamentos,
            terrenos e imóveis
            comerciais em um só lugar.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/properties"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Ver Imóveis
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-white px-6 py-3 font-semibold"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* BUSCA */}

      <section className="mx-auto -mt-10 max-w-7xl px-6">
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          <form
            action="/properties"
            className="grid gap-4 md:grid-cols-4"
          >
            <input
              name="city"
              placeholder="Cidade"
              className="rounded-lg border p-3"
            />

            <input
              name="district"
              placeholder="Bairro"
              className="rounded-lg border p-3"
            />

            <select
              name="propertyType"
              className="rounded-lg border p-3"
            >
              <option value="">
                Tipo do imóvel
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

            <button
              className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* ESTATÍSTICAS */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-8 text-center">
            <h2 className="text-4xl font-bold">
              {stats.properties}
            </h2>

            <p className="mt-2 text-gray-500">
              Imóveis
            </p>
          </div>

          <div className="rounded-xl border p-8 text-center">
            <h2 className="text-4xl font-bold">
              {stats.realtors}
            </h2>

            <p className="mt-2 text-gray-500">
              Corretores
            </p>
          </div>

          <div className="rounded-xl border p-8 text-center">
            <h2 className="text-4xl font-bold">
              {stats.visits}
            </h2>

            <p className="mt-2 text-gray-500">
              Visitas Agendadas
            </p>
          </div>
        </div>
      </section>

      {/* IMÓVEIS EM DESTAQUE */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Imóveis em Destaque
          </h2>

          <Link
            href="/properties"
            className="font-semibold text-blue-600"
          >
            Ver todos
          </Link>
        </div>

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

                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-semibold">
                    {
                      property.title
                    }
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {
                      property.city
                    }
                    {" • "}
                    {
                      property.district
                    }
                  </p>

                  <p className="mt-4 text-2xl font-bold text-green-600">
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
      </section>

      {/* CTA */}

      <section className="bg-slate-950 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold">
            Pronto para encontrar
            seu próximo imóvel?
          </h2>

          <p className="mt-4 text-slate-300">
            Explore centenas de
            oportunidades disponíveis.
          </p>

          <Link
            href="/properties"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-4 font-semibold"
          >
            Explorar Imóveis
          </Link>
        </div>
      </section>
    </main>
  );
}