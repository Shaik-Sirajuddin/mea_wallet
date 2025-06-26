export interface TokenBalances {
  mea: string;
  sol: string;
  recon: string;
  fox9: string;
}

export interface TokenQuotes {
  mea: string;
  sol: string;
  fox9: string;
  recon: string;
  usd: string;
}

export interface ParsedBalance {
  balances: TokenBalances;
  lockups: Omit<TokenBalances, "sol">;
  quotes: TokenQuotes;
  minDeposit: TokenBalances;
  minWithdraw: TokenBalances;
  withdrawFees: TokenBalances;
  managerDepositAddresses: string[];
  userDepositAddresses: string[];
  swapFee: string;
}
