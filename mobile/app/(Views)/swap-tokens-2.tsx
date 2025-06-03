import { ChevronDownIcon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectPortal, SelectTrigger } from '@gluestack-ui/themed';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SvgIcon from '../components/SvgIcon';

const SwapTokens2 = () => {
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
          <SvgIcon name="crossIcon" width='14' height='14' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Swap Tokens</Text>
      </View>
      <View className="relative mt-10 h-full pb-14">
      <View className="bg-black-1200 p-[18px] rounded-[15px] flex-row items-end justify-between">
        <View className="w-1/2">
          <View>
            <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">You Pay</Text>
            <TextInput 
              keyboardType="numeric"
              placeholder="0"
              className="text-[32px] w-full font-medium leading-12 text-pink-1200 placeholder:text-gray-1200 bg-transparent border-0"
            />
            <Pressable>
              <SvgIcon name='smallSwapIcon' />
            </Pressable>
          </View>
        </View>
        <View className="w-1/2">
          <View className="items-end">
            <View className='bg-gray-1300 rounded-[18px] h-10 mb-2 pr-2 justify-center relative'>
              <View className='w-7 h-7 !rounded-full absolute left-1 bg-black'></View>
            <Select className='!border-transparent py-0 text-xs -mt-0.5 !gap-0 !text-gray-1200 pl-4'>
            <SelectTrigger className='!border-transparent min-w-24 text-end !gap-0 w-fit leading-none !p-0'>
              <SelectInput className='!min-w-fit ml-2 !text-base leading-none text-end !font-medium !p-0 placeholder:!text-gray-1200 !text-gray-1200' placeholder="SOL" />
              <SelectIcon className="mr-0" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <Select.Item label="SOL" value="sol" />
                <Select.Item label="MEA" value="mea" />
              </SelectContent>
            </SelectPortal>
            </Select>
           </View>
            <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">0 SOL</Text>
          </View>
        </View>
      </View>

      <Pressable 
        className="bg-pink-1100 w-8 h-8 mx-auto z-50 active:opacity-50 -my-2.5 relative rounded-full items-center justify-center"
      >
        <SvgIcon name='qlementineIcon' width='20' height='20' />
      </Pressable>

      <View className="bg-black-1200 p-[18px] rounded-[15px] flex-row items-end justify-between">
        <View className="w-1/2">
          <View>
            <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">You Receive</Text>
            <TextInput 
              keyboardType="numeric"
              placeholder="0"
              className="text-[32px] w-full font-medium leading-12 text-pink-1200 placeholder:text-gray-1200 bg-transparent border-0"
            />
            <Pressable>
            <SvgIcon name='smallSwapIcon' />
            </Pressable>
          </View>
        </View>
        <View className="w-1/2">
          <View className="items-end">
          <View className='bg-gray-1300 rounded-[18px] h-10 mb-2 pr-2 justify-center relative'>
              <View className='w-7 h-7 !rounded-full absolute left-1 bg-black'></View>
            <Select className='!border-transparent py-0 text-xs -mt-0.5 !gap-0 !text-gray-1200 pl-4'>
            <SelectTrigger className='!border-transparent min-w-24 text-end !gap-0 w-fit leading-none !p-0'>
              <SelectInput className='!min-w-fit ml-2 !text-base leading-none text-end !font-medium !p-0 placeholder:!text-gray-1200 !text-gray-1200' placeholder="MEA" />
              <SelectIcon className="mr-0" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <Select.Item label="SOL" value="sol" />
                <Select.Item label="MEA" value="mea" />
              </SelectContent>
            </SelectPortal>
            </Select>
           </View>
            <Text className="text-[15px] font-medium leading-[22px] text-gray-1200">0 SOL</Text>
          </View>
        </View>
      </View>


      <View className='w-full'>
      <View className="mt-6">
        <Pressable 
          className="flex flex-row mb-[1px] items-center justify-between rounded-t-2xl p-[15px] text-[17px] font-medium leading-[22px] text-white bg-black-1200"
        >
          <Text className='text-white text-[17px] font-medium'>Pricing</Text>
          <View className="flex flex-row items-center gap-3">
            <Text className='text-gray-1200 font-medium'>0 SOL</Text>
            <SvgIcon name="rightArrow" width='6'/>
          </View>
        </Pressable>

        <Pressable 
          className="flex flex-row items-center justify-between mb-[1px] p-[15px] text-[17px] font-medium leading-[22px] text-white bg-black-1200"
        >
            <Text className='text-white text-[17px] font-medium'>Slippage</Text>
          <View className="flex flex-row items-center gap-3 text-gray-1200">
            <Text className='text-gray-1200 font-medium'>Auto 0.06%</Text>
            <SvgIcon name="rightArrow" width='6'/>
          </View>
        </Pressable>

        <Pressable 
          className="flex flex-row items-center justify-between mb-[1px] p-[15px] text-[17px] font-medium leading-[22px] text-white bg-black-1200"
        >
            <Text className='text-white text-[17px] font-medium'>Price Impact</Text>
          <View className="flex flex-row items-center gap-3 text-gray-1200">
          <Text className='text-gray-1200 font-medium'>0.08%</Text>
          </View>
        </Pressable>

        <Pressable 
          className="flex flex-row items-center justify-between mb-[1px] p-[15px] text-[17px] font-medium rounded-b-2xl leading-[22px] text-white bg-black-1200"
        >
           <Text className='text-white text-[17px] font-medium'>Fees</Text>
          <View className="flex flex-row items-center gap-3 text-gray-1200">
          <Text className='text-gray-1200 font-medium'>$0.03</Text>
          </View>
        </Pressable>
      </View>

      <Text className="text-sm leading-[22px] font-normal mt-3 text-gray-1200">
        Quote includes a 0.85% Mecca fee
      </Text>

      </View>

      <PrimaryButton text='Insufficient Funds'
        className="text-base mt-auto font-semibold  mb-[9px] w-full text-white leading-[22px] rounded-[15px] items-center justify-center h-[45px] bg-pink-1100 border border-pink-1100"
      >
      </PrimaryButton>
      </View>
    </View>
    </View>
    </View>
  )
}

export default SwapTokens2
