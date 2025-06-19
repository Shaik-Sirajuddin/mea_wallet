import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PopupModal from "../components/Model";
import PopupModalFade from "../components/InfoAlert";
import SvgIcon from "../components/SvgIcon";

const StakingView = () => {
  const navigation = useNavigation();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [visiblePopupStaking, setVisiblePopupStaking] = useState(false);
  const [visiblePopupUnStaking, setVisiblePopupUnStaking] = useState(false);
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
            <View className="items-center relative px-4">
              <Pressable
                onPress={() => navigation.goBack()}
                className="absolute left-1 top-0 z-10 p-2"
              >
                <SvgIcon name="leftArrow" width="21" height="21" />
              </Pressable>
              <Text className="text-lg font-semibold text-white">Staking</Text>
            </View>
            <View className="relative mt-10">
              <Pressable
                onPress={() => {
                  setVisiblePopup(true);
                }}
                className="border-2 flex-row justify-between mb-2 border-pink-1200 active:border-pink-1200 hover:border-pink-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
              >
                <View className="flex flex-row items-center gap-[11px]">
                  <Image
                    source={require("../../assets/images/coin-img.png")}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                      MEA
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                      0 MEA
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-4">
                  <View className="text-end items-end">
                    <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                      $0.00
                    </Text>
                    <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                      $0.00
                    </Text>
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setVisiblePopup(true);
                }}
                className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
              >
                <View className="flex flex-row items-center gap-[11px]">
                  <Image
                    source={require("../../assets/images/coin-img.png")}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                      MEA
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                      0 MEA
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-4">
                  <View className="text-end items-end">
                    <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                      $0.00
                    </Text>
                    <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                      $0.00
                    </Text>
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setVisiblePopup(true);
                }}
                className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
              >
                <View className="flex flex-row items-center gap-[11px]">
                  <Image
                    source={require("../../assets/images/coin-img.png")}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                      MEA
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                      0 MEA
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-4">
                  <View className="text-end items-end">
                    <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                      $0.00
                    </Text>
                    <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                      $0.00
                    </Text>
                  </View>
                </View>
              </Pressable>

              <Text className="text-[17px] my-5 font-semibold leading-5 text-white">
                My Staking Status
              </Text>

              <Pressable
                onPress={() => {
                  setVisiblePopup(true);
                }}
                className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
              >
                <View className="flex flex-row items-center gap-[11px]">
                  <Image
                    source={require("../../assets/images/coin-img.png")}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                      MEA
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                      0 MEA
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-4">
                  <View className="text-end items-end">
                    <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                      $0.00
                    </Text>
                    <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                      $0.00
                    </Text>
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setVisiblePopup(true);
                }}
                className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
              >
                <View className="flex flex-row items-center gap-[11px]">
                  <Image
                    source={require("../../assets/images/coin-img.png")}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                      MEA
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                      0 MEA
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-4">
                  <View className="text-end items-end">
                    <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                      $0.00
                    </Text>
                    <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                      $0.00
                    </Text>
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setVisiblePopup(true);
                }}
                className="border-2 flex-row justify-between mb-2 active:border-pink-1200 hover:border-pink-1200 border-black-1200 bg-black-1200 rounded-2xl py-[13px] px-3"
              >
                <View className="flex flex-row items-center gap-[11px]">
                  <Image
                    source={require("../../assets/images/coin-img.png")}
                    className="w-12 h-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-[17px] mb-1 font-medium leading-5 text-white">
                      MEA
                    </Text>
                    <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                      0 MEA
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-4">
                  <View className="text-end items-end">
                    <Text className="text-[17px] mb-1 text-end font-medium leading-5 text-white">
                      $0.00
                    </Text>
                    <Text className="text-[15px] text-end font-normal leading-5 text-gray-1200">
                      $0.00
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
      <PopupModal
        visible={visiblePopup}
        animationType="slide"
        setVisible={setVisiblePopup}
      >
        <View className="w-full px-4">
          <View className="flex-row items-center gap-3">
            <View className="w-16 h-16 !rounded-[100px] border-2 bg-gray-1600 border-pink-1200">
              <Image
                source={require("../../assets/images/coin-img.png")}
                className="w-full h-full"
              />
            </View>
            <View>
              <Text className="text-[22px] font-medium text-white mb-2">
                MEA
              </Text>
              <Text className="text-[15px] !rounded-[4px] font-medium text-green-1000 px-1 border border-green-1000">
                Proceeding
              </Text>
            </View>
          </View>

          <View className="w-full max-w-[260px] mt-6 mb-9 mx-auto">
            <View className="flex-row justify-between mb-2">
              <Text className="text-[15px] text-white">Lock Up Period</Text>
              <Text className="text-[15px] text-white">30 Days</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-[15px] text-white">Total Deposit</Text>
              <Text className="text-[15px] text-white">$$0</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-[15px] text-white">Compensation</Text>
              <Text className="text-[15px] text-white">5%</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-[15px] text-white">
                Early Withdrawal Fee
              </Text>
              <Text className="text-[15px] text-pink-1300">10%</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => setVisiblePopupStaking(true)}
              className="w-1/2 h-[45px] bg-pink-1100 rounded-[15px] justify-center items-center border border-blue-1100"
            >
              <Text className="text-white font-semibold">Staking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisiblePopupUnStaking(true)}
              className="w-1/2 h-[45px] bg-black-1100 rounded-[15px] justify-center items-center"
            >
              <Text className="text-white font-semibold">Unstaking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupModal>
      <PopupModalFade
        visible={visiblePopupStaking}
        setVisible={setVisiblePopupStaking}
      >
        <View className="w-full px-4">
          <Text className="text-[17px] text-white text-center mb-4">
            Do you want to start staking?
          </Text>
          <View className="flex-row items-center justify-center gap-2 px-6">
            <TouchableOpacity
              onPress={() => setVisiblePopupStaking(false)}
              className="w-1/2 h-[45px] bg-pink-1100 rounded-[15px] justify-center items-center border border-blue-1100"
            >
              <Text className="text-white font-semibold">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisiblePopupStaking(false)}
              className="w-1/2 h-[45px] bg-black-1100 rounded-[15px] justify-center items-center"
            >
              <Text className="text-white font-semibold">No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupModalFade>

      <PopupModalFade
        visible={visiblePopupUnStaking}
        setVisible={setVisiblePopupUnStaking}
      >
        <View className="w-full px-4">
          <Text className="text-[17px] text-white text-center mb-4">
            Do you want to start Unstacking?
          </Text>
          <View className="flex-row items-center justify-center gap-2 px-6">
            <TouchableOpacity
              onPress={() => setVisiblePopupUnStaking(false)}
              className="w-1/2 h-[45px] bg-pink-1100 rounded-[15px] justify-center items-center border border-blue-1100"
            >
              <Text className="text-white font-semibold">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVisiblePopupUnStaking(false)}
              className="w-1/2 h-[45px] bg-black-1100 rounded-[15px] justify-center items-center"
            >
              <Text className="text-white font-semibold">No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </PopupModalFade>
    </View>
  );
};

export default StakingView;
