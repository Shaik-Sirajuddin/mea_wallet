import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export default function Loan() {
  const { t } = useTranslation();

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto ">
        <View className="items-center relative">
          <Text className="text-lg font-semibold text-white">
            {t("loan.title")}
          </Text>
        </View>
        <View className="mt-10">
          <Pressable
            onPress={() => router.push("/(Views)/loan/application")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../../assets/images/passive-income.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              {t("loan.application")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(Views)/loan/overview")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../../assets/images/task.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              {t("loan.overview")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(Views)/loan/history")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../../assets/images/history.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              {t("loan.transaction_history")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
