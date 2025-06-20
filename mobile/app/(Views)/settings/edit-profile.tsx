import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import SvgIcon from '../../components/SvgIcon';

const EditProfile = () => {
    const navigation = useNavigation();

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10">
      <View className="text-center relative">
          
          <View className="items-center">
            <Pressable 
              className="absolute left-0 top-2"
              onPress={() => navigation.goBack()}
            >
              <SvgIcon name="leftArrow" width='21' height='21' />
            </Pressable>
            <Text className="text-lg font-semibold text-white">Edit Profile</Text>
          </View>
          <View className="mt-10">
            <View className="w-[111px] mx-auto relative">
              <View className="bg-pink-1100 mx-auto w-[111px] h-[111px] rounded-full flex items-center justify-center">
                <Text className="text-[45px] font-medium text-white tracking-[-0.36px]">1</Text>
              </View>
              <Pressable className="absolute bottom-1 right-0">
              <SvgIcon name='editIcon' width='29' height='29' />
              </Pressable>
            </View>
      
            <View className="bg-black-1200 flex-row mt-[29px] rounded-[15px] items-center justify-between py-[14px] px-4">
              <Text className="text-[17px] font-semibold text-white leading-5">Account Name</Text>
              <Pressable className="flex flex-row w-fit items-center gap-3">
                <Text className="text-[17px] font-medium text-gray-1000">mecca</Text>
                <SvgIcon name='rightArrow' width='10' height='14' />
              </Pressable>
            </View>
          </View>
        </View> 
    </View>
    </View>
 
  )
}

export default EditProfile
