import { formatNumber, formatNumberWithLocaleString } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export type Holding = {
  id: string;
  stockSymbol: string;
  stockName: string;
  exchange: string;
  sectorName: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  peRatio: number | null;
  latestEarnings: number | null;
};

export type Sector = {
  sectors: {
    sectorName: string;
    totalInvestment: number;
    totalPresentValue: number;
    gainLoss: number;
    gainLossPercentage: number;
    holdings: Holding[];
  }[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
};

export const columns: ColumnDef<Holding>[] = [
  {
    accessorKey: "stockName",
    header: "Stock Name",
  },
  {
    accessorKey: "purchasePrice",
    header: "Purchase Price",
    cell: ({ row }) => (row.getValue("purchasePrice") ? formatNumber(row.getValue("purchasePrice")) : "-"),
  },
  {
    accessorKey: "quantity",
    header: "Qty",
  },
  {
    accessorKey: "investment",
    header: "Investment",
    cell: ({ row }) => (row.getValue("investment") ? formatNumber(row.getValue("investment")) : "-"),
  },
  {
    accessorKey: "portfolioPercentage",
    header: "Portfolio %",
    cell: ({ row }) => (row.getValue("portfolioPercentage") ? formatNumber(row.getValue("portfolioPercentage")) : "-"),
  },
  {
    accessorKey: "exchange",
    header: "Exchange",
  },
  {
    accessorKey: "cmp",
    header: "CMP",
    cell: ({ row }) => (row.getValue("cmp") ? formatNumber(row.getValue("cmp")) : "-"),
  },
  {
    accessorKey: "presentValue",
    header: "Present Value",
    cell: ({ row }) => (row.getValue("presentValue") ? formatNumber(row.getValue("presentValue")) : "-"),
  },
  {
    accessorKey: "gainLoss",
    header: "Gain/Loss",
    cell: ({ row }) =>
      row.getValue("gainLoss") ? (
        <div className={row.getValue("gainLoss") >= 0 ? "text-green-600" : "text-red-600"}>
          {formatNumber(row.getValue("gainLoss"))}
        </div>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "peRatio",
    header: "PE Ratio",
    cell: ({ row }) => (row.getValue("peRatio") ? row.getValue("peRatio") : "-"),
  },
  {
    accessorKey: "latestEarnings",
    header: "Latest Earnings",
    cell: ({ row }) =>
      row.getValue("latestEarnings") ? formatNumberWithLocaleString(row.getValue("latestEarnings")) : "-",
  },
];
