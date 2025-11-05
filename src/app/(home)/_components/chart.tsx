"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A pie chart with a label list";

const _chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

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

//  {
//     sectorName: string;
//     totalPresentValue: number;
//     totalInvestment: number;
//     gainLossPercentage: number;
// }[]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-1">
            <div className="flex gap-2 items-center leading-tight">
              <div className="text-sm">Investments:</div>
              <span className="text-black text-xs font-gilroyMedium">
                {/* {`₹${formatNumberWithLocaleString(entry.value)}`} */}
                {`₹${entry.value}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartPieLabelList({ chartData }: { chartData: unknown }) {
  console.log(chartData);

  const dataWithColor = chartData.map((item) => ({
    ...item,
    fill: chartConfig[item.sectorName]?.color ?? "var(--chart-5)",
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Label List</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  );
}
