export enum StakingState {
  IN_PROGRESS = "proceeding",
  CLOSED = "unstaking",
}
export interface UserStakingResponse {
  status: string;
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: RawUserStaking[];
}

export interface RawUserStaking {
  seqno: number;
  symbol: string;
  regdate: string;
  goods_name: string;
  expected_withdrawal_date: string;
  money: string; // deposit amount
  usdt: string;
  krw: string;
  interest_rate: string;
  interest: string;
  unstaking_fee: string;
  withdrawal_date: string; // lockup days
  maturity_state: string;
  expected_withdrawal: string; // final expected amount
  lockup_date: string;
  stateStr: string;
  state: string;
}

export interface UserStaking {
  id: number;
  tokenSymbol: string;
  registeredAt: string;
  planName: string;
  expectedWithdrawalDate: string;
  depositAmount: string;
  usdtValue: string;
  krwValue: string;
  interestRate: string;
  interestAtMaturity: string;
  unstakingFee: string;
  lockupDays: string;
  maturityState: string;
  expectedFinalAmount: string;
  lockupDate: string;
  stateStr: string;
  state: string;
}
