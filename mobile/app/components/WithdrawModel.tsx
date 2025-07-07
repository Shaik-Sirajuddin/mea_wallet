// components/WithdrawalModal.tsx
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Decimal from "decimal.js";
import { UserStaking, StakingState } from "@/src/api/types/staking";
import dayjs from "dayjs";
import PrimaryButton from "./PrimaryButton";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (isEarlyUnstake: boolean) => void;
  item: UserStaking;
};

const WithdrawalModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  item,
}) => {
  const { t } = useTranslation();
  
  const isEarlyWithdrawal = useMemo(() => {
    const maturityDate = new Date(item.expectedWithdrawalDate);
    const registeredAt = item.registeredAt;
    // Set time of secondDateOnly to time of firstDate
    maturityDate.setUTCHours(
      registeredAt.getUTCHours(),
      registeredAt.getUTCMinutes(),
      registeredAt.getUTCSeconds(),
      registeredAt.getUTCMilliseconds()
    );

    return maturityDate.getTime() > Date.now();
  }, []);

  const fee = useMemo(() => {
    if (!item || !isEarlyWithdrawal) return "0.00";
    return new Decimal(item.depositAmount)
      .mul(new Decimal(item.unstakingFee).div(100))
      .toFixed(2);
  }, [item, isEarlyWithdrawal]);

  const finalReceivable = useMemo(() => {
    if (!item) return "0.00";
    if (isEarlyWithdrawal) {
      return new Decimal(item.depositAmount).sub(fee).toFixed(2);
    }
    return item.expectedFinalAmount;
  }, [item, isEarlyWithdrawal, fee]);

  const interestCredited = isEarlyWithdrawal
    ? "0.00"
    : new Decimal(item?.expectedFinalAmount || 0)
        .sub(item?.depositAmount || 0)
        .toFixed(2);

  if (!item) return null;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black-1000 bg-opacity-80 justify-center items-center px-6">
        <View className="bg-black-1200 rounded-2xl p-5 w-full">
          <Text className="text-white text-lg font-semibold mb-4">
            {isEarlyWithdrawal
              ? t("components.early_withdrawal_confirmation")
              : t("components.claim_confirmation")}
          </Text>

          {isEarlyWithdrawal && (
            <Text className="text-red-500 mb-3">
              {t("components.early_withdrawal_note", { fee: item.unstakingFee })}
            </Text>
          )}

          <Row label={t("components.plan")} value={item.planName} />
          <Row
            label={t("components.registered_date")}
            value={dayjs(item.registeredAt).format("YYYY-MM-DD")}
          />
          <Row label={t("components.deposit_amount")} value={item.depositAmount} />
          <Row
            label={t("components.interest_credited")}
            value={interestCredited}
            valueClass={!isEarlyWithdrawal ? "text-green-500" : "text-white"}
          />
          {isEarlyWithdrawal && <Row label={t("components.fee_deducted")} value={`${fee}`} />}
          <Row
            label={t("components.final_receivable")}
            value={`${finalReceivable}`}
            valueClass={
              new Decimal(finalReceivable).lt(item.depositAmount)
                ? "text-red-500"
                : "text-green-500"
            }
          />

          <View className="flex gap-2 mt-4">
            <PrimaryButton
              onPress={onClose}
              text={t("common.cancel")}
              className={!isEarlyWithdrawal ? "bg-gray-500" : ""}
            />
            <PrimaryButton
              onPress={() => {
                onConfirm(isEarlyWithdrawal);
              }}
              text={isEarlyWithdrawal ? t("components.withdraw") : t("components.claim")}
              className={isEarlyWithdrawal ? "bg-gray-500" : ""}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Row = ({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) => (
  <View className="flex-row justify-between mb-2">
    <Text className="text-gray-400 text-base">{label}</Text>
    <Text className={`text-lg font-medium ${valueClass}`}>{value}</Text>
  </View>
);

export default WithdrawalModal;
