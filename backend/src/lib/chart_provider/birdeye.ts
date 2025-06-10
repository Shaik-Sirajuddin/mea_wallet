import { ChartDataResponse, ChartProvider, Price } from ".";
import { networkRequest } from "../request";

interface OHLCVStick {
  o: number;
  unixTime: number;
}
interface OHLCVResponse {
  data: {
    items: OHLCVStick[];
  };
}
class BirdEyeProvider implements ChartProvider {
  baseUrl = "https://public-api.birdeye.so";

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
    days: number
  ): Promise<ChartDataResponse> {
    if (symbol !== "RECON") {
      throw "Invalid Symbol";
    }

    let recon = {
      baseAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
      quoteAddress: "FoX9UZETJzXJ2qh6B5g2mBSA9hiWWnLEq1GcHoEEg4fv",
    };

    let interval = "5m";
    if (days >= 1 && days <= 90) {
      interval = "1H";
    } else if (days > 90) {
      interval = "1D";
    }
    let curTimeS = parseInt((Date.now() / 1000).toString());
    let startTimeS = curTimeS - days * 86400;

    let params = new URLSearchParams({
      type: interval,
      base_address: recon.baseAddress,
      quote_address: recon.quoteAddress,
      time_from: startTimeS.toString(),
      time_to: curTimeS.toString(),
    });
    let res = await networkRequest<OHLCVResponse>(
      this.baseUrl + "/defi/ohlcv/base_quote" + "?" + params.toString(),
      {
        headers: {
          "X-API-KEY": "7c9f494e3e634811b37caaf1e2afcb5a",
        },
      }
    );

    if (typeof res === "string") {
      throw res;
    }
    let response = res;

    let prices: Price[] = [];
    for (let item of response.data.items) {
      prices.push({
        price: item.o,
        time: item.unixTime,
      });
    }
    return {
      prices,
    };
  }
}

export default BirdEyeProvider;
