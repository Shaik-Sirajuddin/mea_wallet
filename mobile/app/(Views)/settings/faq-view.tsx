import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import SvgIcon from "../../components/SvgIcon";
import FAQList from "../faq/faqs-list";

const FaqView = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10">
        <View className="w-full">
          <View className="items-center relative">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute -left-2 top-0 z-10 p-2"
            >
              <SvgIcon name="leftArrow" width="21" height="21" />
            </Pressable>
            <Text className="text-lg font-semibold text-white">FAQ</Text>
          </View>

          <View className="relative mt-10">
            {/* Search Input */}
            <View className="relative mb-10">
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#6B7280"
                className="text-[17px] font-medium leading-[22px] w-full text-white pl-10 bg-black-1200  rounded-[10px]"
              />
              <View className="absolute top-1/2 -translate-y-1/2 left-2 w-5 h-5">
                <SvgIcon name="searchIcon" />
              </View>
            </View>

            {/* Image */}
            <View className="items-center my-20">
              <SvgIcon name="faqMain" width="172" height="100" />
            </View>

            <FAQList />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FaqView;
