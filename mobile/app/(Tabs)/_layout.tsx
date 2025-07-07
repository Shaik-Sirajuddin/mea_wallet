import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import SvgIcon from "../components/SvgIcon";
import HomeScreen from "./home";
import LockScreen from "./lock";
import SettingsScreen from "./settings";
import SwapTokens from "./swap-tokens";
import InfoAlert from "../components/InfoAlert";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import Staking from "./staking";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const { t } = useTranslation();
  const [popoUpVisible, setPopUpVisible] = useState(false);

  //check for authentication
  const checkAuthenticated = async () => {
    const result = await useAuth.loginStatus();
    console.log("auth result", result);
    if (typeof result === "string" || !result.loggedIn) {
      //todo : can be specific for error handling
      console.log(result);
      setPopUpVisible(true);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <View className="flex-1 h-full font-pretendard">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#2a2a2a",
            borderTopWidth: 0,
            paddingBottom: 28,
            paddingTop: 10,
            height: 70,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 4,
          },
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: "#fff",
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                {/* <SvgIcon
                  name="home"
                  width="20"
                  height="22"
                  color={focused ? "#D107FB" : "#B9B9B9"}
                /> */}
                <Image
                  source={require("@/assets/images/home-icon.png")}
                  style={{
                    width: 20,
                    height: 22,
                    tintColor: focused ? "#D107FB" : "#B9B9B9",
                  }}
                />
                <View
                  className={`w-[150%] h-[1px] rounded-full ${
                    focused ? "bg-pink-1100" : "transparent"
                  } absolute -top-5`}
                />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="staking"
          component={Staking}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                {/* <SvgIcon
                  name="grid"
                  width="22"
                  height="22"
                  color={focused ? "#D107FB" : "#B9B9B9"}
                /> */}
                <Image
                  source={require("@/assets/images/stk_icon.png")}
                  style={{
                    width: 25,
                    height: 22,
                    tintColor: focused ? "#D107FB" : "#B9B9B9",
                  }}
                />
                <View
                  className={`w-[150%] h-[1px] rounded-full ${
                    focused ? "bg-pink-1100" : "transparent"
                  } absolute -top-5`}
                />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="lock"
          component={LockScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                <SvgIcon
                  name="lock"
                  width="20"
                  height="22"
                  color={focused ? "#D107FB" : "#B9B9B9"}
                />
                <View
                  className={`w-[150%] h-[1px] rounded-full ${
                    focused ? "bg-pink-1100" : "transparent"
                  } absolute -top-5`}
                />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="swap"
          component={SwapTokens}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                <Image
                  source={require("@/assets/images/swap_icon.png")}
                  style={{
                    width: 25,
                    height: 22,
                    tintColor: focused ? "#D107FB" : "#B9B9B9",
                  }}
                />
                <View
                  className={`w-[150%] h-[1px] rounded-full ${
                    focused ? "bg-pink-1100" : "transparent"
                  } absolute -top-5`}
                />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                <SvgIcon
                  name="settings"
                  width="23"
                  height="23"
                  color={focused ? "#D107FB" : "#B9B9B9"}
                />
                {/* <View className="w-[5px] h-[5px] rounded-full bg-pink-1100 absolute -top-2 -right-2" /> */}
                <View
                  className={`w-[150%] h-[1px] rounded-full ${
                    focused ? "bg-pink-1100" : "transparent"
                  } absolute -top-5`}
                />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
      <InfoAlert
        setVisible={setPopUpVisible}
        visible={popoUpVisible}
        text={t("common.session_expired")}
        showAnimation={false}
        onDismiss={() => {
          router.replace("/(auth)/signup");
        }}
      />
    </View>
  );
}
