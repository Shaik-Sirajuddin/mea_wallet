import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrimaryLink from '../components/PrimaryLink';
import SvgIcon from '../components/SvgIcon';

const Deposit = () => {
    const navigation = useNavigation();
    
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
        <Text className="text-lg font-semibold text-white">Deposit</Text>
      </View>
      <View className="relative mt-10">
      <View className="mt-2.5 mb-2">
      <View className="flex flex-row items-center gap-2 mb-3">
        <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
        <Text className="text-base font-medium leading-[22px] text-white">Quantity held</Text>
      </View>

      <View className="relative">
        <View className="text-[15px] flex flex-row items-center justify-center text-center text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]">
          <Text className="text-white">1000,212</Text>
          <Text className="text-gray-1200 ml-1">MEA</Text>
        </View>
      </View>

      <View className="mt-5 mb-4">
        <View className="flex flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
          <Text className="text-base font-medium leading-[22px] text-white">Deposit Quantity</Text>
        </View>

        <View className="relative items-center justify-center mb-2">
          <TextInput
            placeholder="Enter Amount (Minimum 10MEA)"
            placeholderTextColor="#fff"
            className="text-[17px] text-white font-medium pl-8 pr-14 border border-gray-1200 w-full h-[71px] rounded-[15px]"
            keyboardType="numeric"
          />
          <TouchableOpacity className="absolute right-6">
          <SvgIcon name='smallSwapIcon' /> 
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-row items-center justify-center gap-2.5">
        {['10%', '50%', 'Max'].map((label, index) => (
          <TouchableOpacity
            key={index}
            className={`text-base mb-2 font-semibold text-white text-center py-3 rounded-[15px] w-[91px] ${
              label === '10%' ? 'bg-pink-1100' : 'bg-black-1200'
            }`}
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-semibold text-center">{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
      </View>

      <PrimaryLink text='Next' href='/' className='mt-auto'>

      </PrimaryLink>
    </View>
  </View>
  </View>
  )
}

export default Deposit
