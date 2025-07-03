import { Alert, View } from "react-native";
import GetStarted from "./(auth)/get-started";
import "@/i18n/index";
import Home from "./(Tabs)/home";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
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

  // const intialize = async () => {
  //   SplashScreen.hide();
  // };
  // useEffect(() => {
  //   intialize();
  // }, []);

  return (
    <View className="flex-1 h-full font-pretendard w-full bg-pink-1000">
      {/* <GetStarted /> */}
      {/* {sessionTokenExists ? <Home /> : <GetStarted />} */}
    </View>
  );
}
