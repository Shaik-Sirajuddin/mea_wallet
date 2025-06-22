import { DefaultToken } from "@/types/DefaultToken";

export const apiBaseUrl = `http://192.168.109.78:8080`;
export const defaultTokenList: DefaultToken[] = [
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
