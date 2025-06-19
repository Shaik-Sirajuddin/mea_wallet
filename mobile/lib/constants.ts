import { Token } from "@/types/Token";

export const apiBaseUrl = `http://localhost:8080`;
export const tokenList: Token[] = [
  {
    symbol: "MEA",
    chartProvider: "coingecko",
  },
  {
    symbol: "RECON",
    chartProvider: "mea_api",
  },
  {
    symbol: "SOL",
    chartProvider: "coingecko",
  },
];
