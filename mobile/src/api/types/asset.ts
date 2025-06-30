export interface SwapPayload {
  buyCoin: string; // Coin to buy (e.g. MEA)
  sellCoin: string; // Coin to sell (e.g. RECON)
  platformFeePercent: string; // Platform fee as percent
  adminComission: string; // Withdrawal fee in sell coin
  sellAmount: string; // Amount user is selling
  expectedReceivableBeforeFee: string; // Calculated payment value in sell coin
  expectedReceivable: string; // Calculated amount user will receive (buy coin)
  fromCurrencyPrice: string; // Current price of sell coin
  toCurrencyPrice: string; // Current price of buy coin
  minDepositAmount: string; // Minimum deposit allowed
  otpCode: string; // OTP code entered by user
}

export interface SwapResponseRaw {
  status: string;
  from_token_balance: string;
  to_token_balance: string;
  swap_fee: string;
}

export interface SwapResult {
  success: boolean;
  fromTokenBalance: string;
  toTokenBalance: string;
  swapFee: string;
}
