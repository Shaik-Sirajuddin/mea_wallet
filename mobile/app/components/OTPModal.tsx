import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Portal } from "react-native-paper";

const { height } = Dimensions.get("window");

interface OtpModalProps {
  visible: boolean;
  onClose: (otp: string | null) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ visible, onClose }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setOtp("");
        setError(null);
      });
    }
  }, [visible]);

  const handleClose = () => {
    onClose(null);
    setOtp("");
    setError(null);
  };

  const onSubmit = () => {
    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    onClose(otp);
    setOtp("");
    setError(null);
  };

  if (!visible) return null;

  return (
    <Portal>
      <View className="absolute  top-0 bottom-0 left-0 right-0 bg-[rgba(31,31,31,0.5)] z-50">
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="flex-1 bg-black-1000 px-4 justify-center"
        >
          <View className="flex gap-4">
            <Text className="text-xl text-white font-semibold text-center mb-4">
              Enter Verification Code
            </Text>

            <TextInput
              value={otp}
              onChangeText={(text) => {
                setOtp(text);
                if (error) setError(null);
              }}
              placeholder="Enter OTP"
              placeholderTextColor="#ccc"
              keyboardType="number-pad"
              className="text-[17px] text-white font-medium px-4 bg-black-1200 w-full h-[55px] rounded-[10px] mb-2"
            />

            {error && (
              <Text className="text-red-500 text-sm text-center">{error}</Text>
            )}

            <PrimaryButton text="Submit" onPress={onSubmit} />

            <TouchableOpacity onPress={handleClose} className="mt-2">
              <Text className="text-gray-400 text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Portal>
  );
};

export default OtpModal;
