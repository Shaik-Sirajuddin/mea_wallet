import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, Text, View } from 'react-native';
import SvgIcon from '../../components/SvgIcon';

const Language = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = React.useState('korean');

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto  pt-8 pb-10">
        <View className="w-full">
          <View className="items-center relative">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute -left-2 top-0 z-10 p-2"
            >
              <SvgIcon name="leftArrow" width="21" height="21" />
            </Pressable>
            <Text className="text-lg font-semibold text-white">{t("settings.language")}</Text>
          </View>

          <View className="relative mt-10">
         

            {/* Korean Option */}
            <Pressable
              onPress={() => setSelectedLanguage('korean')}
              className="bg-black-1200 mb-[1px] rounded-t-2xl p-4 gap-3 flex-row items-center"
            >
              <Image source={require("@/assets/images/flag-1.png")} />
              <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
                한국어
              </Text>
              <View className='ml-auto mr-1'>
                {selectedLanguage === 'korean' ? (
                  <SvgIcon name="radioIcon" />
                ) : (
                  <View className="w-6 h-6 rounded-full border border-gray-800" />
                )}
              </View>
            </Pressable>

            {/* English Option */}
            <Pressable
              onPress={() => setSelectedLanguage('english')}
              className="bg-black-1200 mb-[1px] rounded-b-2xl p-4 flex-row gap-3 items-center"
            >
               <Image source={require("@/assets/images/flag-2.png")} />
              <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
                English
              </Text>
              <View className='ml-auto mr-1'>
                {selectedLanguage === 'english' ? (
                  <SvgIcon name="radioIcon" />
                ) : (
                  <View className="w-6 h-6 rounded-full border border-gray-800" />
                )}
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Language;
