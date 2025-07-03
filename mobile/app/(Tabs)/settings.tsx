import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import SvgIcon from "../components/SvgIcon";
import DialogAlert from "../components/DialogAlert";
import useAuth from "@/hooks/useAuth";
import storage from "@/storage";
import { STORAGE_KEYS } from "@/storage/keys";

export default function SettingsScreen() {
  const [popupVisible, setPopUpVisible] = useState(false);

  const performLogout = async () => {
    let result = await useAuth.logout();
    await storage.delete(STORAGE_KEYS.AUTH.TOKEN);
    if (typeof result === "string") {
      //show error dialog
      console.log("failed to logout", result);
      return;
    }
    router.replace("/signin");
  };
  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
        <View className="text-center relative">
          <View className="items-center">
            <Text className="text-lg font-semibold text-white">Setting</Text>
          </View>
          <View className="mt-10">
            <View className="w-full">
              <Pressable
                onPress={() => router.push("/(Views)/settings/change-password")}
                className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
              >
                <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
                  <SvgIcon name="passwordIcon1" />
                </View>
                <Text className="text-base font-semibold leading-5 text-white">
                  Password
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(Views)/settings/wallet-address")}
                className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
              >
                <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
                  <SvgIcon name="walletIcon1" width="16" />
                </View>
                <Text className="text-base font-semibold leading-5 text-white">
                  Wallet Address
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(Views)/settings/google-otp")}
                className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
              >
                <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
                  <View className="mt-1">
                    <SvgIcon name="googleIcon1" width="16" />
                  </View>
                </View>
                <Text className="text-base font-semibold leading-5 text-white">
                  Google OTP
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/(Views)/settings/languages-view")}
                className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
              >
                <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
                  <SvgIcon name="globleIcon1" width="16" />
                </View>
                <Text className="text-base font-semibold leading-5 text-white">
                  Language
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  router.push("/(Views)/settings/customer-support")
                }
                className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
              >
                <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
                  <SvgIcon name="headphoneIcon1" />
                </View>
                <Text className="text-base font-semibold leading-5 text-white">
                  Customer Support
                </Text>
              </Pressable>

              <Pressable
                className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
                onPress={() => {
                  setPopUpVisible(true);
                }}
              >
                <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
                  <SvgIcon name="logoutIcon1" width="16" />
                </View>
                <Text className="text-base font-semibold leading-5 text-white">
                  Logout
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <DialogAlert
        visible={popupVisible}
        setVisible={setPopUpVisible}
        onConfirm={performLogout}
        text="Are you sure want to logout?"
      />
    </View>
  );
}
