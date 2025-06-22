import { DefaultToken } from "@/types/DefaultToken";

export default {
  getChartData: async (token: DefaultToken) => {
    if (token.chartProvider === "coingecko") {
      //fetch from coingecko
    } else {
    }
  },
};
