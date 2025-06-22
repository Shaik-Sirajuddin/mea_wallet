import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { Token } from "@/schema/Token";
import { UserProfile } from "@/schema/UserProfile";

export interface GETTwoFASecretResponse {
  otpUrl: string;
}
export interface Two2FASetUpResponse {
  success: boolean;
}
const url = apiBaseUrl + "/user";
export default {
  getAssets: async () => {
    let response = await networkRequest<object[]>(url + "/assets");
    if (typeof response === "string") {
      return response;
    }
    //parse response
    return response.map((item) => new Token(item));
  },
  getProfile: async () => {
    let response = await networkRequest<object>(url + "/profile");
    if (typeof response === "string") {
      return response;
    }
    return new UserProfile(response);
  },
  get2FASecret: async () => {
    return await networkRequest<GETTwoFASecretResponse>(url + "/totp_secret");
  },
  initiate2FASetup: async (otp: string) => {
    return await networkRequest<Two2FASetUpResponse>(
      url + "/initiate-2fa-setup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      }
    );
  },
};
