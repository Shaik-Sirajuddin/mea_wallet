import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/src/features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
