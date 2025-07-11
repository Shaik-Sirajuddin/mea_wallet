import { useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const WithdrawalCompleted = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
        <Text className="text-[21px] !my-auto text-center font-semibold leading-[22px] text-white mt-1.5 flex items-center justify-center">
          {t("withdrawal.withdrawal_completed")}
        </Text>
        <PrimaryButton text={t("common.done")}></PrimaryButton>
      </View>
    </View>
  );
};

export default WithdrawalCompleted;
