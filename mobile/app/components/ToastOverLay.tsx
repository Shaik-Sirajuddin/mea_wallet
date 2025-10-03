// components/ToastOverlay.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Portal } from "react-native-paper";

interface Props {
  visible: boolean;
  type?: "success" | "error";
  message: string;
  duration?: number; // auto hide duration in ms
  onHide?: () => void;
}

const ToastOverlay: React.FC<Props> = ({
  visible,
  type = "success",
  message,
  duration = 2000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => onHide && onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Portal>
      <Animated.View
        style={{
          transform: [{ translateY }],
          opacity: opacityAnim,
        }}
        className={`absolute top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <Text className="text-white text-center font-MetropolisMedium">
          {message}
        </Text>
      </Animated.View>
    </Portal>
  );
};

export default ToastOverlay;
