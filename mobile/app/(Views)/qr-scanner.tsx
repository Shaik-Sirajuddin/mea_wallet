import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import SvgIcon from '../components/SvgIcon';

const QRScanner = () => {
    const navigation = useNavigation();
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
    <View className="w-full">
      <View className="items-center relative">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width='22' height='22' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">QR Scanner</Text>
      </View>
      <View className="relative mt-10">

      <View className="items-center mt-[148px]">
        <SvgIcon name='qrScannerIcon' width='212' height='210' />
        <Image 
          source={require('../../assets/images/scanner-img.svg')}
          className="mb-12"
          alt="Scanner"
        />
        <Text className="text-[21px] font-semibold text-white mb-2.5">Address QR code</Text>
        <Text className="text-[17px] font-normal leading-5 text-gray-1000">
          Please expose the QR code to the camera.
        </Text>
      </View>
   
      </View>
    </View>
  </View>
  </View>
  )
}

export default QRScanner
