import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { getFeaturedProperties } from "@/actions/property/get-featured-properties";
import { getPublicStats } from "@/actions/public/get-public-stats";
import { getRealtors } from "@/actions/realtor/get-realtors";
import { PropertyCard } from "@/components/property/property-card";
import { formatNumber } from "@/lib/formatters";

export default async function HomePage() {
  const [
    properties,
    stats,
    realtors,
  ] = await Promise.all([
    getFeaturedProperties(),
    getPublicStats(),
    getRealtors(),
  ]);

  return (
    <main className="bg-slate-50">
      <section className="bg-slate-950 px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <Building2 className="h-6 w-6 text-cyan-300" />
              NexHome
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Entrar
              </Link>

              <Link
                href="/properties"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                Ver imóveis
              </Link>
            </div>
          </nav>

          <div className="grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
                Plataforma imobiliária premium
              </p>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
                Imóveis, corretores e oportunidades em uma experiência comercial única.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Explore o portfólio real cadastrado no NexHome, encontre o
                imóvel ideal e acione a equipe comercial com rapidez.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Buscar imóveis
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Criar conta
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <form
                action="/properties"
                className="grid gap-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                  <Search className="h-4 w-4" />
                  Busca avançada
                </div>

                <input
                  name="city"
                  placeholder="Cidade"
                  className="rounded-lg border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none"
                />

                <input
                  name="district"
                  placeholder="Bairro"
                  className="rounded-lg border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none"
                />

                <select
                  name="propertyType"
                  className="rounded-lg border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none"
                >
                  <option value="">Tipo do imóvel</option>
                  <option value="HOUSE">Casa</option>
                  <option value="APARTMENT">Apartamento</option>
                  <option value="LAND">Terreno</option>
                  <option value="COMMERCIAL">Comercial</option>
                </select>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    name="minPrice"
                    type="number"
                    placeholder="Preço mínimo"
                    className="rounded-lg border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none"
                  />

                  <input
                    name="maxPrice"
                    type="number"
                    placeholder="Preço máximo"
                    className="rounded-lg border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none"
                  />
                </div>

                <button className="rounded-lg bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">
                  Encontrar oportunidades
                </button>
              </form>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat
              value={formatNumber(stats.properties)}
              label="Imóveis"
            />
            <Stat
              value={formatNumber(stats.realtors)}
              label="Corretores"
            />
            <Stat
              value={formatNumber(stats.visits)}
              label="Visitas agendadas"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Portfólio
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Imóveis em destaque
            </h2>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 font-semibold text-slate-950"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Nenhum imóvel cadastrado ainda.
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
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Operação premium
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Uma jornada imobiliária clara, rápida e confiável.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A experiência pública do NexHome conecta busca, atendimento,
              agendamento e captação de leads sem separar o cliente da equipe
              comercial.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Benefit
              icon={<Search />}
              title="Busca combinada"
              text="Filtros por localização, tipo, preço e características."
            />
            <Benefit
              icon={<CalendarCheck />}
              title="Agenda comercial"
              text="Visitas vinculadas ao imóvel e ao usuário interessado."
            />
            <Benefit
              icon={<BarChart3 />}
              title="Métricas reais"
              text="Indicadores extraídos diretamente do banco de dados."
            />
            <Benefit
              icon={<ShieldCheck />}
              title="Perfis de acesso"
              text="Fluxos separados para admin, corretor e cliente."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Especialistas
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Corretores cadastrados
            </h2>
          </div>

          <Link
            href="/realtors"
            className="hidden items-center gap-2 font-semibold text-slate-950 sm:inline-flex"
          >
            Ver equipe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {realtors.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Nenhum corretor cadastrado ainda.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {realtors.slice(0, 3).map((realtor) => (
              <div
                key={realtor.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white">
                  <Users className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  {realtor.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {realtor.email}
                </p>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  {formatNumber(realtor._count.properties)} imóveis vinculados
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              Pronto para encontrar o próximo imóvel?
            </h2>
            <p className="mt-3 text-slate-300">
              Consulte o catálogo em tempo real e fale com a equipe responsável.
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Explorar catálogo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-5">
      <p className="text-3xl font-bold">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-300">
        {label}
      </p>
    </div>
  );
}

function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-slate-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {text}
      </p>
    </div>
  );
}
