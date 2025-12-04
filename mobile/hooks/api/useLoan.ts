import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { StatusResponse } from "@/src/api/types/auth";

export interface LoanLimit {
  loanMax: string; // "Y" / "N"
  max_loan_amount: number;
  loan_count: number;
}

export interface LoanApplicationPayload {
  asset: string;
  deposit_money: number;
  otp_code: string;
}

export interface LoanPrincipalRepayResponse {
  status: "succ"; // or string if not always "succ"
  loan_seqno: number;
  target: string; // e.g., "btc"
  usdt_paid: string; // numeric string
  collateral_released: string; // numeric string

  user_balance: {
    prev: string;
    next: string;
  };

  user_token_balance: {
    prev: string;
    next: string;
    token: string; // e.g., "btc"
  };

  history_seqno: {
    loan_transaction_history_out: number;
    token_transaction_history_out: number;
    loan_transaction_history_in: number;
    token_transaction_history_in: number;
  };

  dedupe_keys: {
    out: string;
    in: string;
  };
}

export interface LoanInterestRepayResponse {
  status: string; // "succ" | "fail" etc.
  loan_seqno: number;
  target: string; // token symbol like "btc"
  amount: number;
  user_balance: {
    prev: number;
    next: number | string; // API sometimes returns string numbers
  };
  history_seqno: {
    loan_transaction_history: number;
    token_transaction_history: number;
  };
  dedupe_key: string;
}

export interface AppSettings {
  status: string;
  telegram: string; // base64 encoded
  homepage: string;
  min_loan_amount: string;
  LoanYield: number;
  AssetYield: number;
  PriceDifference: number;
}

export interface LoanOverviewItem {
  no: number;
  startDate: string;
  symbol: string;
  quoteAtLoan: number;
  quoteNow: number;
  appliedAmount: number;
  totalValueAtLoan: number;
  loanCollateralLocked: number;
  usdtPayment: number;
  annualInterestUSDT: number;
  annualInterestAsset: number;
  monthlyInterestUSDT: number;
  monthlyInterestAsset: number;
  currentTotalCollateralQuantity: number;
  collateralValueNow: number;
  valueRatio: number;
  adminSetStopRatio: number;
  liquidationStopStatus: string;
  interestPaymentDate: string;
  nextInterestPaymentDate: string;
  repaymentDate: string | null;
  state: string;
  stateStr: string;
  latestQuote: number;
  loanInterestUnconfirmedCount: number;
  loanInterestFirstUnconfirmedSeqno: number;
  loanInterestFirstUnconfirmedDate: string;
  LoanAddPrice: string;
  StopDate: string | null;
  PrincipalConfirm: string;
  AssetYield: number;
  LoanYield: number;
  monthlyRate: number;
  intTotalCount: number;
  delinquency_num: number;
}

export interface LoanOverviewResponse {
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: LoanOverviewItem[];
}
export interface LoanTopupHistoryResponseRaw {
  status: string;
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: LoanTopupHistoryItemRaw[];
}
export interface LoanTopupHistoryResponse {
  status: string;
  blockStart: number;
  blockEnd: number;
  blockNum: number;
  totalBlock: number;
  data: LoanTopupHistoryItem[];
}

export interface LoanTopupHistoryItemRaw {
  regdate: string;
  target: string;
  gubn: string;
  amount: string;
  prev_amount: string;
  next_amount: string;
}

export interface LoanTopupHistoryItem {
  date: string; // regdate
  symbol: string; // target
  label: string; // gubn
  amount: number;
  prevAmount: number;
  nextAmount: number;
}

export interface LoanHistoryItem {
  no?: number;
  symbol?: string;
  target?: string;
  appliedAmount?: number;
  stateStr?: string;
  status?: string;
  startDate?: string;
  repaymentDate?: string;
  regDate?: string;
  regdate?: string;
  date?: string;
  processDate?: string;
  amount?: string | number;
  price?: number;
  category?: string;
  gubn?: string;
  prev?: number;
  next?: number;
  prev_amount?: string | number;
  next_amount?: string | number;
}

export interface LoanHistoryResponse {
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: LoanHistoryItem[];
}

export interface LoanInterestHistoryItem {
  seqno: number;
  date: string; // "2026-01-02"
  target: string; // "MEA"
  interest: string; // "0.060000000"
  processing_date: string; // "2025-12-03T10:57:18.000Z"
  confirm: string; // "Payment Completed"
}

export interface LoanInterestHistoryResponse {
  status: string; // "succ"
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: LoanInterestHistoryItem[];
}

