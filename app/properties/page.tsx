import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { searchProperties } from "@/actions/property/search-properties";
import { PropertyCard } from "@/components/property/property-card";
import { formatNumber } from "@/lib/formatters";

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
    orderBy?: "newest" | "price-asc" | "price-desc";
    page?: string;
  }>;
};

const PAGE_SIZE = 9;

export default async function PropertiesPage(
  props: Props
) {
  const searchParams =
    await props.searchParams;

  const currentPage = Math.max(
    Number(searchParams.page ?? 1),
    1
  );

  const propertiesResult =
    await searchProperties({
      city: searchParams.city,
      district: searchParams.district,
      propertyType:
        searchParams.propertyType,
      realtorId:
        searchParams.realtorId,
      orderBy:
        searchParams.orderBy ??
        "newest",
      minPrice:
        searchParams.minPrice
          ? Number(searchParams.minPrice)
          : undefined,
      maxPrice:
        searchParams.maxPrice
          ? Number(searchParams.maxPrice)
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
      take: PAGE_SIZE + 1,
      skip:
        (currentPage - 1) *
        PAGE_SIZE,
    });

  const hasNextPage =
    propertiesResult.length >
    PAGE_SIZE;
  const properties =
    propertiesResult.slice(0, PAGE_SIZE);

  const previousHref =
    buildPageHref(searchParams, currentPage - 1);
  const nextHref =
    buildPageHref(searchParams, currentPage + 1);

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              <Building2 className="h-4 w-4" />
              Catálogo
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
              Imóveis disponíveis
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Busque oportunidades reais cadastradas no NexHome, filtre por
              perfil do imóvel e avance pela listagem sem dados simulados.
            </p>
          </div>

          <div className="rounded-lg bg-slate-950 px-5 py-4 text-white">
            <p className="text-sm text-slate-300">
              Página atual
            </p>
            <p className="text-2xl font-bold">
              {formatNumber(currentPage)}
            </p>
          </div>
        </div>
      </section>

      <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 xl:col-span-4">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros combinados
        </div>

        <input
          name="city"
          placeholder="Cidade"
          defaultValue={searchParams.city}
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />

        <input
          name="district"
          placeholder="Bairro"
          defaultValue={searchParams.district}
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />

        <select
          name="propertyType"
          defaultValue={
            searchParams.propertyType
          }
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        >
          <option value="">Todos os tipos</option>
          <option value="HOUSE">Casa</option>
          <option value="APARTMENT">Apartamento</option>
          <option value="LAND">Terreno</option>
          <option value="COMMERCIAL">Comercial</option>
        </select>

        <select
          name="orderBy"
          defaultValue={
            searchParams.orderBy ??
            "newest"
          }
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        >
          <option value="newest">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>

        <input
          name="minPrice"
          type="number"
          placeholder="Preço mínimo"
          defaultValue={
            searchParams.minPrice
          }
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />

        <input
          name="maxPrice"
          type="number"
          placeholder="Preço máximo"
          defaultValue={
            searchParams.maxPrice
          }
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />

        <input
          name="minBedrooms"
          type="number"
          placeholder="Quartos mínimos"
          defaultValue={
            searchParams.minBedrooms
          }
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />

        <input
          name="minBathrooms"
          type="number"
          placeholder="Banheiros mínimos"
          defaultValue={
            searchParams.minBathrooms
          }
          className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
        />

        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 md:col-span-2 xl:col-span-4">
          <Search className="h-4 w-4" />
          Buscar imóveis
        </button>
      </form>

      {properties.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-slate-100 text-slate-500">
            <Search className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-950">
            Nenhum imóvel encontrado
          </h2>
          <p className="mt-2 text-slate-500">
            Ajuste os filtros para ampliar a busca no portfólio cadastrado.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              href={`/properties/${property.id}`}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        {currentPage > 1 ? (
          <Link
            href={previousHref}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Link>
        ) : (
          <span />
        )}

        {hasNextPage ? (
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white"
          >
            Próxima
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </main>
  );
}

function buildPageHref(
  searchParams: Awaited<Props["searchParams"]>,
  page: number
) {
  const params =
    new URLSearchParams();

  Object.entries(searchParams).forEach(
    ([key, value]) => {
      if (
        key !== "page" &&
        value
      ) {
        params.set(key, value);
      }
    }
  );

  params.set("page", String(page));

  return `/properties?${params.toString()}`;
}
