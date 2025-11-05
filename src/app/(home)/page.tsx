"use client";

import rawData from "@/lib/mock/data.json";
import { getStockData } from "@/server/portfolioActions";
import { useQuery } from "@tanstack/react-query";
import { ChartPieLabelList } from "./_components/chart";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function HomePage() {
  // const { data: mockData } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: fetchUsers,
  // });

  const { data: stockData } = useQuery({
    queryKey: ["stock"],
    queryFn: getStockData,
  });
  console.log(stockData);
  // if (data?.error) {
  //   return <main>An error occured; Error: {data.message}</main>;
  // }

  const data = stockData?.data?.sectors.map((val) => val.holdings).flat(1) ?? [];

  const chartData = rawData.sectors.map((sector) => {
    return {
      sectorName: sector.sectorName,
      totalPresentValue: sector.totalPresentValue,
      totalInvestment: sector.totalInvestment,
      gainLossPercentage: sector.gainLossPercentage,
    };
  });
  return (
    <main className="min-h-screen h-full max-w-7xl mx-auto p-20">
      <h1 className="text-3xl font-semibold">Portfolio Table</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>

      <div>
        <ChartPieLabelList chartData={chartData} />
      </div>
    </main>
  );
}
