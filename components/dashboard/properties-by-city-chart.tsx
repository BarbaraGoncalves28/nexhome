"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    city: string;
    total: number;
  }[];
};

export function PropertiesByCityChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <XAxis dataKey="city" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="total" />
      </BarChart>
    </ResponsiveContainer>
  );
}