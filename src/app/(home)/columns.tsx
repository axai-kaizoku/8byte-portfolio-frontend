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
  peRatio: null;
  latestEarnings: null;
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
    accessorKey: "stockSymbol",
    header: "Symbol",
    cell: ({ row }) => {
      const stockSymbol: string = row.getValue("stockSymbol") ?? "-";
      const url = `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${stockSymbol}`;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {stockSymbol}
        </a>
      );
    },
  },
  {
    accessorKey: "stockName",
    header: "Name",
    cell: ({ row }) => {
      const stockName: string = row.getValue("stockName") ?? "-";
      const url = `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${stockName}`;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {stockName}
        </a>
      );
    },
  },
  {
    accessorKey: "exchange",
    header: "Exchange",
  },
  {
    accessorKey: "sectorName",
    header: "Sector",
  },
  {
    accessorKey: "purchasePrice",
    header: "Purchase Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "investment",
    header: "Investment",
  },
  {
    accessorKey: "portfolioPercentage",
    header: "Portfolio %",
  },
  {
    accessorKey: "cmp",
    header: "CMP",
  },
  {
    accessorKey: "presentValue",
    header: "Present Value",
  },
  {
    accessorKey: "gainLoss",
    header: "Gain/Loss",
  },
  {
    accessorKey: "gainLossPercentage",
    header: "Gain/Loss %",
  },
  {
    accessorKey: "peRatio",
    header: "PE Ratio",
    cell: ({ row }) => (row.getValue("peRatio") ? row.getValue("peRatio") : "-"),
  },
  {
    accessorKey: "latestEarnings",
    header: "Latest Earnings",
    cell: ({ row }) => (row.getValue("latestEarnings") ? row.getValue("latestEarnings") : "-"),
  },
];
