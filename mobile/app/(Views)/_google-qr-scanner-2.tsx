import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import PopupModal from "../components/Model";
import SvgIcon from "../components/SvgIcon";

const GoogleQRScanner2 = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
        <View className="w-full">
          <View className="items-center relative">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute left-0 top-0 z-10 p-2"
            >
              <SvgIcon name="leftArrow" width="22" height="22" />
            </Pressable>
            <Text className="text-lg font-semibold text-white">QR Scanner</Text>
          </View>
          <View className="relative mt-10">
            <View className="items-center mt-[148px]">
              <SvgIcon name="qrScannerIcon" width="212" height="210" />
              <Image
                source={require("../../assets/images/scanner-img.svg")}
                className="mb-12"
                alt="Scanner"
              />
              <Text className="text-[21px] font-semibold text-white mb-2.5">
                Google QR code
              </Text>
              <Text className="text-[17px] text-center px-12 font-normal leading-5 text-gray-1000">
                Can't access video stream Make sure your camera is enabled
              </Text>
            </View>
          </View>
        </View>
      </View>
      <PopupModal visible={modalVisible} setVisible={setModalVisible}>
        <Text className="text-white font-bold text-center text-[18px] mb-2">
          Missing address
        </Text>
        <Text className="text-[17px] text-center px-6 leading-[22px] text-gray-1000 mb-[14px]">
          Please enter your withdrawal address.
        </Text>
      </PopupModal>
    </View>
  );
};

export default GoogleQRScanner2;
