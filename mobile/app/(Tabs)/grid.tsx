import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function GridScreen() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-black-1000 items-center justify-center">
      <Text className="text-white text-xl">{t("grid.title")}</Text>
    </View>
  );
} 