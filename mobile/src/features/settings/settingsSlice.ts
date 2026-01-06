import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  TokenQuotes,
  TokenBalances as TokenLimits,
} from "@/src/types/balance";
import { SettingsResponse } from "@/hooks/api/useSetting";

interface SettingsState {
  managerDepositAddresses: string[];
  userDepositAddresses: string[];
  swapFee: string;
  settings: SettingsResponse | null;
}

const initialState: SettingsState = {
  managerDepositAddresses: [],
  userDepositAddresses: [],
  swapFee: "0",
  settings: null,
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
    setSettings(state, action: PayloadAction<SettingsResponse>) {
      state.settings = action.payload;
    },
  },
});

export const {
  setManagerDepositAddresses,
  setUserDepositAddresses,
  setSwapFee,
  setSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
