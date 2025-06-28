import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";

import {
  StatusResponse,
  LoginStatusResponse,
  LogoutResponse,
  ForgetPasswordResponse,
  AuthResponse,
} from "@/src/api/types/auth";

export default {
  login: async (email: string, password: string) => {
    return await networkRequest<AuthResponse>(
      `${apiBaseUrl}/api/login-check`,
      {
        method: "POST",
        body: new URLSearchParams({
          UserEmail: email,
          UserPwd: password,
        }).toString(),
      }
    );
  },

  signUp: async (email: string, password: string, depositAddress: string) => {
    return await networkRequest<AuthResponse>(`${apiBaseUrl}/api/join-save`, {
      method: "POST",
      body: new URLSearchParams({
        UserEmail: email,
        UserPwd: password,
        deposit_address: depositAddress,
      }).toString(),
    });
  },

  idCheck: async (email: string) => {
    return await networkRequest<StatusResponse>(`${apiBaseUrl}/api/id-check`, {
      method: "POST",
      body: new URLSearchParams({
        UserEmail: email,
      }).toString(),
    });
  },

  forgetPassword: async (email: string) => {
    return await networkRequest<ForgetPasswordResponse>(
      `${apiBaseUrl}/api/forget-password`,
      {
        method: "POST",
        body: new URLSearchParams({
          UserEmail: email,
        }).toString(),
      }
    );
  },

  changePassword: async (
    prevPassword: string,
    newPassword: string,
    otpCode: string
  ) => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/password-save`,
      {
        method: "POST",
        body: new URLSearchParams({
          PrevUserPwd: prevPassword,
          UserPwd: newPassword,
          otp_code: otpCode,
        }).toString(),
      }
    );
  },

  register2FA: async (otpCode: string) => {
    return await networkRequest<StatusResponse>(`${apiBaseUrl}/api/qr-reg`, {
      method: "POST",
      body: new URLSearchParams({
        otp_code: otpCode,
      }).toString(),
    });
  },

  loginStatus: async () => {
    return await networkRequest<LoginStatusResponse>(
      `${apiBaseUrl}/api/login-status`
    );
  },

  logout: async () => {
    return await networkRequest<LogoutResponse>(`${apiBaseUrl}/api/logout`, {
      method: "POST",
    });
  },
};
