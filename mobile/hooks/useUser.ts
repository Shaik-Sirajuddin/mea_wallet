import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { TokenBalances, TokenQuotes } from "@/src/types/balance";
import { BalanceResponseRaw } from "@/src/api/types/balance";

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
  lockup: Omit<TokenBalances, "sol">; // sol doesn't have lockup
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
        mea: raw.mea_balance,
        sol: raw.sol_balance,
        recon: raw.recon_balance,
        fox9: raw.fox9_balance,
      },
      lockup: {
        mea: raw.mea_lockup,
        recon: raw.recon_lockup,
        fox9: raw.fox9_lockup,
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
      mea: raw.mea_quote,
      sol: raw.sol_quote,
      fox9: raw.fox9_quote,
      recon: raw.recon_quote,
      usd: raw.usd_quote,
    };
  },

  getDepositSettings: async (): Promise<DepositSettings | string> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    return {
      minDeposit: {
        mea: raw.mea_min_deposit_coin,
        recon: raw.recon_min_deposit_coin,
        fox9: raw.fox9_min_deposit_coin,
        sol: raw.sol_min_deposit_coin,
      },
      managerDepositAddresses: [
        raw.manager_deposit_address,
        raw.manager_deposit_address_2,
        raw.manager_deposit_address_3,
        raw.manager_deposit_address_4,
      ],
      userDepositAddresses: [
        raw.deposit_address,
        raw.deposit_address_2,
        raw.deposit_address_3,
        raw.deposit_address_4,
        raw.deposit_address_5,
      ],
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
        mea: raw.mea_min_withdraw_coin,
        recon: raw.recon_min_withdraw_coin,
        fox9: raw.fox9_min_withdraw_coin,
        sol: raw.sol_min_withdraw_coin,
      },
      withdrawFees: {
        mea: raw.mea_WithdrawFee,
        recon: raw.recon_WithdrawFee,
        fox9: raw.fox9_WithdrawFee,
        sol: raw.sol_WithdrawFee,
      },
    };
  },

  getSwapFee: async (): Promise<string> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    return raw.swap_fee;
  },
};
