import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";

const url = apiBaseUrl + "/asset";

export interface TransferResponse {
  id: number;
}

export interface WithdrawResponse {
  id: number;
}

export default {
  /**
   * Submit a deposit request
   */
  deposit: async (hash: string, tokenId: number, amount: string) => {
    return await networkRequest<object>(url + "/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hash, tokenId, amount }),
    });
  },

  /**
   * Initiate a withdrawal request
   */
  initiateWithdrawal: async (
    address: string,
    token_id: number,
    amount: string
  ) => {
    return await networkRequest<WithdrawResponse>(url + "/initiate-withdrawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, token_id, amount }),
    });
  },

  /**
   * Confirm a withdrawal with OTP
   */
  confirmWithdrawal: async (id: number, otp: string) => {
    return await networkRequest<object>(url + "/confirm-withdrawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, otp }),
    });
  },

  /**
   * Cancel a withdrawal request
   */
  cancelWithdrawal: async (id: number) => {
    return await networkRequest<object>(url + "/cancel-withdrawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  },

  /**
   * Transfer tokens to another user
   */
  transfer: async (
    receiver_username: string,
    token_id: number,
    amount: string
  ) => {
    return await networkRequest<TransferResponse>(url + "/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver_username, token_id, amount }),
    });
  },
};
