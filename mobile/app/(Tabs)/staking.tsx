import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import SvgIcon from "../components/SvgIcon";
import { router } from "expo-router";

export default function Staking() {
  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto py-8 px-4">
        <View className="items-center relative">
          <Text className="text-lg font-semibold text-white">Staking</Text>
        </View>
        <View className="mt-10">
          <Pressable
            onPress={() => router.push("/(Views)/settings/change-password")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../assets/images/passive-income.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              Plans
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(Views)/settings/change-password")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../assets/images/task.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              My Staking
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(Views)/settings/change-password")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../assets/images/history.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              History
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
