import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  TokenQuotes,
  TokenBalances as TokenLimits,
} from "@/src/types/balance";

interface SettingsState {
  managerDepositAddresses: string[];
  userDepositAddresses: string[];
  swapFee: string;
}

const initialState: SettingsState = {
  managerDepositAddresses: [],
  userDepositAddresses: [],
  swapFee: "0",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
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
  setManagerDepositAddresses,
  setUserDepositAddresses,
  setSwapFee,
} = settingsSlice.actions;

export default settingsSlice.reducer;
