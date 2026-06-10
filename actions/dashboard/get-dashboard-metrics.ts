"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getDashboardMetrics() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")
      ?.value;

  if (!token) {
    throw new Error(
      "Não autorizado"
    );
  }

  const user =
    verifyToken(token);

  if (!user) {
    throw new Error(
      "Sessão inválida"
    );
  }

  const now = new Date();
  const currentMonthStart =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
  const previousMonthStart =
    new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

  // ADMIN
  if (
    user.role === "ADMIN"
  ) {
const [
  totalProperties,
  totalUsers,
  totalRealtors,
  totalClients,
  totalVisits,
  totalFavorites,
  totalLeads,
  closedLeads,
  monthlyProperties,
  previousMonthlyProperties,
  financialMetrics,
] = await Promise.all([
  prisma.properties.count(),
  prisma.users.count(),
  prisma.users.count({
    where: {
      role: "REALTOR",
    },
  }),
  prisma.users.count({
    where: {
      role: "CLIENT",
    },
  }),
  prisma.visits.count(),
  prisma.favorites.count(),
  prisma.leads.count(),
  prisma.leads.count({
    where: {
      status: "CLOSED",
    },
  }),
  prisma.properties.count({
    where: {
      created_at: {
        gte: currentMonthStart,
      },
    },
  }),
  prisma.properties.count({
    where: {
      created_at: {
        gte: previousMonthStart,
        lt: currentMonthStart,
      },
    },
  }),
  prisma.properties.aggregate({
    _sum: {
      price: true,
    },
    _avg: {
      price: true,
    },
  }),
]);

return {
  totalProperties,
  totalUsers,
  totalRealtors,
  totalClients,
  totalVisits,
  totalFavorites,
  totalLeads,
  leadConversion:
    totalLeads > 0
      ? closedLeads / totalLeads
      : 0,
  totalValue: Number(
    financialMetrics._sum.price ?? 0
  ),
  averageTicket: Number(
    financialMetrics._avg.price ?? 0
  ),
  monthlyGrowth:
    previousMonthlyProperties > 0
      ? (monthlyProperties -
          previousMonthlyProperties) /
        previousMonthlyProperties
      : monthlyProperties > 0
        ? 1
        : 0,
};
  }

  // CLIENT não deveria acessar dashboard
  if (
    user.role === "CLIENT"
  ) {
    throw new Error(
      "Sem permissão"
    );
  }

  // REALTOR

  const [
    totalProperties,
    totalVisits,
    totalFavorites,
    totalLeads,
    closedLeads,
    monthlyProperties,
    previousMonthlyProperties,
    financialMetrics,
  ] = await Promise.all([
    prisma.properties.count({
      where: {
        owner_id:
          user.userId,
      },
    }),

    prisma.visits.count({
      where: {
        properties: {
          owner_id:
            user.userId,
        },
      },
    }),

    prisma.favorites.count({
      where: {
        properties: {
          owner_id:
            user.userId,
        },
      },
    }),

    prisma.leads.count({
      where: {
        properties: {
          owner_id:
            user.userId,
        },
      },
    }),

    prisma.leads.count({
      where: {
        status: "CLOSED",
        property: {
          ownerId:
            user.userId,
        },
      },
    }),

    prisma.properties.count({
      where: {
        ownerId:
          user.userId,
        created_at: {
          gte: currentMonthStart,
        },
      },
    }),

    prisma.properties.count({
      where: {
        ownerId:
          user.userId,
        created_at: {
          gte: previousMonthStart,
          lt: currentMonthStart,
        },
      },
    }),

    prisma.properties.aggregate({
      where: {
        owner_id:
          user.userId,
      },
      _sum: {
        price: true,
      },
      _avg: {
        price: true,
      },
    }),
  ]);

  return {
    totalProperties,

    totalUsers: 0,
    totalRealtors: 0,
    totalClients: 0,

    totalVisits,

    totalFavorites,
    totalLeads,
    leadConversion:
      totalLeads > 0
        ? closedLeads / totalLeads
        : 0,
    totalValue: Number(
      financialMetrics._sum.price ?? 0
    ),
    averageTicket: Number(
      financialMetrics._avg.price ?? 0
    ),
    monthlyGrowth:
      previousMonthlyProperties > 0
        ? (monthlyProperties -
            previousMonthlyProperties) /
          previousMonthlyProperties
        : monthlyProperties > 0
          ? 1
          : 0,
  };
}
