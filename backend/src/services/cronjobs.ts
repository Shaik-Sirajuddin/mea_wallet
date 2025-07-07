import nodeCron from "node-cron";
import { setCacheData } from "../config/redis";
import { CacheKey } from "../types/cache_keys";
import { PriceProvider } from "../types/Provider";
import { TOKEN } from "../utils/global";
import raydium from "../lib/quote_provider/raydium";
import Token from "../models/token";
import { deci } from "../utils/decimal";
import { logger } from "../utils/logger";
import { PROVIDER } from "../enums/Provider";

const syncDexTokenPrice = async (base: string) => {
  if (base !== TOKEN.FOX9) {
    throw "Unsupported symbol";
  }

  let from = (await Token.findOne({
    where: {
      symbol: base,
    },
  }))!;
  let to = (await Token.findOne({
    where: {
      symbol: TOKEN.USDT,
    },
  }))!;

  let quote = await raydium.getQuote(
    from.symbol,
    to.symbol,
    deci(
      deci(1)
        .mul(10 ** from.decimals)
        .toFixed(0)
    ),
    from.decimals,
    to.decimals
  );
  if (!quote.routeAvailable || !quote.data) {
    logger.info(
      "Warning : Quote not found for dex token " +
        base +
        " Price sync is delayed for next round"
    );
    return;
  }

  let price = parseFloat(
    deci(quote.data!.outputAmount)
      .div(quote.data!.inputAmount)
      .toFixed(to.decimals)
  );
  let syncedAt = Date.now();
  await setCacheData(
    CacheKey.symbolPrice(base + TOKEN.USDT),
    {
      price,
      syncedAt,
    },
    60
  );
};

const syncTradingPairPrice = async (base: string, quote: string) => {
  let provider: PROVIDER;

  if (base === TOKEN.MEA) {
    provider = PROVIDER.BINGX;
  } else if (base === TOKEN.SOL) {
    provider = PROVIDER.BINGX;
  } else if (base === TOKEN.RECON) {
    provider = PROVIDER.COINSTORE;
    return;
  } else if (base === TOKEN.FOX9) {
    return syncDexTokenPrice(base);
  } else {
    throw "Unsupported base symbol";
  }

  if (quote !== "USDT") {
    throw "Unsupported quote symbol";
  }

  let pair = provider === PROVIDER.BINGX ? base + "_" + quote : base + quote;
  let price = await PriceProvider.get(provider).getPrice(pair);
  let syncedAt = Date.now();
  await setCacheData(
    CacheKey.symbolPrice(pair),
    {
      price,
      syncedAt,
    },
    60
  );
};

const syncTradingPairPrices = async () => {
  let assets = [TOKEN.MEA, TOKEN.RECON, TOKEN.SOL, TOKEN.FOX9];
  for (let asset of assets) {
    syncTradingPairPrice(asset, TOKEN.USDT);
  }
};
export const setUpCronJobs = () => {
  nodeCron.schedule("* * * * * *", () => {
    // syncTradingPairPrices();
  });
};
