import React from "react";
import { Text, View, Pressable, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import SvgIcon from "../components/SvgIcon";

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-center mb-4 text-base">
          We need your permission to show the camera
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          <Text className="text-white text-center font-semibold">
            Grant Permission
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full flex">
        <View className="w-full h-full max-w-5xl mx-auto  pt-8 pb-10">
          <View className="w-full">
            <View className="items-center relative">
              <Pressable className="absolute left-0 top-0 z-10 p-2">
                <SvgIcon name="leftArrow" width="22" height="22" />
              </Pressable>
              <Text className="text-lg font-semibold text-white">
                QR Scanner
              </Text>
            </View>
            <View className="relative mt-10">
              <View className="items-center mt-[18px]">
                <CameraView
                  style={{
                    height: 300,
                    width: 300,
                  }}
                >
                  <View className="h-full justify-center items-center">
                    <SvgIcon name="qrScannerIcon" width="240" height="240" />
                  </View>
                </CameraView>
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
  );
}
