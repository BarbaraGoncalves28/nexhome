"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    type: string;
    total: number;
  }[];
};

export function PropertiesByTypeChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="type"
        />

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}