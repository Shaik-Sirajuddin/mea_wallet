import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrimaryLink from '../components/PrimaryLink';
import SvgIcon from '../components/SvgIcon';

const WithDrawal2 = () => {
    const navigation = useNavigation();
      const [otp, setOtp] = useState('');
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
    <View className="w-full h-full">
      <View className="items-center relative">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width='20' height='20' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Withdrawal</Text>
      </View>
      <View className="relative mt-10">
      <View className="mb-4">
        <View className="flex flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
          <Text className="text-base font-medium leading-[22px] text-white">
            Google OTP Code
          </Text>
        </View>
        <View className="relative mb-2">
          <TextInput
            placeholder="Google OTP Code"
            placeholderTextColor="#ffffff"
            value={otp}
            onChangeText={setOtp}
            className="text-[17px] text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-400">
          Total withdrawal
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
          0 <Text className="text-[15px] text-gray-400">MEA</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-400">
          Withdrawal Fee
        </Text>
        <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
          0 <Text className="text-[15px] text-gray-400">MEA</Text>
        </Text>
      </View>

      <View className="flex flex-row items-center gap-2 mt-9 mb-3">
        <SvgIcon name='infoIcon'/>
        <Text className="text-base font-medium leading-[22px] text-white">
          Notice: Precautions for cryptocurrency withdrawal
        </Text>
      </View>

      <View className="bg-black-1200 rounded-[15px] px-6 py-10">
        <View className="ml-2">
          <View className="flex-row mb-4">
            <Text className="text-[15px] text-gray-400 leading-5">• </Text>
            <Text className="text-[15px] text-gray-400 leading-5 flex-1">
              Due to the nature of digital assets, withdrawal request cannot be canceled once completed.
            </Text>
          </View>
          <View className="flex-row">
            <Text className="text-[15px] text-gray-400 leading-5">• </Text>
            <Text className="text-[15px] text-gray-400 leading-5 flex-1">
              No refunds if money is sent incorrectly to another digital asset wallet.
            </Text>
          </View>
        </View>
      </View>
      </View>

      <View className="flex flex-row gap-2 justify-center mt-auto">
      <PrimaryLink href='/' text='Withdraw' className="w-1/2 h-[45px] bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center">
      </PrimaryLink>

      <TouchableOpacity className="w-1/2 h-[45px] bg-black-1100 rounded-[15px] flex items-center justify-center">
        <Text className="text-base font-semibold text-white leading-[22px]">
          QR Recognition
        </Text>
      </TouchableOpacity>
    </View>

    </View>
  </View>
  </View>
  )
}

export default WithDrawal2
