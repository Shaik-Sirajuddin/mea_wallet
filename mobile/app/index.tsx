import { Alert, View } from "react-native";
import GetStarted from "./(auth)/get-started";
import "@/i18n/index";
import Home from "./(Tabs)/home";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { router, useFocusEffect } from "expo-router";
import { configureReanimatedLogger } from "react-native-reanimated";

configureReanimatedLogger({ strict: false });

export default function HomeScreen() {
  const route = useRoute();
  //@ts-expect-error this
  const { sessionTokenExists } = route.params ?? {};

  useEffect(() => {
    router.replace("/(Tabs)/home");
  }, []);
  return (
    <View className="flex-1 h-full font-pretendard">
      <GetStarted />
      {/* {sessionTokenExists ? <Home /> : <GetStarted />} */}
    </View>
  );
}
