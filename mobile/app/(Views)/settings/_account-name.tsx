import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import SvgIcon from "../../components/SvgIcon";
import { BackButton } from "@/app/components/BackButton";

const AccountName = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [name, setName] = useState("mecca");

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10">
        <View className="w-full">
          <View className="items-center relative">
            <BackButton />
            <Text className="text-lg font-semibold text-white">
              {t("settings.account_name")}
            </Text>
          </View>
          <View className="relative mt-10">
            <TextInput
              className="text-base font-semibold text-white px-4 bg-black-1200 h-14 rounded-[15px] w-full"
              placeholderTextColor="white"
              value={name}
              onChangeText={setName}
            />
            <Pressable
              onPress={() => setName("")}
              className="absolute top-1/2 -translate-y-1/2 right-3"
            >
              <SvgIcon name="crossIcon2" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccountName;
