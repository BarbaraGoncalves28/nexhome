import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
} from "lucide-react";

import { searchProperties } from "@/actions/property/search-properties";
import { DeletePropertyButton } from "@/components/property/delete-property-button";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyFilters } from "@/components/property/property-filters";
import { formatNumber } from "@/lib/formatters";

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
      city: searchParams.city,
      district:
        searchParams.district,
      propertyType:
        searchParams.propertyType,
      minPrice:
        searchParams.minPrice
          ? Number(searchParams.minPrice)
          : undefined,
      maxPrice:
        searchParams.maxPrice
          ? Number(searchParams.maxPrice)
          : undefined,
    });

  return (
    <main className="space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              <Building2 className="h-4 w-4" />
              Gestão de imóveis
            </p>

            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              Portfólio cadastrado
            </h1>

            <p className="mt-2 text-slate-500">
              Gerencie imóveis, corretores responsáveis e disponibilidade
              comercial.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-xs font-medium uppercase text-slate-500">
                Resultado
              </p>
              <p className="text-xl font-bold text-slate-950">
                {formatNumber(properties.length)}
              </p>
            </div>

            <Link
              href="/dashboard/properties/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Novo Imóvel
            </Link>
          </div>
        </div>
      </section>

      <PropertyFilters
        defaultValues={searchParams}
      />

      {properties.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-slate-100 text-slate-500">
            <Search className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-950">
            Nenhum imóvel encontrado
          </h2>

          <p className="mt-2 text-slate-500">
            Ajuste os filtros ou cadastre uma nova oportunidade.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              href={`/dashboard/properties/${property.id}/edit`}
              manageActions={
                <>
                  <Link
                    href={`/dashboard/properties/${property.id}/edit`}
                    className="flex-1 rounded-lg bg-slate-950 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Editar
                  </Link>

                  <DeletePropertyButton propertyId={property.id} />
                </>
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
