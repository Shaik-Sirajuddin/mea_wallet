import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";

export interface SettingsResponse {
  homepage: string;
  status: string;
  telegram: string;
}

export interface AppUpdateResponse {
  updateConfirm: string | null;
  status: string;
}
export default {
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

  requireLatestVersion: async () => {
    // networkRequest internally injects apikey
    const raw = await networkRequest<AppUpdateResponse>(
      `${apiBaseUrl}/api/app-update`,
      {
        method: "POST",
        body: new URLSearchParams({}).toString(), // empty body, apikey injected internally
      }
    );

    if (typeof raw === "string") {
      return raw; // could be an error message string
    }

    return {
      minimumVersion: raw.updateConfirm ?? "3.0.4",
    };
  },
};
