// src/api/staking.ts

import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { trimTrailingZeros } from "@/utils/ui";
import { TokenBalances } from "@/src/types/balance";
import { StatusResponse } from "@/src/api/types/auth";
import { UserStaking, UserStakingResponse } from "@/src/api/types/staking";

export interface StakingPlan {
  id: number;
  registeredAt: string;
  imageUrl: string;
  name: string;
  lockupDays: number;
  interestRate: string;
  unstakingFee: string;
  minDeposit: string;
  totalDeposited: string;
  state: string;
  supportedTokens: (keyof TokenBalances)[];
}

export interface StakingListParsed {
  plans: StakingPlan[];
  totalPages: number;
}

export interface StakingListResponse {
  status: string;
  data: any[];
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
}

export interface ApplyStakingPayload {
  asset: string;
  seqno: string;
  interest_rate: number;
  interest: string;
  deposit_money: string;
  otp_code: string;
}

export interface ApplyStakingResponse {
  status: string;
  msg?: string;
}

let tokenBalance: TokenBalances = {
  fox9: "0",
  mea: "0",
  recon: "0",
  sol: "0",
};

const TOKEN_SYMBOLS = Object.keys(tokenBalance) as (keyof TokenBalances)[];

export default {
  /**
   * Fetch staking plans list with pagination.
   */
  getStakingList: async (page = 1): Promise<StakingListParsed | string> => {
    const payload = {
      page: String(page),
    };

    const raw = await networkRequest<StakingListResponse>(
      `${apiBaseUrl}/api/staking-list`,
      {
        method: "POST",
        body: new URLSearchParams(payload).toString(),
      }
    );

    if (typeof raw === "string") return raw;
    if (raw.status !== "succ") return "Failed to fetch staking list";

    const plans: StakingPlan[] = raw.data.map((item) => {
      const supportedTokens = TOKEN_SYMBOLS.filter(
        (symbol) => item[symbol] === "Y"
      );

      return {
        id: item.seqno,
        registeredAt: item.regdate,
        imageUrl: item.image,
        name: item.goods_name_en,
        lockupDays: item.withdrawal_date,
        interestRate: trimTrailingZeros(String(item.interest_rate)),
        unstakingFee: trimTrailingZeros(item.unstaking_fee),
        minDeposit: trimTrailingZeros(item.min_deposit_token),
        totalDeposited: trimTrailingZeros(String(item.total_deposit)),
        state: item.state,
        supportedTokens,
      };
    });

    return { plans, totalPages: raw.total_block };
  },

  /**
   * Apply for staking with provided details.
   */
  applyStaking: async (payload: ApplyStakingPayload) => {
    const data = {
      ...payload,
    };

    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/staking-proc`,
      {
        method: "POST",
        body: new URLSearchParams(data as any).toString(),
      }
    );
  },

  getUserStakings: async (
    page = 1,
    state = "",
    sort = ""
  ): Promise<{ items: UserStaking[]; totalPages: number } | string> => {
    const payload = {
      page: String(page),
      state,
      sort,
    };

    const raw = await networkRequest<UserStakingResponse>(
      `${apiBaseUrl}/api/staking-user`,
      {
        method: "POST",
        body: new URLSearchParams(payload).toString(),
      }
    );

    if (typeof raw === "string") return raw;
    const items: UserStaking[] = raw.data.map((item) => ({
      id: item.seqno,
      tokenSymbol: item.symbol,
      registeredAt: item.regdate,
      planName: item.goods_name,
      expectedWithdrawalDate: item.expected_withdrawal_date,
      depositAmount: item.money,
      usdtValue: item.usdt,
      krwValue: item.krw,
      interestRate: item.interest_rate,
      interestAtMaturity: item.interest,
      unstakingFee: item.unstaking_fee,
      lockupDays: item.withdrawal_date,
      maturityState: item.maturity_state,
      expectedFinalAmount: item.expected_withdrawal,
      lockupDate: item.lockup_date,
      stateStr: item.stateStr,
      state: item.state,
    }));

    return {
      items,
      totalPages: raw.total_block,
    };
  },
};
