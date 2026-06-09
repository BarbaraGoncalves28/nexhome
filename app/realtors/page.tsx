import Link from "next/link";

import { getRealtors } from "@/actions/realtor/get-realtors";

export default async function RealtorsPage() {
  const realtors =
    await getRealtors();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Corretores
        </h1>

        <p className="mt-2 text-gray-500">
          Conheça nossa equipe de especialistas.
        </p>
      </div>

      {realtors.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          Nenhum corretor encontrado.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {realtors.map(
            (realtor) => (
              <div
                key={realtor.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-xl font-bold">
                    {realtor.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h2 className="font-semibold">
                      {realtor.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {realtor.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-slate-50 p-4">
                  <p className="text-sm text-gray-500">
                    Imóveis cadastrados
                  </p>

                  <p className="text-2xl font-bold">
                    {
                      realtor._count
                        .properties
                    }
                  </p>
                </div>

                <Link
                  href={`/properties?realtorId=${realtor.id}`}
                  className="mt-6 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Ver imóveis
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}