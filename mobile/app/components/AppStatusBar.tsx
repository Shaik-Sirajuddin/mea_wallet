import { usePathname } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { View, StatusBar } from "react-native";
import * as SystemUI from "expo-system-ui";

const MyStatusBar = () => {
  const pathname = usePathname();

  const bgColor = useMemo(() => {
    if (pathname === "/") {
      return "#F2C7F8";
    }
    return "#1F1F1F";
  }, [pathname]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(bgColor);
  }, [bgColor]);
  return (
    <View>
      <StatusBar translucent backgroundColor={bgColor} />
    </View>
  );
};

export default MyStatusBar;