export default {
  /** Fetch user's loan limits */
  getLoanLimit: async (): Promise<LoanLimit | string> => {
    const params = new URLSearchParams();
    return await networkRequest<LoanLimit & { status: string }>(
      `${apiBaseUrl}/api/loan-limit`,
      { method: "POST", body: params.toString() }
    );
  },

  /** Apply for a loan */
  applyLoan: async (payload: LoanApplicationPayload): Promise<any> => {
    const params = new URLSearchParams();
    params.append("asset", payload.asset);
    params.append("deposit_money", payload.deposit_money.toString());
    params.append("otp_code", payload.otp_code);

    return await networkRequest<any>(`${apiBaseUrl}/api/loan-application`, {
      method: "POST",
      body: params.toString(),
    });
  },

  /** Fetch user's active loans overview */
  getLoanOverview: async (
    page: number
  ): Promise<LoanOverviewResponse | string> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    return await networkRequest<LoanOverviewResponse>(
      `${apiBaseUrl}/api/loan-overview`,
      { method: "POST", body: params.toString() }
    );
  },

  /** Fetch loan-add payment history */
  getTopUpHistory: async (
    no: number,
    page: number
  ): Promise<LoanTopupHistoryResponse | string> => {
    const params = new URLSearchParams();
    params.append("no", no.toString());
    params.append("page", page.toString());

    const raw = await networkRequest<LoanTopupHistoryResponseRaw>(
      `${apiBaseUrl}/api/loan-paymnet-loan-add-history`,
      { method: "POST", body: params.toString() }
    );
    if (typeof raw === "string") return raw;
    return {
      status: raw.status,
      blockStart: raw.block_start,
      blockEnd: raw.block_end,
      blockNum: raw.block_num,
      totalBlock: raw.total_block,
      data: raw.data.map((item) => ({
        date: item.regdate,
        symbol: item.target,
        label: item.gubn,
        amount: Number(item.amount),
        prevAmount: Number(item.prev_amount),
        nextAmount: Number(item.next_amount),
      })),
    };
  },

  /** Fetch loan interest history */
  getInterestHistory: async (no: number, page: number) => {
    const params = new URLSearchParams();
    params.append("no", no.toString());
    params.append("page", page.toString());

    return await networkRequest<LoanInterestHistoryResponse>(
      `${apiBaseUrl}/api/loan-interest-history`,
      { method: "POST", body: params.toString() }
    );
  },

  /** Make additional collateral payment */
  addCollateralPayment: async (paramsObj: {
    no: number;
    AddPrice: string;
    otp_code: string;
  }) => {
    const params = new URLSearchParams();
    params.append("no", paramsObj.no.toString());
    params.append("AddPrice", paramsObj.AddPrice);
    params.append("otp_code", paramsObj.otp_code);

    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/loan-additional-collateral-payments`,
      { method: "POST", body: params.toString() }
    );
  },

  /** Make additional loan payment */
  addLoanPayment: async (paramsObj: {
    no: number;
    AddPrice: string;
    otp_code: string;
  }) => {
    const params = new URLSearchParams();
    params.append("no", paramsObj.no.toString());
    params.append("AddPrice", paramsObj.AddPrice);
    params.append("otp_code", paramsObj.otp_code);

    return await networkRequest<any>(
      `${apiBaseUrl}/api/loan-additional-payments`,
      { method: "POST", body: params.toString() }
    );
  },

  /** Repay loan interest */
  repayInterest: async (paramsObj: {
    no: number;
    interest: string;
    otp_code: string;
  }) => {
    const params = new URLSearchParams();
    params.append("no", paramsObj.no.toString());
    params.append("interest", paramsObj.interest);
    params.append("otp_code", paramsObj.otp_code);
    console.log(params, paramsObj, params.toString());
    return await networkRequest<LoanInterestRepayResponse>(
      `${apiBaseUrl}/api/loan-interest-repay`,
      {
        method: "POST",
        body: params.toString(),
      }
    );
  },

  /** Repay principal */
  repayPrincipal: async (paramsObj: { no: number; otp_code: string }) => {
    const params = new URLSearchParams();
    params.append("no", paramsObj.no.toString());
    params.append("otp_code", paramsObj.otp_code);

    return await networkRequest<LoanPrincipalRepayResponse>(
      `${apiBaseUrl}/api/loan-principal-repay`,
      {
        method: "POST",
        body: params.toString(),
      }
    );
  },

  /** Fetch user's loan history */
  getLoanHistory: async (page: number) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());

    return await networkRequest<LoanHistoryResponse>(
      `${apiBaseUrl}/api/loan-history`,
      { method: "POST", body: params.toString() }
    );
  },
  /** Fetch global app settings */
  getSettings: async (): Promise<AppSettings | string> => {
    const params = new URLSearchParams(); // empty

    return await networkRequest<AppSettings>(`${apiBaseUrl}/api/setting`, {
      method: "POST",
      body: params.toString(),
    });
  },
};
