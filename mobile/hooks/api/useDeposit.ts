import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import {
  DepositRecord,
  InitiateDepositPayload,
  WalletAddressResponse,
} from "@/src/api/types/deposit";
import { trimTrailingZeros } from "@/utils/ui";
import { StatusResponse } from "@/src/api/types/auth";
import { DepositSettings } from "./useUser";
import { BalanceResponseRaw } from "@/src/api/types/balance";

export default {
  /**
   * Initiates a new deposit request
   */
  applyDeposit: async ({
    symbol,
    manager_deposit_address,
    min_deposit_coin,
    amount,
    txid,
    wallet_address,
  }: InitiateDepositPayload): Promise<StatusResponse | string> => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/deposit-save`,
      {
        method: "POST",
        body: new URLSearchParams({
          symbol,
          manager_deposit_address,
          min_deposit_coin,
          amount,
          txid,
          wallet_address,
        }).toString(),
      }
    );
  },

  /**
   * Cancels a deposit request by ID
   */
  cancel: async (depositId: string): Promise<string> => {
    return await networkRequest<string>(`${apiBaseUrl}/api/cancel-deposit`, {
      method: "POST",
      body: new URLSearchParams({ depositId }).toString(),
    });
  },

  /**
   * Confirms deposit request by ID (if needed)
   */
  confirm: async (depositId: string): Promise<string> => {
    return await networkRequest<string>(`${apiBaseUrl}/api/confirm-deposit`, {
      method: "POST",
      body: new URLSearchParams({ depositId }).toString(),
    });
  },

  /**
   * Retrieves a list of previous deposit requests for the user
   */
  getHistory: async (): Promise<DepositRecord[] | string> => {
    const res = await networkRequest<DepositRecord[]>(
      `${apiBaseUrl}/api/deposit-history`
    );

    if (typeof res === "string") return res;

    return res.map((entry) => ({
      ...entry,
      amount: trimTrailingZeros(entry.amount),
    }));
  },

  /**
   * Registers or updates a user's deposit address for a given token
   */
  registerAddress: async (deposit_address: string) => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/address-add`,
      {
        method: "POST",
        body: new URLSearchParams({ deposit_address }).toString(),
      }
    );
  },

  deleteAddress: async (index: number) => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/wallet-delete`,
      {
        method: "POST",
        body: new URLSearchParams({ no: (index + 1).toString() }).toString(),
      }
    );
  },

  /**
   * Retrieves  user deposit addresses
   */
  getWalletAddresses: async (): Promise<string[] | string> => {
    const res = await networkRequest<WalletAddressResponse>(
      `${apiBaseUrl}/api/wallet-address`,
      {
        method: "POST",
      }
    );

    if (typeof res === "string") return res;

    const {
      deposit_address,
      deposit_address_2,
      deposit_address_3,
      deposit_address_4,
      deposit_address_5,
    } = res;

    const addresses: string[] = [
      deposit_address,
      deposit_address_2,
      deposit_address_3,
      deposit_address_4,
      deposit_address_5,
    ].filter((addr): addr is string => typeof addr === "string" && !!addr);

    return addresses;
  },
  getDepositSettings: async (): Promise<DepositSettings | string> => {
    const raw = await networkRequest<BalanceResponseRaw>(
      `${apiBaseUrl}/api/balance-check`,
      { method: "POST" }
    );

    if (typeof raw === "string") return raw;

    return {
      minDeposit: {
        mea: trimTrailingZeros(raw.mea_min_deposit_coin),
        recon: trimTrailingZeros(raw.recon_min_deposit_coin),
        fox9: trimTrailingZeros(raw.fox9_min_deposit_coin),
        sol: trimTrailingZeros(raw.sol_min_deposit_coin),
      },
      managerDepositAddresses: [
        raw.manager_deposit_address,
        raw.manager_deposit_address_2,
        raw.manager_deposit_address_3,
        raw.manager_deposit_address_4,
      ].filter((address) => address),
      userDepositAddresses: [
        raw.deposit_address,
        raw.deposit_address_2,
        raw.deposit_address_3,
        raw.deposit_address_4,
        raw.deposit_address_5,
      ].filter((address) => address),
    };
  },
  isAddressAvailable: async (depositAddress: string) => {
    return await networkRequest<StatusResponse>(
      `${apiBaseUrl}/api/address-check`,
      {
        method: "POST",
        body: new URLSearchParams({
          deposit_address: depositAddress,
        }).toString(),
      }
    );
  },
};
