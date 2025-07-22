import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  addresses: string[];
  handleDelete: (index: number) => void;
  handleCopy: (address: string) => void;
}

const ellipsize = (text: string, start = 10, end = 17): string => {
  if (text.length <= start + end) return text;
  return `${text.slice(0, start)}...${text.slice(-end)}`;
};

const DepositAddressList = ({ addresses, handleDelete, handleCopy }: Props) => {
  const { t } = useTranslation();

  return (
    <View className="mt-5 gap-3">
      {addresses.map((addr, i) => (
        <View
          key={addr + i}
          className="bg-black-1200 border border-black-1300 rounded-xl px-4 py-3 flex flex-row items-center justify-between gap-2"
        >
          <Text className="text-white text-base flex-1">
            {i + 1}. {ellipsize(addr, 8, 8)}
          </Text>
          <TouchableOpacity
            className="bg-pink-1100 py-[5px] px-[8px] rounded-2xl"
            onPress={() => handleCopy(addr)}
          >
            <Text className="text-white text-[12px] font-medium leading-[22px]">
              {t("common.copy")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleDelete(i);
            }}
            className="bg-pink-1100 py-[5px] px-[8px] rounded-2xl"
          >
            <Text className="text-white text-[12px] font-medium leading-[22px]">
              {t("common.delete")}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      {addresses.length === 0 && (
        <View>
          <Text className="text-white text-center py-10">
            {t("settings.no_addresses_found")}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DepositAddressList;
