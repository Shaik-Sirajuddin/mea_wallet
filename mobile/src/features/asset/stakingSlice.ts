// src/store/stakingSlice.ts

import { StakingPlan } from "@/hooks/useStaking";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StakingState {
  plans: StakingPlan[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: StakingState = {
  plans: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const stakingSlice = createSlice({
  name: "staking",
  initialState,
  reducers: {
    setStakingPlans(state, action: PayloadAction<StakingPlan[]>) {
      state.plans = action.payload;
      state.loading = false;
      state.error = null;
    },
    addStakingPlans(state, action: PayloadAction<StakingPlan[]>) {
      state.plans = [...state.plans, ...action.payload];
    },
    clearStakingData(state) {
      state.plans = [];
      state.page = 1;
      state.totalPages = 1;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setStakingPlans, addStakingPlans, clearStakingData } =
  stakingSlice.actions;

export default stakingSlice.reducer;
