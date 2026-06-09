import {
  Building2,
  Users,
  Heart,
  Calendar,
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
import { getFinancialMetrics } from "@/actions/dashboard/get-financial-metrics";

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

  const financialMetrics =
  await getFinancialMetrics();

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <div className="rounded-xl border p-6">
          <Building2 />

          <p className="mt-3 text-sm text-gray-500">
            Imóveis
          </p>

          <h2 className="text-3xl font-bold">
            {metrics.totalProperties}
          </h2>
        </div>

        <div className="rounded-xl border p-6">
          <Users />

          <p className="mt-3 text-sm text-gray-500">
            Usuários
          </p>

          <h2 className="text-3xl font-bold">
            {metrics.totalUsers}
          </h2>
        </div>

        <div className="rounded-xl border p-6">
          <Calendar />

          <p className="mt-3 text-sm text-gray-500">
            Visitas
          </p>

          <h2 className="text-3xl font-bold">
            {metrics.totalVisits}
          </h2>
        </div>

        <div className="rounded-xl border p-6">
          <Heart />

          <p className="mt-3 text-sm text-gray-500">
            Favoritos
          </p>

          <h2 className="text-3xl font-bold">
            {metrics.totalFavorites}
          </h2>
        </div>

        <div className="rounded-xl border p-6">
            <p className="text-sm text-gray-500">
            Leads
            </p>

            <h2 className="text-3xl font-bold">
                {metrics.totalLeads}
            </h2>
        </div>

        <div className="rounded-xl border p-6">
  <p className="text-sm text-gray-500">
    Valor Total
  </p>

  <h2 className="text-2xl font-bold">
    {financialMetrics.totalValue.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    )}
  </h2>
</div>

<div className="rounded-xl border p-6">
  <p className="text-sm text-gray-500">
    Preço Médio
  </p>

  <h2 className="text-2xl font-bold">
    {financialMetrics.averagePrice.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    )}
  </h2>
</div>
      </div>

      <div className="mb-8 grid gap-8 xl:grid-cols-2">
        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Imóveis por Cidade
          </h2>

          <PropertiesByCityChart
            data={propertiesByCity}
          />
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Imóveis por Tipo
          </h2>

          <PropertiesByTypeChart
            data={propertiesByType}
          />
        </section>
      </div>

      <section className="mb-8 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Visitas por Mês
        </h2>

        <VisitsByMonthChart
          data={visitsByMonth}
        />
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Últimos Imóveis
          </h2>

          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="flex items-center gap-4"
              >
                <img
                  src={
                    property.images[0]
                      ?.imageUrl ||
                    "https://placehold.co/200x200"
                  }
                  alt={property.title}
                  className="h-16 w-16 rounded object-cover"
                />

                <div>
                  <p className="font-medium">
                    {property.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {property.city}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Últimas Visitas
          </h2>

          <div className="space-y-4">
            {visits.map((visit) => (
              <div key={visit.id}>
                <p className="font-medium">
                  {visit.user.name}
                </p>

                <p className="text-sm text-gray-500">
                  {visit.property.title}
                </p>

                <p className="text-xs text-gray-400">
                  {visit.status}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}