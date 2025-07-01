import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";

import { AppDispatch, RootState } from "@/src/store";
import useUser from "@/hooks/useUser";
import SvgIcon from "../components/SvgIcon";
import PopupModal from "../components/Model";
import PrimaryButton from "../components/PrimaryButton";
import {
  setFreeBalances,
  setLockupBalances,
} from "@/src/features/balance/balanceSlice";
import { tokenImageMap, trimTrailingZeros } from "@/utils/ui";
import { setQuotes } from "@/src/features/token/tokenSlice";
import Decimal from "decimal.js";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [showLokcupBalance, setShowLockUpBalance] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const quotes = useSelector((state: RootState) => state.token.quotes || {});
  const freeBalance = useSelector(
    (state: RootState) => state.balance.free || {}
  );
  const lockedBalance = useSelector(
    (state: RootState) => state.balance.lockup || {}
  );

  const syncData = async () => {
    setRefreshing(true);
    await Promise.all([fetchBalance(), fetchQuotes()]);
    setRefreshing(false);
  };

  const fetchQuotes = async () => {
    const res = await useUser.getQuotes();
    if (typeof res === "string") {
      console.log(res, "fetch quotes");
      return;
    }
    dispatch(setQuotes(res));
  };

  const fetchBalance = async () => {
    const res = await useUser.getBalance();
    if (typeof res === "string") {
      console.log(res, "fetch balance");
      return;
    }
    dispatch(setFreeBalances(res.free));
    dispatch(setLockupBalances(res.lockup));
  };

  const onRefresh = async () => {
    syncData();
  };

  useEffect(() => {
    syncData();
  }, []);

  // useEffect(() => {
  //   router.navigate({
  //     pathname: "/(Views)/TokenActionsView",
  //     params: {
  //       symbol: "mea",
  //     },
  //   });
  // }, []);

  const totalAssetValue = () => {
    let totalValue = new Decimal(0);
    for (let [token, amount] of Object.entries(freeBalance)) {
      //@ts-expect-error here
      totalValue = totalValue.add(new Decimal(amount).mul(quotes[token]));
    }
    for (let [token, amount] of Object.entries(lockedBalance)) {
      //@ts-expect-error here
      totalValue = totalValue.add(new Decimal(amount).mul(quotes[token]));
    }
    return trimTrailingZeros(totalValue.toFixed(2));
  };
  const getPrice = (token: string) => {
    totalAssetValue();
    //@ts-expect-error here
    return quotes[token];
  };

  const getTokensValue = (token: string, balance: string) => {
    return trimTrailingZeros(
      //@ts-expect-error here
      new Decimal(quotes[token]).mul(balance).toFixed(2)
    );
  };

  const getTokenImage = (token: string) => {
    const key = token.toLowerCase();
    return tokenImageMap[key] || require("@/assets/images/coin-img.png");
  };

  return (
    <View className="bg-black-1000">
      <View className="gap-10 min-h-screen max-w-5xl w-full mx-auto">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="w-full pt-14"
        >
          <View className="pb-44 px-4">
            <Pressable
              onPress={() => setShowEditProfile(true)}
              className="flex-row items-center gap-2"
            >
              <View className="bg-pink-1100 w-10 h-10 rounded-full items-center justify-center">
                <Text className="text-lg font-medium text-white leading-[22px] tracking-[-0.36px]">
                  1
                </Text>
              </View>
              <Text className="text-[22px] text-white font-medium tracking-[-0.44px] leading-[22px]">
                mecca
              </Text>
            </Pressable>

            <View className="items-center mt-[46px] mb-10">
              <SvgIcon name="spaceman" width="74" height="74" />
              <Text className="text-white text-[37px] mt-2 font-semibold">
                ${totalAssetValue()}
              </Text>
              <View className="flex-row items-center justify-center gap-1.5">
                <Text className="text-base font-medium text-pink-1200">
                  ${parseFloat(freeBalance.mea || "0") * 1.0}
                </Text>
                <View className="text-lg font-medium leading-[12px] text-pink-1200 bg-pink-1200/15 rounded-[5px] py-[5px] px-1">
                  <Text className="text-pink-1200">+2.13%</Text>
                </View>
              </View>
            </View>

            <View className="flex-row max-w-[280px] mx-auto gap-[7px]">
              <View className="bg-black-1300 rounded-2xl items-center  flex-1">
                <Link href="/receive-items">
                  <View className="w-full items-center p-[18px] py-[17px]">
                    <SvgIcon name="receiceIcon" width="24" height="24" />
                    <Text className="text-[13px] font-semibold mt-1 text-gray-1000">
                      Receive
                    </Text>
                  </View>
                </Link>
              </View>
              <View className="bg-black-1300 rounded-2xl items-center  flex-1">
                <Link href="/select-token">
                  <View className="w-full items-center p-[18px] py-[17px]">
                    <SvgIcon name="sendIcon" width="24" height="24" />
                    <Text className="text-[13px] font-semibold mt-1 text-gray-1000">
                      Send
                    </Text>
                  </View>
                </Link>
              </View>
              <View className="bg-black-1300 rounded-2xl items-center  flex-1">
                <Link href="/swap-tokens">
                  <View className="w-full items-center p-[18px] py-[17px]">
                    <SvgIcon name="swapIcon" width="24" height="24" />
                    <Text className="text-[13px] font-semibold mt-1 text-gray-1000">
                      Swap
                    </Text>
                  </View>
                </Link>
              </View>
            </View>

            <View className="flex-row items-center gap-[17px] my-5">
              <TouchableOpacity
                onPress={() => {
                  setShowLockUpBalance(false);
                }}
              >
                <Text
                  className={`text-xl font-semibold leading-[33px] ${
                    !showLokcupBalance ? "text-white" : "text-gray-1000"
                  }`}
                >
                  Native
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowLockUpBalance(true);
                }}
              >
                <Text
                  className={`text-xl font-semibold leading-[33px] ${
                    showLokcupBalance ? "text-white" : "text-gray-1000"
                  }`}
                >
                  Lock up
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full">
              {Object.entries(
                showLokcupBalance ? lockedBalance : freeBalance
              ).map(([token, amount]) => (
                <TouchableOpacity
                  key={token}
                  onPress={() => {
                    router.navigate({
                      pathname: "/(Views)/TokenActionsView",
                      params: {
                        symbol: token,
                      },
                    });
                  }}
                >
                  <View className="border-2 mb-2 border-black-1200 bg-black-1200 rounded-2xl flex-row items-center justify-between py-[13px] px-3">
                    <View className="flex-row items-center gap-[11px]">
                      <Image
                        source={getTokenImage(token)}
                        className="w-12 h-12 rounded-full"
                      />
                      <View>
                        <Text className="text-[17px] font-medium leading-5 text-white">
                          {token.toUpperCase()}
                        </Text>
                        <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                          {amount} {token.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-[17px] font-medium leading-5 text-white text-right">
                        ${getTokensValue(token, amount)}
                      </Text>
                      <Text className="text-[15px] font-normal leading-5 text-gray-1200 text-right">
                        ${getPrice(token)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* 
            <View className="mt-[31px]">
              <Text className="text-xl font-semibold leading-8 text-white mb-2.5">
                Recent Activities
              </Text>
            </View>
            <View className="w-full">
              {["MEA", "SOL", "RECON"].map((token, idx) => (
                <View
                  key={idx}
                  className="border-2 mb-2 border-black-1200 bg-black-1200 rounded-2xl flex-row items-center justify-between py-[13px] px-3"
                >
                  <View className="flex-row items-center gap-[11px]">
                    <Image
                      source={getTokenImage(token)}
                      className="w-12 h-12 rounded-full"
                    />
                    <View>
                      <Text className="text-[17px] font-medium leading-5 text-white">
                        {token}
                      </Text>
                      <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                        0 {token}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="text-[17px] font-medium leading-5 text-white text-right">
                      $0.00
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200 text-right">
                      $0.00
                    </Text>
                  </View>
                </View>
              ))}
            </View> */}
          </View>
        </ScrollView>
      </View>
      <PopupModal visible={showEditProfile} setVisible={setShowEditProfile}>
        <View className="w-full px-4 flex-col items-center justify-center text-center">
          <View className="w-16 h-16 bg-pink-1100 rounded-full items-center justify-center">
            <Text className="text-[25px] font-medium text-white">1</Text>
          </View>
          <Text className="text-[22px] font-medium text-white mt-3 mb-6">
            mecca
          </Text>
          <PrimaryButton
            onPress={() => router.push("/(Views)/settings/edit-profile")}
            text="Edit Profile"
          />
        </View>
      </PopupModal>
    </View>
  );
}
