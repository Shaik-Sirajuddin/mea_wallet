import { Picker } from '@react-native-picker/picker';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PrimaryLink from '../components/PrimaryLink';
import SvgIcon from '../components/SvgIcon';

const Deposit2 = () => {
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
        
     <ScrollView className="">
      <View className="mt-2.5 mb-2">
        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
          <Text className="text-base font-medium leading-[22px] text-white">Quantity held</Text>
        </View>
        <View className="relative">
          <TextInput
            placeholder="Address (4oAPmx3...QY1H)"
            placeholderTextColor="#ffffff"
            className="text-[15px] text-white font-medium px-8 border-2 border-gray-1200 w-full h-[71px] rounded-[15px]"
          />
          <TouchableOpacity className="absolute top-1/2 -translate-y-1/2 right-5 bg-pink-1100 px-[13px] py-[5px] rounded-2xl">
            <Text className="text-white text-[17px] font-medium leading-[22px]">Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-2">
        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
          <Text className="text-base font-medium leading-[22px] text-white">Txid Address</Text>
        </View>
        <View className="relative mb-2">
          <TextInput
            placeholder="Txid Address"
            placeholderTextColor="#ffffff"
            className="text-[17px] text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]"
          />
        </View>
      </View>

      <View className="mb-2">
        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
          <Text className="text-base font-medium leading-[22px] text-white">Sender Wallet Address</Text>
        </View>
        <View className="relative mb-2">
          <Picker
            style={{
              height: 71,
              paddingHorizontal: 32,
              backgroundColor: '#2B2B2B',
              borderRadius: 15,
              color: '#fff',
              fontSize: 17,
              fontWeight: '500',
            }}
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Select Wallet Address" value="Select Wallet Address" />
          </Picker>
        </View>
      </View>

      <View className="flex-row mt-9 items-center gap-2 mb-3">
        <SvgIcon name='infoIcon' />
        <Text className="text-base font-medium leading-[22px] text-white">
          Notice: before making a deposit
        </Text>
      </View>

      <View className="text-[17px] text-white py-10 font-medium px-6 bg-black-1200 w-full rounded-[15px]">
        <View className="ml-5 space-y-4">
          <View className="flex-row">
            <Text className="text-[15px] font-medium leading-5 text-gray-1200">
              • Due to the nature of digital assets, once the deposit application is completed, it cannot be cancelled.
            </Text>
          </View>
          <View className="flex-row">
            <Text className="text-[15px] font-medium leading-5 text-gray-1200">
              • No refunds if transfer is made by mistake to another digital asset wallet.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
      </View>

      <PrimaryLink text='Deposit Application' href='/' className='mt-auto'>

      </PrimaryLink>
    </View>
  </View>
  </View>
  )
}

export default Deposit2
