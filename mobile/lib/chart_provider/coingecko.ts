import { networkRequest } from "@/hooks/api";
import { ChartDataResponse, ChartProvider, Price } from ".";

class CoinGeckoProvider implements ChartProvider {
  baseUrl = "https://api.coingecko.com/api/v3";
  getId(symbol: string) {
    if (symbol === "MEA") {
      return "mecca";
    }
    if (symbol === "SOL") {
      return "solana";
    }
    throw "Invalid Symbol";
  }
  async fetchChartData(
    symbol: string,
    days: string
  ): Promise<ChartDataResponse> {
    let res = await networkRequest<any>(
      this.baseUrl +
        "/coins/" +
        this.getId(symbol) +
        "/market_chart" +
        "?vs_currency=usd&days=" +
        days
    );
    let response = res.prices;

    let prices: Price[] = [];
    for (let item of response) {
      prices.push(item);
    }
    return {
      prices,
    };
  }
}

export default CoinGeckoProvider;
