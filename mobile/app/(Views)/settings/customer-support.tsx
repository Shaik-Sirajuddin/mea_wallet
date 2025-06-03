import { router, useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import SvgIcon from '../../components/SvgIcon';

const CustomerSupport = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
        <View className="w-full">
          <View className="items-center relative">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute -left-2 top-0 z-10 p-2"
            >
              <SvgIcon name="leftArrow" width="21" height="21" />
            </Pressable>
            <Text className="text-lg font-semibold text-white">Customer Support</Text>
          </View>

          <View className="relative mt-10">
          <Pressable
           onPress={() => router.push('/(Views)/settings/contact-form')}
            className="bg-black-1200 mb-4 rounded-2xl flex-row items-center justify-between pt-3 pb-4 px-3"
          >
            <Text className="text-base font-semibold leading-5 text-white">Contact</Text>
            <SvgIcon name='rightArrow' width='8'/>
          </Pressable>

          <Pressable
           onPress={() => router.push('/(Views)/settings/faq-view')}
            className="bg-black-1200 mb-4 rounded-2xl flex-row items-center justify-between pt-3 pb-4 px-3"
          >
            <Text className="text-base font-semibold leading-5 text-white">FAQ</Text>
            <SvgIcon name='rightArrow' width='8'/>
          </Pressable>

          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomerSupport;
