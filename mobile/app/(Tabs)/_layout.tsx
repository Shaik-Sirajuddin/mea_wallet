import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import SvgIcon from "../components/SvgIcon";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import InfoAlert from "../components/InfoAlert";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUserEmail } from "@/src/features/user/userSlice";
import { router } from "expo-router";

export default function TabLayout() {
  const { t } = useTranslation();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const dispatch = useDispatch();

  const checkAuthenticated = async () => {
    const result = await useAuth.loginStatus();
    console.log("auth result", result);
    if (typeof result === "string" || !result.loggedIn) {
      console.log(result);
      setPopUpVisible(true);
      return;
    }
    dispatch(setUserEmail(result.UserEmail));
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <View className="flex-1 h-full font-pretendard">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#2a2a2a",
            borderTopWidth: 0,
            paddingBottom: 28,
            paddingTop: 10,
            height: 70,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 4,
          },
          tabBarActiveTintColor: "#D107FB",
          tabBarInactiveTintColor: "#B9B9B9",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={require("@/assets/images/home-icon.png")}
                focused={focused}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tabs.Screen
          name="staking"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={require("@/assets/images/stk_icon.png")}
                focused={focused}
                width={25}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tabs.Screen
          name="lock"
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                <SvgIcon
                  name="lock"
                  width="20"
                  height="22"
                  color={focused ? "#D107FB" : "#B9B9B9"}
                />
                <Underline focused={focused} />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tabs.Screen
          name="swap-tokens"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={require("@/assets/images/swap_icon.png")}
                focused={focused}
                width={25}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="flex flex-col items-center justify-center">
                <SvgIcon
                  name="settings"
                  width="23"
                  height="23"
                  color={focused ? "#D107FB" : "#B9B9B9"}
                />
                <Underline focused={focused} />
              </View>
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tabs>

      <InfoAlert
        setVisible={setPopUpVisible}
        visible={popUpVisible}
        text={t("common.session_expired")}
        showAnimation={false}
        onDismiss={() => {
          router.replace("/(auth)/signup");
        }}
      />
    </View>
  );
}

const TabIcon = ({
  icon,
  focused,
  width = 20,
}: {
  icon: any;
  focused: boolean;
  width?: number;
}) => (
  <View className="flex flex-col items-center justify-center">
    <Image
      source={icon}
      style={{
        width,
        height: 22,
        tintColor: focused ? "#D107FB" : "#B9B9B9",
      }}
    />
    <Underline focused={focused} />
  </View>
);

const Underline = ({ focused }: { focused: boolean }) => (
  <View
    className={`w-[150%] h-[1px] rounded-full ${
      focused ? "bg-pink-1100" : "transparent"
    } absolute -top-5`}
  />
);
