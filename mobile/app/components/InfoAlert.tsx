import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Portal } from "react-native-paper";
import { useTranslation } from "react-i18next";

export interface InfoAlertProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onDismiss?: () => void;
  showAnimation?: boolean;
  text?: string;
  type?: "success" | "error" | "info";
}

const InfoAlert = ({
  visible,
  setVisible,
  text = "no text passed",
  onDismiss,
  showAnimation = true,
  type = "success",
}: InfoAlertProps) => {
  const { t } = useTranslation();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      if (!showAnimation) {
        scaleAnim.setValue(1);
        opacityAnim.setValue(1);
      }
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
      <View className="flex-1 items-center justify-center bg-[rgba(31,31,31,0.5)] px-3 absolute top-0 bottom-0 h-full w-full z-50">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          className="bg-[#191919] rounded-[16px] px-4 pb-8 pt-10 w-full"
        >
          <View className="flex gap-4">
            <Text className="text-white text-center text-lg">{text}</Text>
            <PrimaryButton
              text={t("common.ok")}
              onPress={() => {
                setVisible(false);
                if (onDismiss) onDismiss();
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
};

export default InfoAlert;
