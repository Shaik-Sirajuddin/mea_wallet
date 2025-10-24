import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View, Linking, Platform } from "react-native";
import InAppUpdates, {
  IAUInstallStatus,
  IAUUpdateKind,
} from "sp-react-native-in-app-updates";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";

// For iOS, replace with your App Store ID
const APP_STORE_ID = "123456789";

const UpdateAppPage = () => {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpdate = async () => {
    try {
      // Handle Android in-app updates
      if (Platform.OS === "android") {
        Linking.openURL(
          `https://play.google.com/store/apps/details?id=com.meccain.ping`
        );
        // setDownloading(true);
        const inAppUpdates = new InAppUpdates(false); // set to false in production
        const updateOptions = {
          updateType: IAUUpdateKind.IMMEDIATE,
        };

        const listener = (downloadStatus: any) => {
          switch (downloadStatus.status) {
            case IAUInstallStatus.DOWNLOADING:
              const newProgress = Math.floor(
                (downloadStatus.bytesDownloaded /
                  downloadStatus.totalBytesToDownload) *
                  100
              );
              setProgress(newProgress);
              break;
            case IAUInstallStatus.DOWNLOADED:
              inAppUpdates.installUpdate();
              break;
            case IAUInstallStatus.INSTALLED:
              setDownloading(false);
              inAppUpdates.removeStatusUpdateListener(listener);
              break;
            case IAUInstallStatus.CANCELED:
            case IAUInstallStatus.FAILED:
              setDownloading(false);
              inAppUpdates.removeStatusUpdateListener(listener);
              break;
            default:
              break;
          }
        };
        inAppUpdates.addStatusUpdateListener(listener);
        inAppUpdates.startUpdate(updateOptions);

        // Handle iOS App Store redirects
      } else if (Platform.OS === "ios") {
        Linking.openURL(`itms-apps://itunes.apple.com/app/id${APP_STORE_ID}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <View className="flex-1 h-full bg-black-1000 items-center justify-center">
      <View className="rounded-[15px] min-h-[451px] max-w-5xl flex-col items-center justify-center p-8">
        <View className="items-center mb-8">
          {/* Using a large emoji to replace the image for visual emphasis */}
          <Text className="text-6xl mb-4">⬇️</Text>
          <Text className="text-[28px] my-3 font-semibold leading-[32px] text-white text-center">
            {t("update.title")}
          </Text>
          <Text className="text-lg font-normal leading-[22px] text-gray-400 text-center mt-2">
            {t("update.subtitle")}
          </Text>
        </View>

        {downloading ? (
          <View className="w-full flex-col items-center mt-8">
            <Text className="text-white text-base font-medium mb-2">
              {t("update.downloading")}
            </Text>
            <View className="w-full h-2 bg-gray-800 rounded-full">
              <View
                className="h-full bg-purple-500 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></View>
            </View>
          </View>
        ) : (
          <View className="w-full flex mt-8">
            <PrimaryButton
              className="p-4"
              text={t("update.button")}
              onPress={handleUpdate}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default UpdateAppPage;
