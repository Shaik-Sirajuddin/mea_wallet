import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface DepositState {
  depositAddresses: string[];
  loading: boolean;
  error: string | null;
}

const initialState: DepositState = {
  depositAddresses: [
    "meo9SCkSiViD3qKvnY2fmGuW3Vi4PNhDKtswwTPVvbo",
    "meo9SCkSiViD3qKvnY2fmGuW3Vi4PNhDKtswwTPVvbo",
  ],
  loading: false,
  error: null,
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    setDepositAddresses(state, action: PayloadAction<string[]>) {
      state.depositAddresses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDepositLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDepositError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearDepositData(state) {
      state.depositAddresses = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setDepositAddresses,
  setDepositLoading,
  setDepositError,
  clearDepositData,
} = depositSlice.actions;

export default depositSlice.reducer;
