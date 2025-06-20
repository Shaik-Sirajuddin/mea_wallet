import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import SvgIcon from "../components/SvgIcon";

const ReceiveItems = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  const performCopy = () => {};
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (copyIndex) {
      setTimeout(() => {
        setCopyIndex(null);
      }, 1500);
    }
  }, [copyIndex]);
  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="pt-8"
        >
          <View className="w-full pb-20">
            <View className="items-center relative">
              <Pressable
                onPress={() => navigation.goBack()}
                className="absolute left-1 top-2 z-10 p-2"
              >
                <SvgIcon name="crossIcon" width="14" height="14" />
              </Pressable>
              <Text className="text-lg font-semibold text-white">Receive</Text>
            </View>
            <View className="relative mt-10">
              <View className="flex flex-row items-center mb-2 justify-between bg-black-1200 rounded-[15px] p-4">
                <View className="flex flex-row items-center gap-3">
                  <SvgIcon name="coinImg2" width="47" height="47" />
                  <View>
                    <Text className="text-[17px] font-medium leading-[22px] text-white">
                      MEA
                    </Text>
                    <View className="flex-row items-center gap-1">
                      <Text className="text-[15px] font-medium leading-[22px] text-pink-1200">
                        Copied
                      </Text>
                      <SvgIcon name="tickIcon" />
                    </View>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <Pressable className="w-10 h-10 rounded-full active:bg-pink-1100 items-center justify-center bg-black-1000">
                    <SvgIcon name="QRIcon" />
                  </Pressable>
                  <Pressable className="w-10 h-10 active:bg-pink-1100 rounded-full items-center justify-center bg-black-1000">
                    <SvgIcon name="copyIcon" />
                  </Pressable>
                </View>
              </View>

              <View className="flex flex-row items-center mb-2 justify-between bg-black-1200 rounded-[15px] p-4">
                <View className="flex flex-row items-center gap-3">
                  <SvgIcon name="coinImg2" width="47" height="47" />
                  <View>
                    <Text className="text-[17px] font-medium leading-[22px] text-white">
                      RECON
                    </Text>
                    <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">
                      GCbax...
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <Pressable className="w-10 h-10 active:bg-pink-1100 rounded-full items-center justify-center bg-black-1000">
                    <SvgIcon name="QRIcon" />
                  </Pressable>
                  <Pressable className="w-10 h-10 active:bg-pink-1100 rounded-full items-center justify-center bg-black-1000">
                    <SvgIcon name="copyIcon" />
                  </Pressable>
                </View>
              </View>

              <View className="flex flex-row items-center mb-2 justify-between bg-black-1200 rounded-[15px] p-4">
                <View className="flex flex-row items-center gap-3">
                  <SvgIcon name="coinImg2" width="47" height="47" />
                  <View>
                    <Text className="text-[17px] font-medium leading-[22px] text-white">
                      RECON
                    </Text>
                    <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">
                      GCbax...
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <Pressable className="w-10 h-10 active:bg-pink-1100 rounded-full items-center justify-center bg-black-1000">
                    <SvgIcon name="QRIcon" />
                  </Pressable>
                  <Pressable className="w-10 h-10 active:bg-pink-1100 rounded-full items-center justify-center bg-black-1000">
                    <SvgIcon name="copyIcon" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ReceiveItems;
