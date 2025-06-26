import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  authenticationVerified: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  authenticationVerified: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsAuthenticationVerified: (state, action: PayloadAction<boolean>) => {
      state.authenticationVerified = action.payload;
    },
  },
});

export const { setIsAuthenticated, setIsAuthenticationVerified } =
  userSlice.actions;
export default userSlice.reducer;
