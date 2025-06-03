import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SvgIcon from '../components/SvgIcon';

const ChartView = () => {

    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10">
     <View className="w-full">
    <ScrollView className='px-4'>
      <View className="relative mt-8">
      <View className="items-center mb-7">
        <Text className="text-[17px] font-semibold text-white">MEA</Text>
        <Text className="text-[53px] font-semibold text-white">$149.69</Text>

        <View className="flex-row items-center justify-center gap-1.5">
          <Text className="text-base font-medium text-pink-1200">+$1.02</Text>
          <Text className="text-lg leading-none font-medium text-pink-1200 bg-pink-1200/15 rounded-[5px] py-[5px] px-1">
            +0.69%
          </Text>
        </View>

        <View className="-mx-4 w-full">
          <Image
            source={require("../../assets/images/grapgh.png")}
            className="w-full h-auto resize-contain"
            alt="Graph"
          />
        </View>

        <View className="flex-row my-7 items-center gap-2 justify-center">
          <TouchableOpacity>
            <Text className="text-[13px] font-medium text-gray-1200 active:bg-black-1300 py-1 px-3 rounded-md active:text-pink-1200">1Hour</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[13px] bg-black-1300 py-1 px-3 font-medium rounded-md text-pink-1200">
              1Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[13px]  py-1 px-3 rounded-md font-medium text-gray-1200 active:bg-black-1300 active:text-pink-1200">1Week</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[13px] py-1 px-3 rounded-md font-medium text-gray-1200 active:bg-black-1300 active:text-pink-1200">1Month</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[13px] py-1 px-3 rounded-md font-medium text-gray-1200 active:bg-black-1300 active:text-pink-1200">YTD</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-[13px] py-1 px-3 rounded-md font-medium text-gray-1200 active:bg-black-1300 active:text-pink-1200">All</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row max-w-[280px] mx-auto gap-[7px]">
            <View className="bg-black-1300 rounded-2xl items-center p-[18px] py-[17px] flex-1">
            <SvgIcon name='receiceIcon' width='24' height='24' />
              <Text className="text-[13px] font-semibold mt-1 text-gray-1000">Receive</Text>
            </View>
            <View className="bg-black-1300 rounded-2xl items-center p-[18px] py-[17px] flex-1">
            <SvgIcon name='sendIcon' width='24' height='24' />
              <Text className="text-[13px] font-semibold mt-1 text-gray-1000">Send</Text>
            </View>
            <View className="bg-black-1300 rounded-2xl items-center p-[18px] py-[17px] flex-1">
            <SvgIcon name='swapIcon' width='24' height='24' />
              <Text className="text-[13px] font-semibold mt-1 text-gray-1000">Swap</Text>
            </View>
          </View>
      </View>

      <Text className="text-base font-medium text-gray-1200 mb-2.5">Information</Text>
      <Text className="text-base font-normal leading-5 text-gray-1200 mb-2.5">
        Solana is a highly functional open source project that banks on blockchain
        technology&apos;s
      </Text>
      <TouchableOpacity>
        <Text className="text-lg font-normal text-pink-1200 mb-9">Read more</Text>
      </TouchableOpacity>

      <View>
        <Text className="text-[19px] font-semibold leading-[22px] text-white mb-3">
          Information
        </Text>

        <View className="mb-[22px]">
          <View className="flex-row justify-between items-center rounded-t-2xl p-[15px] bg-black-1200 mb-[1px]">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Symbol</Text>
            <Text className="text-white flex items-center gap-3">SOL</Text>
          </View>

          <View className="flex-row justify-between items-center p-[15px] bg-black-1200 mb-[1px]">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Network</Text>
            <Text className="text-white flex items-center gap-3">Solana</Text>
          </View>

          <View className="flex-row justify-between items-center p-[15px] bg-black-1200 mb-[1px]">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
              Market capitalization
            </Text>
            <Text className="text-white flex items-center gap-3">$77.84B</Text>
          </View>

          <View className="flex-row justify-between items-center p-[15px] bg-black-1200 mb-[1px]">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Total supply</Text>
            <Text className="text-white flex items-center gap-3">599.17m</Text>
          </View>

          <View className="flex-row justify-between items-center rounded-b-2xl p-[15px] bg-black-1200">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Circulation volume</Text>
            <Text className="text-white flex items-center gap-3">217.31m</Text>
          </View>
        </View>

        <Text className="text-[19px] font-semibold leading-[22px] text-gray-1200 mb-3">24h performance</Text>

        <View className="mb-[22px]">
          <View className="flex-row justify-between items-center rounded-t-2xl p-[15px] bg-black-1200 mb-[1px]">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Volume</Text>
            <View className=" text-white flex flex-row items-center gap-3">
              <Text className='text-white font-medium'> $77.84B</Text>
              <Text className="text-green-1000 font-medium">+7.90%</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center p-[15px] bg-black-1200 mb-[1px]">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Transaction</Text>
            <View className=" text-white flex flex-row items-center gap-3">
              <Text className='text-white font-medium'>  217.31m</Text>
              <Text className="text-green-1000 font-medium">+7.90%</Text>
            </View>
        
          </View>

          <View className="flex-row  justify-between items-center rounded-b-2xl p-[15px] bg-black-1200">
            <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">Trader</Text>
            <View className=" text-white flex flex-row items-center gap-3">
              <Text className='text-white font-medium'>  217.31m</Text>
              <Text className="text-red-1000 font-medium">+7.90%</Text>
            </View>
          
          </View>
        </View>
      </View>
   
      </View>
      </ScrollView>
    </View>
  </View>
  </View>
  )
}

export default ChartView
