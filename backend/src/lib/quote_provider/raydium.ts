import Decimal from "decimal.js";
import { TOKEN } from "../../utils/global";
import { API_URLS } from "@raydium-io/raydium-sdk-v2/lib/api/url";
import axios from "axios";
import { deci } from "../../utils/decimal";

const AddressMap = new Map();
AddressMap.set(TOKEN.FOX9, "FoX9UZETJzXJ2qh6B5g2mBSA9hiWWnLEq1GcHoEEg4fv");
AddressMap.set(TOKEN.USDT, "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");

interface SwapResponse {
  id: string;
  success: boolean;
  version: string;
  data?: {
    swapType: "BaseIn" | "BaseOut" | string;
    inputMint: string;
    inputAmount: string;
    outputMint: string;
    outputAmount: string;
    otherAmountThreshold: string;
    slippageBps: number;
    priceImpactPct: number;
    referrerAmount: string;
    routePlan: Array<{
      poolId: string;
      inputMint: string;
      outputMint: string;
      feeMint: string;
      feeRate: number;
      feeAmount: string;
      remainingAccounts: string[];
      lastPoolPriceX64: string;
    }>;
  };
  msg: string;
}

export default {
  getQuote: async (
    from: string,
    to: string,
    amount: Decimal,
    fromDecimals: number,
    toDecimals: number
  ): Promise<QuoteResponse> => {
    if (!(from === TOKEN.USDT || from === TOKEN.FOX9)) {
      throw "Unsupported symbol";
    }
    if (!(to === TOKEN.USDT || to === TOKEN.FOX9)) {
      throw "Unsupported symbol";
    }

    const url = `${
      API_URLS.SWAP_HOST
    }/compute/swap-base-in?inputMint=${AddressMap.get(
      from
    )}&outputMint=${AddressMap.get(
      to
    )}&amount=${amount.toFixed()}&slippageBps=${10000}&txVersion=V0`;

    const { data: swapResponse } = await axios.get<SwapResponse>(url); // Use the URL xxx/swap-base-in or xxx/swap-base-out to define the swap type.

    if (swapResponse.data) {
      return {
        routeAvailable: true,
        data: {
          inputAmount: deci(swapResponse.data.inputAmount)
            .div(10 ** fromDecimals)
            .toFixed(fromDecimals),
          outputAmount: deci(swapResponse.data.outputAmount)
            .div(10 ** toDecimals)
            .toFixed(toDecimals),
          priceImpactPct: swapResponse.data.priceImpactPct,
          fee: 0,
        },
      };
    } else {
      return {
        routeAvailable: false,
        message: swapResponse.msg,
      };
    }
  },
};
