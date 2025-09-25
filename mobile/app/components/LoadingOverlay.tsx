// components/LoadingOverlay.tsx
import { RootState } from "@/src/store";
import React, { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Animated, ActivityIndicator } from "react-native";
import { Portal } from "react-native-paper";
import { useSelector } from "react-redux";

const LoadingOverlay = () => {
  const { visible, text } = useSelector((state: RootState) => state.progress);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();

  const displayText = useMemo(() => {
    if (text) return text;
    return t("common.loading");
  }, [text]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.8);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Portal>
      <View className="flex-1 items-center justify-center bg-[rgba(31,31,31,0.5)] absolute top-0 bottom-0 h-full w-full z-50">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          className="bg-[#191919] rounded-[16px] px-6 py-10 w-[80%] items-center"
        >
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white text-center text-lg mt-4">
            {displayText}
          </Text>
        </Animated.View>
      </View>
    </Portal>
  );
};

export default LoadingOverlay;
