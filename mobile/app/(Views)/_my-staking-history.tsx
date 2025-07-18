import { useNavigation } from "expo-router";
import React from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SvgIcon from "../components/SvgIcon";

const MyStakingHistory = () => {
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
      <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="px-4"
        >
          <View className="w-full">
            <View className="items-center relative px-4">
              <Pressable
                onPress={() => navigation.goBack()}
                className="absolute left-0 top-0 z-10 p-2"
              >
                <SvgIcon name="leftArrow" width="21" height="21" />
              </Pressable>
              <Text className="text-lg font-semibold text-white">
                My Staking
              </Text>
            </View>

            <View className="relative mt-8">
              <View className="mb-0">
                <View className="flex flex-row items-center gap-2 mb-3">
                  <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                  <Text className="text-base font-medium leading-[22px] text-white">
                    Transaction History
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  No
                </Text>
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
                  100,000.0000
                  <Text className="text-gray-1200 text-[15px]"> MEA</Text>
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  Name
                </Text>
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
                  100,000.0000
                  <Text className="text-gray-1200 text-[15px]"> MEA</Text>
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  Asset
                </Text>
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
                  100,000.0000{" "}
                  <Text className="text-gray-1200 text-[15px]">MEA</Text>
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  Date
                </Text>
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
                  100.0000
                  <Text className="text-gray-1200 text-[15px]"> MEA</Text>
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  Expiration Date
                </Text>
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-white">
                  100.0000
                  <Text className="text-gray-1200 text-[15px]"> MEA</Text>
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  Other
                </Text>
                <Text className="text-white" />
              </View>
              <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                <Text className="text-[17px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
                  Other
                </Text>
                <Text className="text-white" />
              </View>

              <View className="flex flex-row items-center justify-center gap-4 mt-6">
                <TouchableOpacity>
                  <SvgIcon name="leftArrow2" width="12" height="18" />
                </TouchableOpacity>
                <TouchableOpacity className="w-7 h-7 p-0.5 rounded-full bg-black-1200 flex items-center justify-center">
                  <Text className="text-[17px] font-medium leading-[22px] text-gray-1200/70 text-center">
                    1
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <SvgIcon name="rightArrow" width="12" height="18" />
                </TouchableOpacity>
              </View>
            </View>

            <View></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyStakingHistory;
