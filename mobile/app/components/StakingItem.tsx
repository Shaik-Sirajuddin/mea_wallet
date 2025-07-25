import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { tokenImageMap } from "@/utils/ui";
import { UserStaking } from "@/src/api/types/staking";
import dayjs from "dayjs";

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
  return (
    <View className="mb-4">
      <DetailRow
        label={t("staking.product_name")}
        value={t("staking.mecca_members_only")}
      />
      <DetailRow
        label={t("staking.asset")}
        value={item.tokenSymbol.toUpperCase()}
      />
      <DetailRow
        label={t("staking.date")}
        value={dayjs(item.registeredAt).format("YYYY.MM.DD HH:mm:ss")}
      />
      <DetailRow
        label={t("staking.expiration_date")}
        value={dayjs(item.expectedWithdrawalDate).format("YYYY-MM-DD")}
      />
      <DetailRow
        label={t("staking.staking_amount")}
        value={`${item.depositAmount} ${item.tokenSymbol.toUpperCase()}`}
      />
      <DetailRow
        label={t("staking.interest_rate")}
        value={`${item.interestRate} %`}
      />
      <DetailRow
        label={t("staking.lockup_period")}
        value={`${item.lockupDays} ${t("common.days")}`}
      />
      <DetailRow
        label={t("staking.unstaking_amount")}
        value={`${item.expectedFinalAmount} ${item.tokenSymbol.toUpperCase()}`}
      />
      <DetailRow
        label={t("staking.actual_amount_received")}
        value={`${item.usdtValue} ${item.tokenSymbol.toUpperCase()}`}
      />
      <DetailRow
        label={t("staking.unstaking_lockup_date")}
        value={item.lockupDate || "--"}
      />
      <DetailRow
        label={t("staking.state")}
        value={`${item.state} ${item.stateStr}`}
      />

      {item.state === "proceeding" && (
        <TouchableOpacity
          onPress={() => handleEarlyUnstake(item.id)}
          className="bg-gray-700 rounded-xl py-2 mt-4 items-center"
        >
          <Text className="text-white font-semibold text-base">
            {t("staking.unstake")}
          </Text>
        </TouchableOpacity>
      )}
      <View className="bg-white w-full h-[1px] mt-4"></View>
    </View>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="bg-black-1200 p-4 rounded-2xl flex-row justify-between items-center border-b border-gray-800  mb-1">
    <Text className="text-gray-400 text-base">{label}</Text>
    <Text className="text-white text-base font-medium">{value}</Text>
  </View>
);

export default StakingItem;
