import { router, useNavigation } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import SvgIcon from "../components/SvgIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { TokenBalances } from "@/src/types/balance";
import Decimal from "decimal.js";
import { tokenImageMap } from "@/utils/ui";

const LockUpScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const lockedBalance = useSelector(
    (state: RootState) => state.balance.lockup || {}
  );
  const quotes = useSelector((state: RootState) => state.token.quotes || {});

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto ">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="px-4 pt-8"
        >
          <View className="w-full pb-20">
            <View className="items-center relative">
              <Text className="text-lg font-semibold text-white">Lock Up</Text>
            </View>

            <View className="relative mt-10">
              {Object.entries(lockedBalance).map(([tokenSymbol, amount]) => {
                const tokenPrice = quotes[tokenSymbol as keyof TokenBalances];
                const tokenValue = new Decimal(tokenPrice).mul(amount);
                return (
                  <Pressable
                    key={tokenSymbol}
                    className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
                    onPress={() => {
                      router.push({
                        pathname: "/(Views)/lock-up-history",
                        params: {
                          symbol: tokenSymbol,
                        },
                      });
                    }}
                  >
                    <View className="flex flex-row items-center gap-[11px]">
                      <Image
                        source={tokenImageMap[tokenSymbol]}
                        className="w-12 h-12 rounded-full"
                        resizeMode="cover"
                      />
                      <View>
                        <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                          {tokenSymbol.toUpperCase()}
                        </Text>
                        <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                          {amount} {tokenSymbol.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View className="absolute left-44 top-3 w-[90px] text-[15px] font-medium leading-none text-gray-1200 rounded border  px-[5px] border-gray-1400">
                      <Text className="text-gray-1200 font-medium w-full text-center">
                        Unavailable
                      </Text>
                    </View>
                    <View className="flex-row justify-between  items-start gap-4 ">
                      <View className="text-end items-end">
                        <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                          ${tokenValue.toFixed(2)}
                        </Text>
                        <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                          ${tokenPrice}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LockUpScreen;
