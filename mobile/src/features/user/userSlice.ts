import { TwoFADetails, UserDetails } from "@/src/api/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  authenticationVerified: boolean;
  twoFA?: TwoFADetails;
  email: string;
  details?: UserDetails;
}

const initialState: UserState = {
  isAuthenticated: false,
  authenticationVerified: false,
  email: "",
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
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.details = action.payload;
    },
  },
});

export const {
  setIsAuthenticated,
  setIsAuthenticationVerified,
  setTwoFAData,
  setUserEmail,
  setUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
