import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import SvgIcon from '../components/SvgIcon';

const TransactionHistory = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto">
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } 
      className='px-4 pt-8'>
     <View className="w-full pb-20">
      <View className="items-center relative">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width='21' height='21' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Transaction History</Text>
         
      </View>
      <View className='items-end justify-end mt-8'>
          <Pressable 
          onPress={() => Alert.alert('Search..')} 
          className=" w-8 items-end justify-end z-10 p-2"
        >
          <SvgIcon name="swapIcon3" width='20' height='20' />
        </Pressable>
        </View>
      <View className="relative mt-5">
      <Pressable className="border-2 flex-row justify-between mb-2 border-pink-1200 active:border-pink-1200 hover:border-pink-1200 bg-black-1200 rounded-2xl py-[13px] px-3">
        <View className="flex flex-row items-center gap-[11px]">
          <Image 
            source={require('../../assets/images/coin-img.png')}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View>
            <Text className="text-[17px] mb-1 font-medium leading-5 text-white">MEA</Text>
            <Text className="text-[15px] font-normal leading-5 text-gray-1200">0 MEA</Text>
          </View>
        </View>
        <View className='flex-row items-start gap-4'>
         
          <View className='text-end items-end'>
            <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">$0.00</Text>
            <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">$0.00</Text>
          </View>
        </View>
      </Pressable>

        <Pressable className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3">
        <View className="flex flex-row items-center gap-[11px]">
          <Image 
            source={require('../../assets/images/coin-img.png')}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View>
            <Text className="text-[17px] mb-1 font-medium leading-5 text-white">SOL</Text>
            <Text className="text-[15px] font-normal leading-5 text-gray-1200">0 SOL</Text>
          </View>
        </View>
        <View className='flex-row items-start gap-4'>
       
          <View className='text-end items-end'>
            <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">$0.00</Text>
            <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">$0.00</Text>
          </View>
        </View>
      </Pressable>

        <Pressable className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3">
        <View className="flex flex-row items-center gap-[11px]">
          <Image 
            source={require('../../assets/images/coin-img.png')}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View>
            <Text className="text-[17px] mb-1 font-medium leading-5 text-white">RECON</Text>
            <Text className="text-[15px] font-normal leading-5 text-gray-1200">0 RECON</Text>
          </View>
        </View>
        <View className='flex-row items-start gap-4'>
          <View className='text-end items-end'>
            <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">$0.00</Text>
            <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">$0.00</Text>
          </View>
        </View>
      </Pressable>
   
      </View>
    </View>
      </ScrollView>
  </View>
  </View>
  )
}

export default TransactionHistory
