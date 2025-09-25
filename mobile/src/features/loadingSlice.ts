// store/loadingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  visible: boolean;
  text?: string;
}

const initialState: LoadingState = {
  visible: false,
  text: undefined,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string | undefined>) => {
      state.visible = true;
      state.text = action.payload;
    },
    hideLoading: (state) => {
      state.visible = false;
      state.text = undefined;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
