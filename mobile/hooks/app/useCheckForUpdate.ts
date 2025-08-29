import { useState, useEffect } from "react";
import { Alert, BackHandler, Linking, Platform } from "react-native";
import * as Application from "expo-application";
import InAppUpdates, {
  IAUInstallStatus,
  IAUUpdateKind,
  StartUpdateOptions,
} from "sp-react-native-in-app-updates";
import useSetting from "../api/useSetting";

export function useCheckForUpdates() {
  // State to track if an update is necessary and if the check is in progress
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  async function checkForUpdates() {
    setIsLoading(true);
    try {
      // Dynamically retrieve the current app version from the native binary
      // This is a reliable way to get the version for both iOS and Android.
      const currentAppVersion = Application.nativeApplicationVersion;
      // Fetch the latest required version from your remote settings
      const requiredUpdateInfo = await useSetting.requireLatestVersion();
      console.log(currentAppVersion, requiredUpdateInfo);

      // Ensure the fetched data is valid and contains the necessary property
      if (typeof requiredUpdateInfo === "string") {
        setIsLoading(false);
        return;
      }

      const latestRequiredVersion = requiredUpdateInfo.minimumVersion;

      // Compare versions to determine if an update is mandatory
      const isUpdateMandatory = compareVersions(
        currentAppVersion,
        latestRequiredVersion
      );
      console.log(isUpdateMandatory, "j");
      if (isUpdateMandatory) {
        setIsUpdateRequired(true);
      }
    } catch (error) {
      console.warn("Update check failed:", error);
      // On failure, assume no update is required to avoid blocking the user
      setIsUpdateRequired(false);
    } finally {
      setIsLoading(false);
    }
  }
  /**
   * @description Performs the asynchronous update check.
   */

  /**
   * @description Simple version comparison function (can be replaced with a library).
   * @param {string | null} currentVersion - The current version of the app.
   * @param {string} latestRequiredVersion - The latest required version from the server.
   * @returns {boolean} True if the current version is older than the required version.
   */
  function compareVersions(
    currentVersion: string | null,
    latestRequiredVersion: string
  ): boolean {
    if (!currentVersion) {
      console.warn("Could not retrieve current app version.");
      return false;
    }

    const currentParts = currentVersion.split(".").map(Number);
    const latestParts = latestRequiredVersion.split(".").map(Number);

    for (let i = 0; i < latestParts.length; i++) {
      if (currentParts[i] < latestParts[i]) {
        return true;
      }
      if (currentParts[i] > latestParts[i]) {
        return false;
      }
    }

    return false; // Versions are the same or current is newer
  }

  useEffect(() => {
    // Run the check when the hook mounts
    checkForUpdates();
  }, []); // Empty dependency array ensures this runs only once

  // Return the state for the component to use
  return { isUpdateRequired, isLoading };
}
