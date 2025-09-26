export interface TokenBalances {
  mea: string;
  sol: string;
  fox9: string;
  usdt: string;
  usdt_savings: string;
}

export interface LockUpBalances {
  mea: string;
  fox9: string;
}

export interface TokenQuotes {
  mea: string;
  sol: string;
  fox9: string;
  usd: string;
  usdt: string;
  usdt_savings: string;
}

export interface ParsedBalance {
  balances: TokenBalances;
  lockups: LockUpBalances;
  quotes: TokenQuotes;
  minDeposit: TokenBalances;
  minWithdraw: TokenBalances;
  withdrawFees: TokenBalances;
  managerDepositAddresses: string[];
  userDepositAddresses: string[];
  swapFee: string;
}
