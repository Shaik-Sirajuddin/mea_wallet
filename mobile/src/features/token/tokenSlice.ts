import {
  TokenQuotes,
  TokenBalances as TokenThresholds,
} from "@/src/types/balance";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  quotes: TokenQuotes;
  minDeposit: TokenThresholds;
  withdrawFees: TokenThresholds;
  minWithdraw: TokenThresholds;
  swapFee: string;
}

const initialState: TokenState = {
  quotes: {
    mea: "0",
    sol: "0",
    fox9: "0",
    recon: "0",
    usd: "0",
  },
  minDeposit: { mea: "0", sol: "0", fox9: "0", recon: "0" },
  withdrawFees: { mea: "0", sol: "0", fox9: "0", recon: "0" },
  minWithdraw: { mea: "0", sol: "0", fox9: "0", recon: "0" },
  swapFee: "0",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setQuotes(state, action: PayloadAction<TokenQuotes>) {
      state.quotes = action.payload;
    },
    setMinDeposit(state, action: PayloadAction<TokenThresholds>) {
      state.minDeposit = action.payload;
    },
    setWithdrawFees(state, action: PayloadAction<TokenThresholds>) {
      state.withdrawFees = action.payload;
    },
    setMinWithdraw(state, action: PayloadAction<TokenThresholds>) {
      state.minWithdraw = action.payload;
    },
    setSwapFee(state, action: PayloadAction<string>) {
      state.swapFee = action.payload;
    },
  },
});

export const {
  setQuotes,
  setMinDeposit,
  setWithdrawFees,
  setMinWithdraw,
  setSwapFee,
} = tokenSlice.actions;

export default tokenSlice.reducer;
