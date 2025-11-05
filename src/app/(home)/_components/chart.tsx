"use client";

import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { formatNumber } from "@/lib/utils";

export const description = "A pie chart with a label list";

const chartConfig = {
  sectorName: {
    label: "sectorName",
  },
  Energy: {
    label: "Energy",
    color: "var(--chart-1)",
  },
  Technology: {
    label: "Technology",
    color: "var(--chart-2)",
  },
  Financials: {
    label: "Financials",
    color: "var(--chart-3)",
  },
  Consumer: {
    label: "Consumer",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-1">
            <div className="flex gap-2 items-center leading-tight">
              <div className="text-sm">Investments:</div>
              <span className="text-black text-xs font-gilroyMedium">{`₹ ${formatNumber(entry.value)}`}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartPieLabelList({ chartData }: { chartData: unknown }) {
  const dataWithColor = chartData?.map((item) => ({
    ...item,
    fill: chartConfig?.[item.sectorName]?.color ?? "var(--chart-5)",
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Portfolio Sector Wise</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip content={<CustomTooltip />} />
            <Pie data={dataWithColor} dataKey="totalInvestment" nameKey="sectorName">
              <LabelList
                dataKey="sectorName"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => chartConfig[value]?.label ?? value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
