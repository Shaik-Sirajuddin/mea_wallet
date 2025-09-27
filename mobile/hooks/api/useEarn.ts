import { apiBaseUrl } from "@/lib/constants";
import { mapToApiSymbol, networkRequest } from ".";
import { StatusResponse } from "@/src/api/types/auth";
import { TokenQuotes } from "@/src/types/balance";
import {
  TransferHistoryResponse,
  TransferHistoryResponseRaw,
} from "@/src/api/types/earn/transfer";
import { AssetHistoryResponse } from "@/src/api/types/asset";
export interface TokenQuotes {
  mea: string;
  sol: string;
  fox9: string;
  usd: string;
  usdt: string;
  usdt_savings: string;
}

export type EarnAssets = Pick<TokenQuotes, "usdt_savings">;
export default {
  transfer: async (data: {
    otp_code: string;
    amount: string;
    min_transfer_coin: string;
    symbol: keyof TokenQuotes;
  }) => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/transfer-save`,
      {
        method: "POST",
        body: new URLSearchParams({
          otp_code: data.otp_code,
          amount: data.amount,
          min_withdraw_coin: data.min_transfer_coin,
          symbol: mapToApiSymbol(data.symbol),
        }).toString(),
      }
    );
  },
  getTransferHistory: async (symbol: keyof EarnAssets, page: number) => {
    const params = new URLSearchParams();
    params.append("symbol", mapToApiSymbol(symbol));
    params.append("page", page.toString());

    const raw = await networkRequest<TransferHistoryResponseRaw>(
      `${apiBaseUrl}/api/history_savings`,
      {
        method: "POST",
        body: params.toString(),
      }
    );

    if (typeof raw === "string") {
      return raw;
    }

    const parsed: TransferHistoryResponse = {
      status: raw.status,
      blockStart: raw.block_start,
      blockEnd: raw.block_end,
      blockNum: raw.block_num,
      totalBlock: raw.total_block,
      items: raw.data.map((item) => ({
        registeredAt: item.regdate,
        type: item.gubn,
        amount: item.amount,
        withdrawFee: item.WithdrawFee,
        previousBalance: item.prev_amount,
        nextBalance: item.next_amount,
        status: item.state,
      })),
    };

    return parsed;
  },
};
