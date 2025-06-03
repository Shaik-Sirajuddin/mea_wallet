import { apiBaseUrl } from "@/lib/constants";

export interface AuthResponse {
  token: string;
}
export default {
  /**
   * internal server error ,
   * custom server messages ,
   * network request failures
   */
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(apiBaseUrl + "/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let res = await response.json();
      if (!response.ok) {
        return res.error as string;
      }
      return res as AuthResponse;
    } catch (error: any) {
      if (error.message && typeof error.message === "string") {
        return error.message as string;
      }
      return "";
      //error.message for failure from fetch
    }
  },
  signUp: async (email: string, password: string) => {
    try {
      const response = await fetch(apiBaseUrl + "/auth/sign-up", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let res = await response.json();
      if (!response.ok) {
        return res.error as string;
      }
      return res as AuthResponse;
    } catch (error: any) {
      if (error.message && typeof error.message === "string") {
        return error.message as string;
      }
      return "";
      //error.message for failure from fetch
    }
  },
  resetPass: async (email: string, password: string) => {
    try {
      const response = await fetch(apiBaseUrl + "/auth/reset-pass", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      let res = await response.json();
      if (!response.ok) {
        return res.error as string;
      }
      return res as object;
    } catch (error: any) {
      if (error.message && typeof error.message === "string") {
        return error.message as string;
      }
      return "";
      //error.message for failure from fetch
    }
  },
};
