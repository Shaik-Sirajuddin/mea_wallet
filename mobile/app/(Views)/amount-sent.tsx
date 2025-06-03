import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SvgIcon from '../components/SvgIcon';

const AmountSent = () => {
    const navigation = useNavigation();
    const [amount, setAmount] = useState('');
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
    <View className="w-full h-full">
      <View className="items-center relative">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width='22' height='22' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Amount to be sent</Text>
      </View>
      <View className="relative mt-16 h-full pb-20">
      <View className="items-center">
        <View className="flex-row w-full px-20 items-center relative gap-1 justify-center">
          <Text className="text-[52px] font-semibold leading-[68px] text-white">$</Text>
          <TextInput 
            keyboardType="numeric"
            placeholder="0"
            value={amount}
            onChangeText={setAmount}
            className="min-w-[65px] amount-input border-0 bg-transparent text-white placeholder:text-white text-[52px] uppercase font-semibold leading-[68px] text-white"
            selectionColor={'#D107FB'}
          />
          <Pressable className="absolute top-1/2 -translate-y-1/2 right-0">
          <SvgIcon name='swapIcon2' width='32' height='32'/>
          </Pressable>
        </View>
        <Text className="text-[21px] font-semibold leading-[22px] text-gray-1200 mt-1.5">0.00 MEA</Text>
      </View>

      <View className="flex-row items-center justify-center gap-[9px] mb-16 mt-9">
        <Pressable
          onPress={() => setAmount('100')}
        className="text-[17px] font-semibold leading-[22px] text-white px-6 py-3 rounded-[15px] bg-black-1200">
          <Text className="text-white">$100</Text>
        </Pressable>
        <Pressable
         onPress={() => setAmount('500')}
        className="text-[17px] font-semibold leading-[22px] text-white px-6 py-3 rounded-[15px] bg-black-1200">
          <Text className="text-white">$500</Text>
        </Pressable>
        <Pressable
         onPress={() => setAmount('1000')}
         className="text-[17px] font-semibold leading-[22px] text-white px-6 py-3 rounded-[15px] bg-black-1200">
          <Text className="text-white">$1000</Text>
        </Pressable>
      </View>

      <Pressable className="text-[17px] active:bg-gray-1200/20 mb-4 flex-row items-center justify-between font-medium rounded-[15px] py-4 px-[18px] leading-[22px] text-gray-1200">
        <Text className="text-gray-1200">Enter a valid amount for the quotation</Text>
        <SvgIcon name='rightArrow' />
      </Pressable>

      <PrimaryButton text='Send' className="text-base mt-auto font-semibold mb-[9px] w-full text-white leading-[22px] rounded-[15px] flex-row items-center justify-center h-[45px] bg-pink-1100 border border-pink-1100">
      </PrimaryButton>
   
      </View>
    </View>
  </View>
  </View>
  )
}

export default AmountSent
