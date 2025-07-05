import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  BackHandler,
} from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Portal } from "react-native-paper";
import { CameraView, useCameraPermissions } from "expo-camera";
import SvgIcon from "./SvgIcon";
import { useFocusEffect } from "expo-router";

const { height } = Dimensions.get("window");

interface OtpModalProps {
  visible: boolean;
  onClose: (data: string | null) => void;
}

const QRModal: React.FC<OtpModalProps> = ({ visible, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();

  const [data, setData] = useState("");
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
        setData("");
        setError(null);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Portal>
      <View className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(31,31,31,0.5)] z-50">
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="flex-1 bg-black-1000 px-4 justify-center mt-10"
        >
          {!permission ? (
            <View />
          ) : !permission.granted ? (
            <View className="flex-1 justify-center items-center px-4">
              <Text className="text-center mb-4 text-white text-xl">
                We need your permission to show the camera
              </Text>
              <Pressable
                onPress={requestPermission}
                className="bg-blue-600 px-6 py-3 rounded mt-2"
              >
                <Text className="text-white text-center font-semibold">
                  Grant Permission
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="bg-black-1000">
              <View className="w-full h-full flex">
                <View className="w-full h-full max-w-5xl mx-auto  pt-8 pb-10">
                  <View className="w-full">
                    <View className="items-center relative">
                      <Pressable
                        onPress={() => {
                          onClose(null);
                        }}
                        className="absolute left-0 top-0 z-10 p-2"
                      >
                        <SvgIcon name="leftArrow" width="22" height="22" />
                      </Pressable>
                      <Text className="text-lg font-semibold text-white">
                        QR Scanner
                      </Text>
                    </View>
                    <View className="relative mt-10">
                      <View className="items-center mt-[18px]">
                        <View>
                          <CameraView
                            style={{
                              height: 300,
                              width: 300,
                            }}
                            onBarcodeScanned={(result) => {
                              onClose(result.data);
                            }}
                          ></CameraView>
                          <View className="absolute left-0 right-0 top-0 bottom-0 h-full justify-center items-center">
                            <SvgIcon
                              name="qrScannerIcon"
                              width="240"
                              height="240"
                            />
                          </View>
                        </View>

                        <Text className="mt-10 text-[21px] font-semibold text-white mb-2.5">
                          QR code
                        </Text>
                        <Text className="text-[17px] font-normal leading-5 text-gray-1000">
                          Scan the QR Code to detect Address
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    </Portal>
  );
};

export default QRModal;
