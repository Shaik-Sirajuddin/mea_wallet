import { apiBaseUrl, imageBucket } from "@/lib/constants";
import { networkRequest } from ".";
import { TokenBalances, TokenQuotes } from "@/src/types/balance";
import { BalanceResponseRaw } from "@/src/api/types/balance";
import { trimTrailingZeros } from "@/utils/ui";
import { TwoFADetails, UserDetails } from "@/src/api/types/user";
import { StatusResponse } from "@/src/api/types/auth";
import Decimal from "decimal.js";

export interface DepositSettings {
  minDeposit: TokenBalances;
  managerDepositAddresses: string[];
  userDepositAddresses: string[];
}

export interface WithdrawSettings {
  minWithdraw: TokenBalances;
  withdrawFees: TokenBalances;
}

export interface BalanceResult {
  free: TokenBalances;
  lockup: Omit<TokenBalances, "sol">;
}

interface UserInfoResponseRaw {
  Thumbnail: string;
}

export default {
  getBalance: async (): Promise<BalanceResult | string> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    return {
      free: {
        mea: trimTrailingZeros(raw.mea_balance),
        sol: trimTrailingZeros(raw.sol_balance),
        fox9: trimTrailingZeros(raw.fox9_balance),
      },
      lockup: {
        mea: trimTrailingZeros(raw.mea_lockup),
        fox9: trimTrailingZeros(raw.fox9_lockup),
      },
    };
  },
  getQuotes: async (): Promise<TokenQuotes | string> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    return {
      mea: trimTrailingZeros(raw.mea_quote.toString()),
      sol: trimTrailingZeros(raw.sol_quote.toString()),
      fox9: trimTrailingZeros(raw.fox9_quote.toString()),
      usd: trimTrailingZeros(raw.usd_quote.toString()),
    };
  },
  getWithdrawSettings: async (): Promise<WithdrawSettings | string> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    return {
      minWithdraw: {
        mea: trimTrailingZeros(raw.mea_min_withdraw_coin),
        fox9: trimTrailingZeros(raw.fox9_min_withdraw_coin),
        sol: trimTrailingZeros(raw.sol_min_withdraw_coin),
      },
      withdrawFees: {
        mea: trimTrailingZeros(raw.mea_WithdrawFee),
        fox9: trimTrailingZeros(raw.fox9_WithdrawFee),
        sol: trimTrailingZeros(raw.sol_WithdrawFee),
      },
    };
  },
  getSwapFee: async (): Promise<string | Decimal> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    let data = trimTrailingZeros(new Decimal(raw.swap_fee).toFixed(6));
    return new Decimal(data);
  },
  getTwoFAData: async (): Promise<TwoFADetails | string> => {
    const res = await networkRequest<any>(`${apiBaseUrl}/api/user-info`, {
      method: "POST",
    });

    if (typeof res === "string") return res;

    return {
      qrUrl: atob(res.qrUrl),
      secretCode: atob(res.SecretCode),
      isRegistered: res.qr_reg === "Y",
    };
  },
  validate2FABackup: async (otp_code: string) => {
    return await networkRequest<StatusResponse>(`${apiBaseUrl}/api/qr-reg`, {
      method: "POST",
      body: new URLSearchParams({ otp_code }).toString(),
    });
  },
  getUserInfo: async (): Promise<UserDetails | string> => {
    let raw = await networkRequest<UserInfoResponseRaw>(
      `${apiBaseUrl}/api/user-info`,
      {
        method: "POST",
        body: new URLSearchParams({}).toString(),
      }
    );
    if (typeof raw === "string") return raw;
    let data = {
      image: raw.Thumbnail,
    };
    return data;
  },
  updateProfileImage: async (
    image: string
  ): Promise<StatusResponse | string> => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/edit-profile`,
      {
        method: "POST",
        body: new URLSearchParams({ file: image }).toString(),
      }
    );
  },

  updateAvatar: async (emojiCode: string): Promise<StatusResponse | string> => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/edit-avatar`,
      {
        method: "POST",
        body: new URLSearchParams({ file: emojiCode }).toString(),
      }
    );
  },
};
