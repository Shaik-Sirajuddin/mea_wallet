export interface TokenOverview {
  symbol: string;
  price: number;
  volume: number;
}

export type TokenMetricsResponse = {
  status: string; // "succ" | "fail" etc.
  nowBalance: number;
  yesterdayClose: number;
  depositSum: number;
  withdrawSum: number;
  yDepositSum: number;
  yWithdrawSum: number;
  tDepositSum: number;
  tWithdrawSum: number;
  rawChangePct: number;
  flowAdjChangePct: number;
  yCloseAtUTC: string; // ISO timestamp
  yCloseAtKST: string | null; // can be null
  nowCalcAtUTC: string; // ISO timestamp
  nowCalcAtKST: string; // formatted KST datetime
  calcAt: string; // ISO timestamp
};
