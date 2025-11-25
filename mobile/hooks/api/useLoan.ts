import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";

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

export interface LoanHistoryItem {
  no: number;
  symbol: string;
  appliedAmount: number;
  stateStr: string;
  startDate: string;
  repaymentDate?: string;
}

export interface LoanHistoryResponse {
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: LoanHistoryItem[];
}

export default {
  /** Fetch user's loan limits */
  getLoanLimit: async (apikey: string): Promise<LoanLimit | string> => {
    return await networkRequest<LoanLimit & { status: string }>(
      `${apiBaseUrl}/api/loan-limit`,
      {
        method: "POST",
        body: JSON.stringify({ apikey }),
      }
    );
  },

  /** Apply for a loan */
  applyLoan: async (
    payload: LoanApplicationPayload & { apikey: string }
  ): Promise<any> => {
    return await networkRequest<any>(`${apiBaseUrl}/api/loan-application`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Fetch user's active loans overview */
  getLoanOverview: async (
    page: number,
    apikey: string
  ): Promise<LoanOverviewResponse | string> => {
    return await networkRequest<LoanOverviewResponse>(
      `${apiBaseUrl}/api/loan-overview`,
      {
        method: "POST",
        body: JSON.stringify({ page, apikey }),
      }
    );
  },

  /** Fetch loan-add payment history */
  getPaymentHistory: async (no: number, page: number, apikey: string) => {
    return await networkRequest<LoanHistoryResponse>(
      `${apiBaseUrl}/api/loan-paymnet-loan-add-history`,
      {
        method: "POST",
        body: JSON.stringify({ no, page, apikey }),
      }
    );
  },

  /** Fetch loan interest history */
  getInterestHistory: async (no: number, page: number, apikey: string) => {
    return await networkRequest<LoanHistoryResponse>(
      `${apiBaseUrl}/api/loan-interest-history`,
      {
        method: "POST",
        body: JSON.stringify({ no, page, apikey }),
      }
    );
  },

  /** Make additional collateral payment */
  addCollateralPayment: async (params: {
    no: number;
    AddPrice: string;
    otp_code: string;
    apikey: string;
  }) => {
    return await networkRequest<any>(
      `${apiBaseUrl}/api/loan-additional-collateral-payments`,
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );
  },

  /** Make additional loan payment */
  addLoanPayment: async (params: {
    no: number;
    AddPrice: string;
    otp_code: string;
    apikey: string;
  }) => {
    return await networkRequest<any>(
      `${apiBaseUrl}/api/loan-additional-payments`,
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );
  },

  /** Repay loan interest */
  repayInterest: async (params: {
    no: number;
    interest: string;
    otp_code: string;
    apikey: string;
  }) => {
    return await networkRequest<any>(`${apiBaseUrl}/api/loan-interest-repay`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  /** Repay principal */
  repayPrincipal: async (params: {
    no: number;
    otp_code: string;
    apikey: string;
  }) => {
    return await networkRequest<any>(`${apiBaseUrl}/api/loan-principal-repay`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  /** Fetch user's loan history */
  getLoanHistory: async (page: number, apikey: string) => {
    return await networkRequest<LoanHistoryResponse>(
      `${apiBaseUrl}/api/loan-history`,
      {
        method: "POST",
        body: JSON.stringify({ page, apikey }),
      }
    );
  },
};
