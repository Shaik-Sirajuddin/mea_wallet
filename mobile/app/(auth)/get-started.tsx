import { useCheckForUpdates } from "@/hooks/app/useCheckForUpdate";
import { Link, router, useFocusEffect } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
const GetStarted = () => {
  const { t } = useTranslation();
  const { isUpdateRequired, isLoading } = useCheckForUpdates();

  const GoogleLogin = async () => {
    // check if users' device has google play services
    await GoogleSignin.hasPlayServices();

    // initiates signIn process
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  };

  const googleSignIn = async () => {
    try {
      const response = await GoogleLogin();

      // retrieve user data
      const { idToken, user } = response.data ?? {};
      if (idToken) {
        console.log("Received data from user ", idToken, user);
        // await processUserData(idToken, user); // Server call to validate the token & process the user data for signing In
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isLoading) return;
      if (isUpdateRequired) {
        router.dismissTo("/app-update");
      }
      return;
    }, [isLoading, isUpdateRequired])
  );
  return (
    <View className="w-full h-full max-w-5xl mx-auto items-center justify-center bg-pink-1000">
      <View className="bg-black-1000 rounded-[15px] min-h-[451px] max-w-[392px] w-11/12 flex-col items-center justify-end p-5 gap-[88px]">
        <View className="items-center mb-5">
          <View className="mb-5">
            <Image
              width={216}
              height={56}
              source={require("../../assets/images/logo.png")}
            />
            {/* <Logo width={216} height={56} /> */}
          </View>
          <Text className="text-base font-semibold leading-[22px] text-white text-center">
            {t("auth.get_started.title")}
          </Text>
        </View>
        <View className="w-full">
          <GoogleSigninButton onPress={googleSignIn} />
          <Link
            href="/signin"
            className="mb-[9px] text-center w-full text-white py-2.5 bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center active:bg-transparent active:text-pink-1100 hover:text-pink-1100 hover:bg-transparent"
          >
            <Text className="text-base font-semibold leading-[22px]">
              {t("auth.get_started.existing_wallet")}
            </Text>
          </Link>
          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="w-full h-[45px] bg-black-1100 rounded-[15px] flex items-center justify-center"
          >
            <Text className="text-base font-semibold text-white leading-[22px]">
              {t("auth.get_started.create_wallet")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GetStarted;
