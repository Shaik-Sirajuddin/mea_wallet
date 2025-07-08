import { DefaultToken } from "@/types/DefaultToken";

export const imageBucket = "https://ramp.meccain.com/uploads";
export const apiBaseUrl = `https://mapi.meccain.com`;
// export const apiBaseUrl = `http://192.168.109.78:8080`;
export const apiKey = "450692dcc1664131acaaf3c58ff2d51a";
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
