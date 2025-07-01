import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import SvgIcon from '../components/SvgIcon';

const NativeView = () => {
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
    <View className="w-full h-full max-w-5xl mx-auto ">
      <ScrollView className="pt-8"
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
     <View className="w-full pb-20">
      <View className="items-center relative">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="crossIcon" width='14' height='14' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Native</Text>
          <Pressable 
          onPress={() => Alert.alert('Search..')} 
          className="absolute right-0 top-0 z-10 p-2"
        >
          <SvgIcon name="searchIcon" width='20' height='20' />
        </Pressable>
      </View>
      <View className="relative mt-8">
   
      <Pressable className="border-2 flex-row justify-between mb-2 bg-pink-1100 active:bg-pink-1100 hover:bg-pink-1100 border-black-1200 rounded-2xl py-[13px] px-3">
        <View className="flex flex-row items-center gap-[11px]">
          <Image 
            source={require('../../assets/images/coin-img.png')}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View>
            <Text className="text-[17px] mb-1 font-medium leading-5 text-white">MEA</Text>
            <Text className="text-[15px] font-normal leading-5 text-white">0 MEA</Text>
          </View>
        </View>
        <View>
          <View className='text-end items-end'>
            <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">$0.00</Text>
            <Text className="text-[15px] text-end font-normal leading-5 text-white">$0.00</Text>
          </View>
        </View>
      </Pressable>

        <Pressable className="border-2 flex-row justify-between mb-2 active:bg-pink-1100 hover:bg-pink-1100 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3">
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
        <View>
          <View className='text-end items-end'>
            <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">$0.00</Text>
            <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">$0.00</Text>
          </View>
        </View>
      </Pressable>

        <Pressable className="border-2 flex-row justify-between mb-2 active:bg-pink-1100 hover:bg-pink-1100 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3">
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
        <View>
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

export default NativeView
