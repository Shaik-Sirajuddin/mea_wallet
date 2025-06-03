import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import SvgIcon from '../../components/SvgIcon';

const SelectAvatar = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black-1000">
      <View className="flex-1 px-4 py-8">
        <View className="w-full">
          <View className="items-center">
            <Pressable 
              className="absolute left-0 top-2"
              onPress={() => navigation.goBack()}
            >
              <SvgIcon name="leftArrow" width='21' height='21' />
            </Pressable>
            <Text className="text-lg font-semibold text-white">Select Avatar</Text>
          </View>

          <View className="mt-10">
            <View className="w-[111px] mx-auto">
              <View className="bg-pink-1100 w-[111px] h-[111px] rounded-full items-center justify-center">
                <Text className="text-[45px] font-medium text-white tracking-[-0.36px]">1</Text>
              </View>
            </View>

            <View className="border-b mt-[38px] border-gray-1000 mb-[1px] px-4">
              <Text className="text-xl font-semibold text-white pb-4">Emojis</Text>
              <View className='border-b-2 border-pink-1100 w-16'/>
            </View>

            <ScrollView className="mt-5">
              <View className="flex-row flex-wrap gap-5">
                <Pressable
                  onPress={() => {}}
                  className="w-9 h-9 active:opacity-50">
                  <SvgIcon name='emojiIcon1' width='33' height='33' />
                </Pressable>
                <Pressable className="w-9 h-9 active:opacity-50">
                  <SvgIcon name='emojiIcon2' width='33' height='33' />
                </Pressable>
                {[...Array(20)].map((_, index) => (
                  <Pressable key={index} className="w-9 h-9 active:opacity-50 bg-black-1400" ></Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <Pressable 
          className="mt-auto mb-[9px] w-full group active:text-pink-1100 h-[45px] bg-pink-1100 border active:bg-transparent border-pink-1100 rounded-[15px] items-center justify-center"
          onPress={() => {/* Handle save */}}
        >
          <Text className="text-base text-white group-active:text-pink-1100 font-semibold ">Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SelectAvatar;
