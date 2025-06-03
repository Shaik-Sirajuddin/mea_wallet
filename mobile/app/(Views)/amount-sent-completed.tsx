import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const AmountSendCompleted = () => {
    const navigation = useNavigation();
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl pt-8 items-center justify-center mx-auto px-4 pb-14">
        <Text className='text-[21px] !my-auto text-center font-semibold leading-[22px] text-white mt-1.5 flex items-center justify-center'>
        Send completed.
        </Text>
      <PrimaryButton text='Ok'></PrimaryButton>
  </View>
  </View>
  )
}

export default AmountSendCompleted
