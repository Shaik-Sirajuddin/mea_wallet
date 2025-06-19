import { Token } from "@/types/Token";

export default {
  getChartData: async (token: Token) => {
    if (token.chartProvider === "coingecko") {
      //fetch from coingecko
    } else {
    }
  },
};
