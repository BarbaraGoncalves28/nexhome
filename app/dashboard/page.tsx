import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  Heart,
  LineChart,
  Target,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

import { getDashboardMetrics } from "@/actions/dashboard/get-dashboard-metrics";
import { getLatestProperties } from "@/actions/dashboard/get-latest-properties";
import { getLatestVisits } from "@/actions/dashboard/get-latest-visits";
import { getPropertiesByCity } from "@/actions/dashboard/get-properties-by-city";
import { getPropertiesByType } from "@/actions/dashboard/get-properties-by-type";
import { getVisitsByMonth } from "@/actions/dashboard/get-visits-by-month";
import { PropertiesByCityChart } from "@/components/dashboard/properties-by-city-chart";
import { PropertiesByTypeChart } from "@/components/dashboard/properties-by-type-chart";
import { VisitsByMonthChart } from "@/components/dashboard/visits-by-month-chart";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "@/lib/formatters";

export default async function DashboardPage() {
  const [
    metrics,
    properties,
    visits,
    propertiesByCity,
    propertiesByType,
    visitsByMonth,
  ] = await Promise.all([
    getDashboardMetrics(),
    getLatestProperties(),
    getLatestVisits(),
    getPropertiesByCity(),
    getPropertiesByType(),
    getVisitsByMonth(),
  ]);

  return (
    <main className="space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white shadow-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.5fr_1fr] lg:p-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
              Visão executiva
            </p>

            <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
              Operação comercial imobiliária em tempo real
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Acompanhe portfólio, funil comercial, visitas e valor de carteira
              com métricas calculadas diretamente no PostgreSQL.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <p className="text-sm text-slate-300">
                Valor em carteira
              </p>
              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(metrics.totalValue)}
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <p className="text-sm text-slate-300">
                Ticket médio
              </p>
              <p className="mt-2 text-2xl font-bold">
                {formatCurrency(metrics.averageTicket)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Building2 />}
          label="Imóveis"
          value={formatNumber(metrics.totalProperties)}
          detail={`${formatPercent(metrics.monthlyGrowth)} no mês`}
        />

        <MetricCard
          icon={<Target />}
          label="Leads"
          value={formatNumber(metrics.totalLeads)}
          detail={`${formatPercent(metrics.leadConversion)} de conversão`}
        />

        <MetricCard
          icon={<Calendar />}
          label="Visitas"
          value={formatNumber(metrics.totalVisits)}
          detail="Agenda comercial"
        />

        <MetricCard
          icon={<Heart />}
          label="Favoritos"
          value={formatNumber(metrics.totalFavorites)}
          detail="Intenção de compra"
        />

        <MetricCard
          icon={<Users />}
          label="Usuários"
          value={formatNumber(metrics.totalUsers)}
          detail="Base total"
        />

        <MetricCard
          icon={<UserCheck />}
          label="Corretores"
          value={formatNumber(metrics.totalRealtors)}
          detail="Equipe comercial"
        />

        <MetricCard
          icon={<Users />}
          label="Clientes"
          value={formatNumber(metrics.totalClients)}
          detail="Contas cliente"
        />

        <MetricCard
          icon={<Wallet />}
          label="Preço médio"
          value={formatCurrency(metrics.averageTicket)}
          detail="Portfólio ativo"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Imóveis por Cidade"
          icon={<LineChart />}
        >
          <PropertiesByCityChart data={propertiesByCity} />
        </Panel>

        <Panel
          title="Imóveis por Tipo"
          icon={<Building2 />}
        >
          <PropertiesByTypeChart data={propertiesByType} />
        </Panel>
      </section>

      <Panel
        title="Visitas por Mês"
        icon={<Calendar />}
      >
        <VisitsByMonthChart data={visitsByMonth} />
      </Panel>

      <section className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Últimos Imóveis"
          icon={<Building2 />}
        >
          <div className="space-y-3">
            {properties.length === 0 ? (
              <EmptyState text="Nenhum imóvel cadastrado ainda." />
            ) : (
              properties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 rounded-lg border border-slate-100 p-3"
                >
                  {property.images[0]?.imageUrl ? (
                    <img
                      src={property.images[0].imageUrl}
                      alt={property.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="grid h-16 w-16 place-items-center rounded-lg bg-slate-100 text-slate-400">
                      <Building2 className="h-6 w-6" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-950">
                      {property.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {property.city} / {property.district}
                    </p>
                  </div>

                  <p className="hidden text-sm font-semibold text-emerald-700 sm:block">
                    {formatCurrency(Number(property.price))}
                  </p>
                </div>
              ))
            )}
          </div>
        </Panel>

        <Panel
          title="Últimas Visitas"
          icon={<Calendar />}
        >
          <div className="space-y-3">
            {visits.length === 0 ? (
              <EmptyState text="Nenhuma visita registrada ainda." />
            ) : (
              visits.map((visit) => (
                <div
                  key={visit.id}
                  className="rounded-lg border border-slate-100 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-950">
                        {visit.user.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {visit.property.title}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {visit.status}
                    </span>
                  </div>

                  <p className="mt-3 flex items-center gap-1 text-sm text-slate-500">
                    <ArrowUpRight className="h-4 w-4" />
                    {visit.visitDate.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))
            )}
          </div>
        </Panel>
      </section>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
          {icon}
        </div>

        <span className="text-xs font-medium text-slate-500">
          {detail}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700">
          {icon}
        </div>

        <h2 className="text-lg font-semibold text-slate-950">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}
