// src/app/(staking)/StakingPlans.tsx

import { BackButton } from "@/app/components/BackButton";
import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import SvgIcon from "@/app/components/SvgIcon";
import useStaking, { StakingPlan } from "@/hooks/useStaking";
import { tokenImageMap } from "@/utils/ui";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const StakingPlans = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<StakingPlan[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});
  const [popupVisible, setPopupVisible] = useState(false);

  const syncPlans = async (requestedPage = 1) => {
    setLoading(true);
    const res = await useStaking.getStakingList(requestedPage);

    if (typeof res === "string") {
      setModalState({
        text: res,
        type: "error",
      });
      setPopupVisible(true);
    } else {
      if (requestedPage === 1) {
        setPlans(res.plans);
      } else {
        setPlans((prev) => [...prev, ...res.plans]);
      }
      setTotalPages(res.totalPages);
    }

    setLoading(false);
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      syncPlans(nextPage);
    }
  };

  useEffect(() => {
    syncPlans(1);
  }, []);

  const renderItem = ({ item }: { item: StakingPlan }) => (
    <View className="bg-black-1200 border-black-1200 border-2 rounded-2xl p-4 mb-3">
      {/* Plan Name */}
      <Text className="text-white font-semibold text-lg mb-3">{item.name}</Text>

      {/* Supported Tokens as overlapping images */}
      <View className="flex flex-row mb-3">
        {item.supportedTokens.map((symbol, index) => (
          <View
            key={symbol}
            className={`w-9 h-9 rounded-full overflow-hidden border-2 border-black-800 ${
              index !== 0 ? "-ml-3" : ""
            }`}
          >
            <Image
              source={tokenImageMap[symbol]}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        ))}
      </View>

      {/* Details Table */}
      <View className="bg-black-700 rounded-xl p-3 mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-400 text-base">{t("staking.state")}</Text>
          <Text className="text-white text-lg font-medium">{item.state}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-400 text-base">
            {t("staking.lockup_period")}
          </Text>
          <Text className="text-white text-lg font-medium">
            {item.lockupDays}
          </Text>
        </View>
        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-400 text-base">
            {t("staking.compensation")}
          </Text>
          <Text className="text-green-500 text-xl font-bold">
            {item.interestRate}%
          </Text>
        </View>
        <View className="flex-row justify-between mb-3">
          <Text className="text-gray-400 text-base">
            {t("staking.early_withdrawl_fee")}
          </Text>
          <Text className="text-white text-lg font-medium">
            {item.unstakingFee}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-400 text-base">
            {t("staking.min_deposit")}
          </Text>
          <Text className="text-white text-lg font-medium">
            {item.minDeposit}
          </Text>
        </View>
      </View>

      {/* Enroll Button */}
      <Pressable
        className="bg-pink-1100 rounded-xl py-2 items-center"
        onPress={() => {
          // Implement enroll navigation or logic here
          router.push({
            pathname: "/(Views)/staking/enroll-plan",
            params: {
              plan: JSON.stringify(item),
            },
          });
          console.log("Enroll pressed for plan", item.id);
        }}
      >
        <Text className="text-white font-semibold text-base">
          {t("staking.staking")}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-5xl mx-auto">
        <View className="items-center relative">
          <BackButton />
          <Text className="text-lg font-semibold text-white">
            {t("staking.staking")}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-2 mt-6">
          <View className="flex-row items-center gap-2">
            <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
            <Text className="text-base font-medium text-white">
              {t("staking.staking_list")}
            </Text>
          </View>
        </View>

        <Text className="text-white text-center my-4">
          {t("staking.product_details")}
        </Text>

        <FlatList
          className="mt-4 h-full"
          data={plans}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="small" color="#fff" className="mt-4" />
            ) : page < totalPages ? (
              <TouchableOpacity
                onPress={loadMore}
                activeOpacity={1}
                className="bg-pink-1100 rounded-[15px] px-4 py-2 mt-4 items-center"
              >
                <Text className="text-white font-semibold">
                  {t("common.load_more")}
                </Text>
              </TouchableOpacity>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 130 }}
        />
      </View>

      <InfoAlert
        {...modalState}
        visible={popupVisible}
        setVisible={setPopupVisible}
      />
    </View>
  );
};

export default StakingPlans;
