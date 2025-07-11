import { View } from "react-native";
import "@/i18n/index";
import { useRoute } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import { configureReanimatedLogger } from "react-native-reanimated";
import React from "react";
import * as SplashScreen from "expo-splash-screen";

configureReanimatedLogger({ strict: false });

export default function HomeScreen() {
  const route = useRoute();
  //@ts-expect-error this
  const { sessionTokenExists } = route.params ?? {};

  useFocusEffect(
    React.useCallback(() => {
      if (sessionTokenExists) {
        router.replace("/(Tabs)/home");
      } else {
        router.replace("/get-started");
      }
      // Do something when the screen is focused
      return () => {
        setTimeout(() => {
          SplashScreen.hide();
        }, 200);
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <View className="flex-1 h-full font-pretendard w-full bg-pink-1000"></View>
  );
}
