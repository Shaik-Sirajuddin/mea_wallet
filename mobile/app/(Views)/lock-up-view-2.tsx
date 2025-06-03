import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SvgIcon from '../components/SvgIcon';

const LockUpView2 = () => {
    const navigation = useNavigation();
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto">
    <ScrollView className='px-4 pt-8'>
     <View className="w-full pb-20">
      <View className="items-center relative px-4">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width='21' height='21' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Lock up</Text>
  
      </View>
   
      <View className="relative mt-8">
   
      <View className="mb-0">
        <View className="flex flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
          <Text className="text-base font-medium leading-[22px] text-white">Quantity held</Text>
        </View>
        <View className="flex items-center justify-center text-center px-8 bg-black-1200 w-full h-[71px] rounded-[15px]">
          <Text className="text-white font-medium text-[15px]">
            1000,212 <Text className="text-gray-1200">MEA</Text>
          </Text>
        </View>
      </View>

      <View className="text-center my-10 px-10">
        <Text className="text-[15px] text-center font-semibold leading-5 text-gray-1200">
        If the list is not visible, you can swipe sideways using gestures to navigate.
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Total Date
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
          2025-04-24
          <Text className="text-gray-1200 text-[15px]"> | 15:27:59</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Division
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Deposit {'->'}
        <Text className="text-white text-[15px]"> Lockup</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Amount
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
        100,000.0000 <Text className="text-gray-1200 text-[15px]">MEA</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Previous Amount
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
        100.0000<Text className="text-gray-1200 text-[15px]">MEA</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Amount After
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
        100.0000<Text className="text-gray-1200 text-[15px]">MEA</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        State
        </Text>
        <Text className="text-white" />
      </View>
      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        Deposit address
        </Text>
        <Text className="text-white" />
      </View>

      <View className="flex flex-row items-center justify-center gap-4 mt-6">
        <TouchableOpacity>
          <SvgIcon name='leftArrow2' width='12' height='18' />
        </TouchableOpacity>
        <TouchableOpacity className="w-7 h-7 p-0.5 rounded-full bg-black-1200 flex items-center justify-center">
          <Text className="text-[17px] font-medium leading-[22px] text-gray-1200/70 text-center">1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <SvgIcon name='rightArrow' width='12' height='18'/>
        </TouchableOpacity>
      </View>
   
      </View>

      <View>
      <View className="flex-row mt-9 items-center gap-2 mb-3">
        <SvgIcon name='infoIcon'/>
        <Text className="text-base font-medium leading-[22px] text-white">
          Notice
        </Text>
      </View>

      <View className="text-[17px] text-white py-10 font-medium px-6 bg-black-1200 w-full rounded-[15px]">
        <View className="ml-5 space-y-4">
          <View className="flex-row">
            <Text className="text-white mr-2">•</Text>
            <Text className="text-[15px] font-medium leading-5 text-gray-1200 flex-1">
              After the end date, the coins become available for deposit or withdrawal.
            </Text>
          </View>

          <View className="flex-row">
            <Text className="text-white mr-2">•</Text>
            <Text className="text-[15px] font-medium leading-5 text-gray-1200 flex-1">
              The coins you received can be withdrawn normally through "Withdrawal".
            </Text>
          </View>
        </View>
      </View>
    </View>
    </View>
      </ScrollView>
  </View>
  </View>
  )
}

export default LockUpView2
