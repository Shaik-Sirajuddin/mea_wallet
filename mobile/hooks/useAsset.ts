import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { trimTrailingZeros } from "@/utils/ui";
import { SwapPayload, SwapResponseRaw } from "@/src/api/types/asset";

const url = apiBaseUrl + "/asset";

export interface TransferResponse {
  id: number;
}

export interface WithdrawResponse {
  id: number;
}

export default {
  /**
   * Submit a deposit request
   */
  deposit: async (hash: string, tokenId: number, amount: string) => {
    return await networkRequest<object>(url + "/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hash, tokenId, amount }),
    });
  },

  /**
   * Initiate a withdrawal request
   */
  initiateWithdrawal: async (
    address: string,
    token_id: number,
    amount: string
  ) => {
    return await networkRequest<WithdrawResponse>(url + "/initiate-withdrawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, token_id, amount }),
    });
  },

  /**
   * Confirm a withdrawal with OTP
   */
  confirmWithdrawal: async (id: number, otp: string) => {
    return await networkRequest<object>(url + "/confirm-withdrawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, otp }),
    });
  },

  /**
   * Cancel a withdrawal request
   */
  cancelWithdrawal: async (id: number) => {
    return await networkRequest<object>(url + "/cancel-withdrawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  },

  /**
   * Transfer tokens to another user
   */
  transfer: async (
    receiver_username: string,
    token_id: number,
    amount: string
  ) => {
    return await networkRequest<TransferResponse>(url + "/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver_username, token_id, amount }),
    });
  },

  swapTokens: async (payload: SwapPayload) => {
    const raw = await networkRequest<SwapResponseRaw>(
      `${apiBaseUrl}/api/swap-proc`,
      {
        method: "POST",
        body: new URLSearchParams({
          buyCoin: payload.buyCoin,
          sel_coin: payload.sellCoin,
          fee: payload.platformFeePercent,
          WithdrawFee: payload.withdrawFeeAmount,
          amount: payload.sellAmount,
          payment_coin: payload.paymentCoinAmount,
          buy_coin: payload.buyCoinAmount,
          quote: payload.fromCurrencyPrice,
          quote2: payload.toCurrencyPrice,
          min_deposit_coin: payload.minDepositAmount,
          otp_code: payload.otpCode,
        }).toString(),
      }
    );

    if (typeof raw === "string") return raw;

    return {
      success: raw.status === "succ",
      fromTokenBalance: trimTrailingZeros(raw.from_token_balance),
      toTokenBalance: trimTrailingZeros(raw.to_token_balance),
      swapFee: trimTrailingZeros(raw.swap_fee),
    };
  },
};
