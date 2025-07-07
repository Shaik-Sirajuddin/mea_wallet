import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import SvgIcon from '../../components/SvgIcon';

const RecentActivityEmpty = () => {
    const { t } = useTranslation();
    const navigation = useNavigation();

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto  pt-8 pb-10">
      <View className="w-full">
        <View className="items-center relative">
          <Pressable 
            onPress={() => navigation.goBack()} 
            className="absolute left-0 top-2"
          >
            <SvgIcon name="leftArrow" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">{t("settings.recent_activity")}</Text>
        </View>
        <View className="relative items-center justify-center h-full">
            <Text className='text-[21px] font-semibold leading-[22px] text-gray-1200'>{t("settings.no_activity")}</Text>
        </View>
      </View>
    </View>
    </View>
 
  )
}

export default RecentActivityEmpty
