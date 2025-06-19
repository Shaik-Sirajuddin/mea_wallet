import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";

export interface AuthResponse {
  token: string;
}
export default {
  login: async (email: string, password: string) => {
    return await networkRequest<AuthResponse>(apiBaseUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },
  signUp: async (email: string, password: string) => {
    return await networkRequest<AuthResponse>(apiBaseUrl + "/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },
  resetPass: async (email: string) => {
    return await networkRequest<AuthResponse>(apiBaseUrl + "/auth/reset-pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
  },
};
