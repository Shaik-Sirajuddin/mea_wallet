import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";

interface Props {
  addresses: string[];
}

const ellipsize = (text: string, start = 10, end = 17): string => {
  if (text.length <= start + end) return text;
  return `${text.slice(0, start)}...${text.slice(-end)}`;
};

const DepositAddressList = ({ addresses }: Props) => {
  const { t } = useTranslation();
  const handleCopy = async (address: string) => {
    await Clipboard.setStringAsync(address);
    Alert.alert(t('components.copied_to_clipboard'), address);
  };

  return (
    <View className="mt-5 gap-3">
      {addresses.map((addr, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleCopy(addr)}
          className="bg-black-1200 border border-black-1300 rounded-xl px-4 py-3"
        >
          <Text className="text-white text-base">
            {i + 1}. {ellipsize(addr)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DepositAddressList;
