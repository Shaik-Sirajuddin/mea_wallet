import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { StatusResponse } from "@/src/api/types/auth";

export interface SettingsResponse {
  homepage: string;
  status: string;
  telegram: string;
}
export default {
  /**
   * Initiates a new withdrawal request
   */
  getSettings: async (): Promise<SettingsResponse | string> => {
    let raw = await networkRequest<SettingsResponse>(
      `${apiBaseUrl}/api/setting`,
      {
        method: "POST",
        body: new URLSearchParams({}).toString(),
      }
    );

    if (typeof raw === "string") {
      return raw;
    }
    return {
      ...raw,
      telegram: atob(raw.telegram),
    };
  },
};
