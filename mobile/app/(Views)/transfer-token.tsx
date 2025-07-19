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
import { BackButton } from "../components/BackButton";
import TokenPreview from "../components/TokenPreview";
import { TokenQuotes } from "@/src/types/balance";

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
              <BackButton />

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
                return (
                  <Pressable
                    key={tokenSymbol}
                    onPress={() => {
                      router.push({
                        pathname: "/(Views)/withdrawal-view",
                        params: {
                          symbol: tokenSymbol,
                        },
                      });
                    }}
                  >
                    <TokenPreview
                      token={tokenSymbol as keyof TokenQuotes}
                      amount={balance}
                    />
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
