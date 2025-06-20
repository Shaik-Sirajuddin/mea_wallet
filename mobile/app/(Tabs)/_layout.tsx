import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import SvgIcon from "../components/SvgIcon";
import AttachScreen from "./attach";
import GridScreen from "./grid";
import HomeScreen from "./home";
import LockScreen from "./lock";
import SettingsScreen from "./settings";
import SwapTokens from "../(Views)/swap-tokens";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
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
              <SvgIcon
                name="home"
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
              <SvgIcon
                name="attach"
                width="22"
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
        name="grid"
        component={GridScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="flex flex-col items-center justify-center">
              <SvgIcon
                name="grid"
                width="22"
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
              <View className="w-[5px] h-[5px] rounded-full bg-pink-1100 absolute -top-2 -right-2" />
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
  );
}
