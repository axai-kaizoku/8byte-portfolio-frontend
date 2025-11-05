"use client";

import rawData from "@/lib/mock/data.json";
import { cn, formatNumber } from "@/lib/utils";
import { getStockData } from "@/server/portfolioActions";
import { useQuery } from "@tanstack/react-query";
import { ChartPieLabelList } from "./_components/chart";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function HomePage() {
  const {
    data: stockData,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["stock"],
    queryFn: getStockData,
    refetchInterval: 1000 * 15,
  });
  if (stockData?.error || status === "error") {
    return <main>An error occured; Error: {stockData?.message ?? "Unknown Error"}</main>;
  }

  const data = stockData?.data?.sectors.flatMap((val) => val.holdings) ?? [];

  const chartData = rawData.sectors.map((sector) => {
    return {
      sectorName: sector.sectorName,
      totalPresentValue: sector.totalPresentValue,
      totalInvestment: sector.totalInvestment,
      gainLossPercentage: sector.gainLossPercentage,
    };
  });

  return (
    <main className="min-h-screen h-full max-w-7xl mx-auto p-4 lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Portfolio Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Data refreshes automatically every 15 seconds
            <br />
            Note: This data is unofficial and may not be accurate.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChartPieLabelList chartData={chartData} />
        </div>
        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Total Investment</p>
            <p className="text-2xl font-bold text-foreground">
              {`₹ ${formatNumber(stockData?.data?.totalInvestment)}`}
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Total Gain/Loss</p>
            <div className="space-y-1">
              <p
                className={cn(
                  `text-2xl font-bold`,
                  stockData?.data?.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {`₹ ${formatNumber(stockData?.data?.totalGainLoss)}`}
              </p>
              <p
                className={cn(
                  `text-sm font-medium`,
                  stockData?.data?.totalGainLossPercentage >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {stockData?.data?.totalGainLossPercentage >= 0 ? "↑" : "↓"}{" "}
                {stockData?.data?.totalGainLossPercentage?.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">Holdings</p>
            <p className="text-2xl font-bold text-foreground">
              {stockData?.data?.sectors.reduce((acc, sector) => {
                return acc + sector?.holdings?.length;
              }, 0)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
