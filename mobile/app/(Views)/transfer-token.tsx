import { router, useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import SvgIcon from "../components/SvgIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { parseNumberForView, tokenImageMap } from "@/utils/ui";

const SelectToken = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const balances = useSelector((state: RootState) => state.balance.free);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className=""
        >
          <View className="w-full ">
            <View className="items-center relative">
              <Pressable
                onPress={() => navigation.goBack()}
                className="absolute left-0 top-0 z-10 p-2"
              >
                <SvgIcon name="leftArrow2" width="14" height="14" />
              </Pressable>
              <Text className="text-lg font-semibold text-white">
                {t("swap.select_token")}
              </Text>
            </View>
            <View className="relative mt-10">
              {/* <View className="relative mb-8">
                <TextInput
                  className="text-[17px] h-12 font-medium w-full text-gray-1200 placeholder:text-gray-1200 pl-[31px] bg-black-1200  rounded-[10px]"
                  placeholder="Search..."
                />
                <View className="absolute top-1/2 -translate-y-1/2 left-1.5">
                  <SvgIcon name="searchIcon" />
                </View>
              </View> */}

              {Object.entries(balances).map(([tokenSymbol, balance]) => {
                const displaySymbol = tokenSymbol.toUpperCase();
                return (
                  <Pressable
                    key={tokenSymbol}
                    className="border-2  mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl justify-between py-[13px] px-3"
                    onPress={() => {
                      router.push({
                        pathname: "/(Views)/withdrawal-view",
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
                        <Text className="text-[17px] font-medium leading-5 text-white">
                          {displaySymbol}
                        </Text>
                        <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                          {parseNumberForView(balance)} {displaySymbol}
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

export default SelectToken;
