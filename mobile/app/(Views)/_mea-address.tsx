import * as Clipboard from "expo-clipboard";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SvgIcon from "../components/SvgIcon";

const MeaAddress = () => {
  const navigation = useNavigation();

  const handleCopy = async () => {
    await Clipboard.setStringAsync("FBTLx.....");
    Alert.alert("Success", "Address copied to clipboard");
  };

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10 flex-col justify-between">
        <View className="items-center relative">
          <Pressable
            onPress={() => navigation.goBack()}
            className="absolute left-0 top-0 z-10 p-2"
          >
            <SvgIcon name="leftArrow" width="21" height="21" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">
            Your MEA Address
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
                Your MEA Address
              </Text>
              <Text className="text-base leading-5 text-center text-gray-1000 font-normal">
                Use this address to receive tokens and collectibles on{" "}
                <Text className="text-white font-medium">MEA.</Text>
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 h-[45px] bg-black-1100 rounded-[15px] mb-3"
            onPress={handleCopy}
          >
            <Text className="text-base font-semibold text-white">
              FBTLx.....
            </Text>
            <SvgIcon name="copyIcon" />
          </TouchableOpacity>
          <PrimaryButton
            onPress={() => {
              Share.share({
                message: "FBTLx.....",
                title: "My MEA Address",
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
