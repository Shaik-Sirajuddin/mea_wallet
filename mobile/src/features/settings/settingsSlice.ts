import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  TokenQuotes,
  TokenBalances as TokenLimits,
} from "@/src/types/balance";

interface SettingsState {
  quotes: TokenQuotes;
  minDeposit: TokenLimits;
  minWithdraw: TokenLimits;
  withdrawFees: TokenLimits;
  managerDepositAddresses: string[];
  userDepositAddresses: string[];
  swapFee: string;
}

const initialState: SettingsState = {
  quotes: { mea: "0", sol: "0", recon: "0", fox9: "0", usd: "0" },
  minDeposit: { mea: "0", sol: "0", recon: "0", fox9: "0" },
  minWithdraw: { mea: "0", sol: "0", recon: "0", fox9: "0" },
  withdrawFees: { mea: "0", sol: "0", recon: "0", fox9: "0" },
  managerDepositAddresses: [],
  userDepositAddresses: [],
  swapFee: "0",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setQuotes(state, action: PayloadAction<TokenQuotes>) {
      state.quotes = action.payload;
    },
    setMinDeposit(state, action: PayloadAction<TokenLimits>) {
      state.minDeposit = action.payload;
    },
    setMinWithdraw(state, action: PayloadAction<TokenLimits>) {
      state.minWithdraw = action.payload;
    },
    setWithdrawFees(state, action: PayloadAction<TokenLimits>) {
      state.withdrawFees = action.payload;
    },
    setManagerDepositAddresses(state, action: PayloadAction<string[]>) {
      state.managerDepositAddresses = action.payload;
    },
    setUserDepositAddresses(state, action: PayloadAction<string[]>) {
      state.userDepositAddresses = action.payload;
    },
    setSwapFee(state, action: PayloadAction<string>) {
      state.swapFee = action.payload;
    },
  },
});

export const {
  setQuotes,
  setMinDeposit,
  setMinWithdraw,
  setWithdrawFees,
  setManagerDepositAddresses,
  setUserDepositAddresses,
  setSwapFee,
} = settingsSlice.actions;

export default settingsSlice.reducer;
