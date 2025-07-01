import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { StatusResponse } from "@/src/api/types/auth";

/**
 * Payload type for initiating a withdrawal request
 */
export interface InitiateWithdrawPayload {
  symbol: string; // e.g. "MEA"
  address: string; // destination address
  amount: string; // amount as string to preserve precision
  WithdrawFee: string; // withdrawal fee
  min_withdraw_coin: string; // minimum allowed withdrawal
  otp_code: string; // user Google OTP code
}

export default {
  /**
   * Initiates a new withdrawal request
   */
  initiate: async ({
    ...payload
  }: InitiateWithdrawPayload): Promise<StatusResponse | string> => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/withdraw-save`,
      {
        method: "POST",
        body: new URLSearchParams(payload).toString(),
      }
    );
  },
};
