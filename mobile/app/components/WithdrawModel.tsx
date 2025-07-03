// components/WithdrawalModal.tsx

import React, { useMemo } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Decimal from "decimal.js";
import { UserStaking, StakingState } from "@/src/api/types/staking";
import dayjs from "dayjs";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: UserStaking | null;
};

const WithdrawalModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  item,
}) => {
  const isEarlyWithdrawal = item?.state === StakingState.IN_PROGRESS;

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

  const interestCredited = isEarlyWithdrawal ? "0.00" : new Decimal(item?.expectedFinalAmount || 0).sub(item?.depositAmount || 0).toFixed(2);

  if (!item) return null;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black bg-opacity-80 justify-center items-center px-6">
        <View className="bg-black-1200 rounded-2xl p-5 w-full">
          <Text className="text-white text-lg font-semibold mb-4">
            {isEarlyWithdrawal ? "Early Withdrawal Confirmation" : "Claim Confirmation"}
          </Text>

          {isEarlyWithdrawal && (
            <Text className="text-red-500 mb-3">
              Note: An early withdrawal fee of {item.unstakingFee}% on your deposit amount will be charged. No interest will be credited.
            </Text>
          )}

          <Row label="Plan" value={item.planName} />
          <Row label="Registered Date" value={dayjs(item.registeredAt).format("YYYY-MM-DD")} />
          <Row label="Deposit Amount" value={item.depositAmount} />
          <Row label="Interest Credited" value={interestCredited} valueClass={!isEarlyWithdrawal ? "text-green-500" : ""} />
          {isEarlyWithdrawal && <Row label="Fee Deducted" value={`${fee}`} />}
          <Row label="Final Receivable" value={`${finalReceivable}`} valueClass="text-green-500" />

          <View className="flex-row justify-end mt-5">
            <TouchableOpacity onPress={onClose} className="mr-4">
              <Text className="text-gray-400 text-base">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="bg-pink-1100 rounded-xl px-4 py-2"
            >
              <Text className="text-white font-semibold text-base">
                {isEarlyWithdrawal ? "Withdraw" : "Claim"}
              </Text>
            </TouchableOpacity>
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
