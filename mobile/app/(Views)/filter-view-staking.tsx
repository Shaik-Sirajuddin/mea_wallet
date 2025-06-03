import { CheckBox } from '@rneui/themed';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import SvgIcon from '../components/SvgIcon';

const FilterStakingView = () => {
    const navigation = useNavigation();
    const [checkedProgress, setCheckedProgress] = React.useState(true);
    const [checkedWaiting, setCheckedWaiting] = React.useState(false);
     const toggleCheckboxPrgress = () => setCheckedProgress(!checkedProgress);
     const toggleCheckboxWaiting = () => setCheckedWaiting(!checkedWaiting);
    
  return (
    <View className="bg-black-1000">
    <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10">
     <View className="w-full">
      <View className="items-center relative">
        <Pressable 
          onPress={() => navigation.goBack()} 
          className="absolute left-0 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width='21' height='21' />
        </Pressable>
        <Text className="text-lg font-semibold text-white">Filter</Text>
        <TouchableOpacity 
          className="absolute right-0 items-end justify-end z-10 p-2"
        >
          <Text className='text-pink-1200 text-[17px]'>Apply</Text>
        </TouchableOpacity>
      </View>
   
      <View className="relative mt-10">
      <View>
      <Text className="text-[19px] font-semibold leading-[22px] mb-3 text-white">
        Sort By
      </Text>

      <View className="bg-black-1200 mb-[1px] rounded-t-2xl p-4 flex-row items-center justify-between">
        <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
        Currunt Status
        </Text>
        <CheckBox
           checked={checkedProgress}
           onPress={toggleCheckboxPrgress}
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank"
           checkedColor="#ED93FF"
           uncheckedColor="#1F1F1F"
           className='!bg-transparent !rounded-md !p-0 !m-0 !-mr-0'
         />
      </View>

      <View className="bg-black-1200 mb-[1px] rounded-b-2xl p-4 flex-row items-center justify-between">
        <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
        Sort order
        </Text>
        <CheckBox
           checked={checkedWaiting}
           onPress={toggleCheckboxWaiting}
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank"
           checkedColor="#ED93FF"
           uncheckedColor="#1F1F1F"
           className='!bg-transparent !rounded-md !p-0 !m-0 !-mr-0'
         />
      </View>

    </View>
   
   
      </View>
    </View>
  </View>
  </View>
  )
}

export default FilterStakingView
