import React, { useEffect, useRef } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onConfirm?: () => void;
  onReject?: () => void;
  showAnimation?: boolean;
  text: string;
}

const DialogAlert = ({
  visible,
  setVisible,
  text,
  onConfirm,
  onReject,
  showAnimation = true,
}: Props) => {
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
          <View className="flex flex-row">
            <View className="flex-row items-center justify-center gap-2 px-6">
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  if (onConfirm) {
                    onConfirm();
                  }
                }}
                className="w-1/2 h-[45px] bg-pink-1100 rounded-[15px] justify-center items-center border border-blue-1100"
              >
                <Text className="text-white font-semibold">{t('common.yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  if (onReject) {
                    onReject();
                  }
                }}
                className="w-1/2 h-[45px] bg-black-1100 rounded-[15px] justify-center items-center"
              >
                <Text className="text-white font-semibold">{t('common.no')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default DialogAlert;
