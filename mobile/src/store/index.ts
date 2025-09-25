import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/src/features/user/userSlice";
import balanceSlice from "@/src/features/balance/balanceSlice";
import settingsSlice from "@/src/features/settings/settingsSlice";
import tokenSlice from "@/src/features/token/tokenSlice";
import depositSlice from "@/src/features/asset/depositSlice";
import loadingSlice from "@/src/features/loadingSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    balance: balanceSlice,
    settings: settingsSlice,
    token: tokenSlice,
    deposit: depositSlice,
    progress: loadingSlice,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
