import SvgIcon from "@/app/components/SvgIcon";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const WalletAddress = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10 justify-between">
        <View className="items-center">
          <Pressable
            className="absolute left-0 top-2"
            onPress={() => navigation.goBack()}
          >
            <SvgIcon name="leftArrow" width="21" height="21" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">
            Wallet Address
          </Text>
        </View>

        <View className="mt-10 mb-2">
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
                placeholder="Enter Wallet Address"
                placeholderTextColor="#FFFFFF"
                className="text-base text-white font-semibold px-3 border border-gray-1000 w-full h-[53px] rounded-[6px]"
              />
              <TouchableOpacity
                onPress={() => Alert.alert("Copied")}
                className="absolute top-1/2 -translate-y-1/2 right-3 bg-pink-1100 py-[5px] px-[7px] rounded-2xl"
              >
                <Text className="text-black text-[14px] font-medium leading-[22px]">
                  Copy
                </Text>
              </TouchableOpacity>
            </View>

            {/* Instruction List */}
            <View className="px-6">
              <View className="flex-row items-center mb-1 gap-2.5">
                <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                  <Text className="text-white flex text-xs">1</Text>
                </View>
                <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                  This wallet address is used for deposits.
                </Text>
              </View>
              <View className="flex-row items-center mb-1 gap-2.5">
                <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                  <Text className="text-white flex text-xs">2</Text>
                </View>
                <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                  You can add up to 5 wallet addresses.
                </Text>
              </View>
              <View className="flex-row items-center mb-1 gap-2.5">
                <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                  <Text className="text-white flex text-xs">3</Text>
                </View>
                <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                  Only wallet addresses created on the Solana network can be
                  used.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="items-center mt-6">
          <TouchableOpacity
            activeOpacity={1}
            className="w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
          >
            <Text className="text-base group-active:text-pink-1100 font-semibold">
              Sharing Addresses
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WalletAddress;
