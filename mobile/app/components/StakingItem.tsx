// components/StakingItem.tsx

import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Decimal from "decimal.js";
import dayjs from "dayjs";
import { tokenImageMap } from "@/utils/ui";
import { StakingState, UserStaking } from "@/src/api/types/staking";

type Props = {
  item: UserStaking;
  handleClaim: (id: number) => void;
  handleEarlyUnstake: (id: number) => void;
};

const StakingItem: React.FC<Props> = ({
  item,
  handleClaim,
  handleEarlyUnstake,
}) => {
  const { t } = useTranslation();
  
  const accumulatedInterest = useMemo(() => {
    if (item.state === StakingState.IN_PROGRESS) {
      const start = dayjs(item.registeredAt);
      const end = dayjs(item.expectedWithdrawalDate);
      const now = dayjs();

      const elapsed = now.isAfter(end)
        ? end.diff(start, "seconds")
        : now.diff(start, "seconds");
      const total = end.diff(start, "seconds");

      const ratio = total > 0 ? elapsed / total : 0;
      return new Decimal(item.interestAtMaturity).mul(ratio).toFixed(2);
    } else {
      return Decimal.max(
        new Decimal(item.expectedFinalAmount).sub(item.depositAmount),
        0
      ).toFixed(2);
    }
  }, [item]);

  const accumulatedPercentage = useMemo(() => {
    return new Decimal(accumulatedInterest)
      .div(item.interestAtMaturity)
      .mul(100)
      .toFixed(2);
  }, [accumulatedInterest, item.interestAtMaturity]);

  const isProfit = useMemo(() => {
    return new Decimal(item.expectedFinalAmount).gt(item.depositAmount);
  }, [item.expectedFinalAmount, item.depositAmount]);

  return (
    <View className="bg-black-1200 border-black-1200 border-2 rounded-2xl p-4 mb-3">
      <View className="flex-row items-center mb-3">
        <Image
          source={tokenImageMap[item.tokenSymbol.toLowerCase()]}
          className="w-10 h-10 rounded-full mr-3"
          resizeMode="cover"
        />
        <View>
          <Text className="text-white font-semibold text-lg">
            {item.tokenSymbol.toUpperCase()}
          </Text>
          <Text className="text-gray-400 text-sm">{item.planName}</Text>
        </View>
      </View>

      <View className="bg-black-700 rounded-xl p-3 mb-4">
        <Row
          label={t("components.registered_date")}
          value={dayjs(item.registeredAt).format("YYYY-MM-DD")}
        />
        <Row label={t("components.deposit_amount")} value={item.depositAmount} />
        <Row
          label={t("components.interest_rate")}
          value={`${item.interestRate}%`}
          valueClass="!text-green-500"
        />
        <Row
          label={t("components.expected_final_amount")}
          value={new Decimal(item.depositAmount)
            .add(item.interestAtMaturity)
            .toFixed(2)}
        />
        <Row label={t("components.lockup_days")} value={item.lockupDays} />

        {item.state === StakingState.IN_PROGRESS && (
          <Row
            label={t("components.accumulated_interest")}
            value={`${accumulatedInterest} (${accumulatedPercentage}%)`}
            valueClass="!text-green-500"
          />
        )}

        {item.state === StakingState.CLOSED && (
          <Row
            label={t("components.claimed_amount")}
            value={item.expectedFinalAmount}
            valueClass={isProfit ? "!text-green-500" : "!text-red-500"}
          />
        )}
        <Row label={t("components.state")} value={item.state + item.stateStr} />
      </View>

      {item.state === StakingState.IN_PROGRESS && (
        <TouchableOpacity
          onPress={() => handleEarlyUnstake(item.id)}
          className="bg-gray-700 rounded-xl py-2 items-center"
        >
          <Text className="text-white font-semibold text-base">
            {t("components.early_unstake")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Row = ({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) => (
  <View className="flex-row justify-between mb-2">
    <Text className="text-gray-400 text-base">{label}</Text>
    <Text className={`text-white text-lg font-medium ${valueClass}`}>
      {value}
    </Text>
  </View>
);

export default StakingItem;
