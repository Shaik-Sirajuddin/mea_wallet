import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TokenBalances } from "@/src/types/balance";

interface BalanceState {
  free: TokenBalances;
  lockup: Omit<TokenBalances, "sol">; // `sol` has no lockup
}

const initialState: BalanceState = {
  free: { sol: "0", mea: "0", recon: "0", fox9: "0" },
  lockup: { mea: "0", recon: "0", fox9: "0" },
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setFreeBalances(state, action: PayloadAction<TokenBalances>) {
      state.free = action.payload;
    },
    setLockupBalances(
      state,
      action: PayloadAction<Omit<TokenBalances, "sol">>
    ) {
      state.lockup = action.payload;
    },
  },
});

export const { setFreeBalances, setLockupBalances } = balanceSlice.actions;
export default balanceSlice.reducer;
