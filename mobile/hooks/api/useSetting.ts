import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";

export interface SettingsResponse {
  homepage: string;
  status: string;
  telegram: string;
}

export interface AppUpdateResponse {
  updateConfirm: string | null;
  updateConfirmIOS: string | null;
  status: string;
}

export interface MigrationApiRaw {
  status: string;
  migration?: string;
  migration_start_at?: string | null;
  migration_end_at?: string | null;
}

export interface MigrationStateSuccess {
  ok: true;
  migration: boolean;
  migration_start_at: Date;
  migration_end_at: Date;
}

export interface MigrationStateError {
  ok: false;
  error: string;
}

export type MigrationStateResponse =
  | MigrationStateSuccess
  | MigrationStateError;

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
      minimumVersion: raw.updateConfirm ?? "0.9",
      minimumVersionIOS: raw.updateConfirmIOS ?? "0.9",
    };
  },

  getMigrationState: async () => {
    // API automatically injects API key inside networkRequest
    const raw = await networkRequest<MigrationApiRaw>(
      `${apiBaseUrl}/api/migration`,
      {
        method: "POST",
        body: new URLSearchParams().toString(), // empty POST
      }
    );

    // networkRequest might return string on error
    if (typeof raw === "string") {
      return { ok: false, error: raw };
    }

    // backend-level errors
    if (raw.status !== "succ") {
      return { ok: false, error: raw.status };
    }

    return {
      ok: true,
      migration: raw.migration === "Y",
      migration_start_at: new Date(raw.migration_start_at ?? 0),
      migration_end_at: new Date(raw.migration_end_at ?? 0),
    };
  },
};
