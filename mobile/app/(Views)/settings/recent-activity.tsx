import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import SvgIcon from "../../components/SvgIcon";

const RecentActivity = () => {
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
          className="px-4 pt-8"
        >
          <View className="w-full pb-20">
            <View className="items-center relative">
              <Pressable
                onPress={() => navigation.goBack()}
                className="absolute left-0 top-2"
              >
                <SvgIcon name="leftArrow" />
              </Pressable>
              <Text className="text-lg font-semibold text-white">
                Recent Activity
              </Text>
            </View>
            <View className="relative mt-8 h-full">
              <Text className="text-[17px] font-semibold text-gray-1200 mb-2">
                Jan 6, 2025
              </Text>
              <View className="space-y-2">
                <Pressable className="bg-black-1200 active:border-pink-1200 mb-2 border-2 border-pink-1200 rounded-[15px] flex-row items-start justify-between p-4">
                  <View className="flex-row items-center gap-3">
                    <View className="relative">
                      <Image
                        source={require("../../../assets/images/coin-icon2.png")}
                        className="w-[47px] h-[47px]"
                      />
                      <View className="absolute bottom-0 right-0">
                        <SvgIcon name="arrowicon2" />
                      </View>
                    </View>
                    <View>
                      <Text className="text-[17px] font-medium leading-[22px] text-white">
                        Receipt completed
                      </Text>
                      <Text className="text-[15px] font-semibold leading-[22px] text-white">
                        Transmit: 404
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-semibold leading-[22px] text-pink-1100 mb-auto">
                    +10,000 MEA
                  </Text>
                </Pressable>

                <Pressable className="bg-black-1200 active:border-pink-1200 mb-2 border-2 border-black-1200 rounded-[15px] flex-row items-start justify-between p-4">
                  <View className="flex-row items-center gap-3">
                    <View className="relative">
                      <Image
                        source={require("../../../assets/images/coin-icon2.png")}
                        className="w-[47px] h-[47px]"
                      />
                      <View className="absolute bottom-0 right-0">
                        <SvgIcon name="arrowicon2" />
                      </View>
                    </View>
                    <View>
                      <Text className="text-[17px] font-medium leading-[22px] text-white">
                        Receipt completed
                      </Text>
                      <Text className="text-[15px] font-semibold leading-[22px] text-white">
                        Transmit: 404
                      </Text>
                    </View>
                  </View>
                  <Text className="text-base font-semibold leading-[22px] text-pink-1100">
                    +10,000 MEA
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RecentActivity;
