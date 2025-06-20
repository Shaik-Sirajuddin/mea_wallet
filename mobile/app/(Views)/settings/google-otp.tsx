import SvgIcon from "@/app/components/SvgIcon";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

const GoogleOTP = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10 justify-center">
        <View className="items-center">
          <Pressable
            className="absolute left-0 top-2"
            onPress={() => navigation.goBack()}
          >
            <SvgIcon name="leftArrow" width="21" height="21" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">Google OTP</Text>
        </View>

        <View className="my-auto">
          <View className="w-full">
            {/* QR Code */}
            <View className="items-center">
              <Image
                source={require("@/assets/images/qr-code2.png")}
                className="max-w-[390px]"
                resizeMode="contain"
              />
            </View>

            {/* Input with Copy Button */}
            <View className="relative my-8">
              <TextInput
                placeholder="Enter OTP Code"
                placeholderTextColor="#FFFFFF"
                className="text-base text-white font-semibold px-3 border border-gray-1000 w-full h-[53px] rounded-[6px]"
              />
              <View className="bg-black-1200 mb-8 flex-row rounded-md py-4 px-3 mt-2">
                <Text className="text-base font-semibold text-white">
                  OTP code Setting Key
                </Text>
                <Text className="text-[15px] text-gray-1000 inline-block ml-2">
                  sdasdaderwerqw
                </Text>
              </View>

              {/* Instruction List */}
              <View className="pl-6 pr-10">
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">1</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    Install the Google Authenticator app from the Google Play
                    Store.
                  </Text>
                </View>
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">2</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    Launch the Google Authenticator app and click the "+" button
                    at the bottom.
                  </Text>
                </View>
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">3</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    Click the "Scan QR Code" button and scan the "QR Code" to
                    register Google OTP.
                  </Text>
                </View>
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">4</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    Enter Google OTP code when withdrawing money.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GoogleOTP;
