import { TwoFADetails } from "@/src/api/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  authenticationVerified: boolean;
  twoFA?: TwoFADetails;
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
    setTwoFAData: (state, action: PayloadAction<TwoFADetails>) => {
      state.twoFA = action.payload;
    },
  },
});
export const { setIsAuthenticated, setIsAuthenticationVerified, setTwoFAData } =
  userSlice.actions;
export default userSlice.reducer;
