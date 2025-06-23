import { getCacheData } from "../config/redis";
import { PROVIDER } from "../enums/Provider";
import { IPriceProvider } from "../lib/price_provider";
import { BingXProvider } from "../lib/price_provider/bingx";
import { CoinStoreProvider } from "../lib/price_provider/coinstore";
import { TOKEN } from "../utils/global";
import { CacheKey } from "./cache_keys";
import { PairPrice } from "./PairPrice";

export class PriceProvider {
  static MAP = new Map<number, IPriceProvider>([
    [PROVIDER.BINGX, BingXProvider],
    [PROVIDER.COINSTORE, CoinStoreProvider],
  ]);

  static get(provider: PROVIDER) {
    return this.MAP.get(provider) as IPriceProvider;
  }

  static async getTokenPrice(base: string) {
    let delimeter = "";
    let quote = "USDT";
    if (base === TOKEN.MEA) {
      delimeter = "_";
    } else if (base === TOKEN.SOL) {
      delimeter = "_";
    } else if (base === TOKEN.RECON) {
      delimeter = "";
    } else if (base === TOKEN.FOX9) {
      delimeter = "";
    } else {
      throw "Unsupported base symbol";
    }

    if (quote !== "USDT") {
      throw "Unsupported quote symbol";
    }

    let pair = base + delimeter + quote;
    let priceData = await getCacheData<PairPrice>(CacheKey.symbolPrice(pair));
    //todo : price data can n
    return priceData;
  }
}
