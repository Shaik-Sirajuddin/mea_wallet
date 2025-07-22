import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Share, Text, TouchableOpacity, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SvgIcon from "../components/SvgIcon";
import { BackButton } from "../components/BackButton";
import { truncateAddress } from "@/utils/ui";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { TokenBalances } from "@/src/types/balance";

const MeaAddress = () => {
  const { symbol } = useLocalSearchParams<{
    symbol: keyof TokenBalances;
  }>();

  const displaySymbol = symbol.toUpperCase();
  const depositAddress = useSelector(
    (state: RootState) => state.deposit.depositAddresses[0]
  );

  const handleCopy = async () => {
    await Clipboard.setStringAsync(depositAddress);
  };

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto flex-col justify-between">
        <View className="items-center relative">
          <BackButton />
          <Text className="text-lg font-semibold text-white">
            Your {displaySymbol} Address
          </Text>
        </View>
        <View className="relative mt-10">
          <View className="items-center">
            <Image
              source={require("../../assets/images/qr-code2.png")}
              className="mb-14"
              style={{ width: 200, height: 200 }}
            />
            <View className="px-20">
              <Text className="text-[21px] text-center leading-2.5 font-semibold text-white mb-2">
                Your {displaySymbol} Address
              </Text>
              <Text className="text-base leading-5 text-center text-gray-1000 font-normal">
                Use this address to receive tokens and collectibles on{" "}
                <Text className="text-white font-medium">{displaySymbol}</Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            className="p-4 flex-row items-center justify-center gap-2 h-[45px] bg-black-1100 rounded-[15px] mb-3"
            onPress={handleCopy}
          >
            <Text className="text-base font-semibold text-white">
              {truncateAddress(depositAddress)}
            </Text>
            <SvgIcon name="copyIcon" />
          </TouchableOpacity>
          <PrimaryButton
            onPress={() => {
              Share.share({
                message: depositAddress,
                title: `My ${displaySymbol} Address`,
              });
            }}
            text="Share"
          />
        </View>
      </View>
    </View>
  );
};

export default MeaAddress;
