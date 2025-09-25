import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { useTranslation } from "react-i18next";
import messaging from "@react-native-firebase/messaging";
import { AppDispatch, RootState } from "@/src/store";
import useUser from "@/hooks/api/useUser";
import SvgIcon from "../components/SvgIcon";
import PopupModal from "../components/Model";
import PrimaryButton from "../components/PrimaryButton";
import {
  setFreeBalances,
  setLockupBalances,
} from "@/src/features/balance/balanceSlice";
import {
  parseNumberForView,
  tokenImageMap,
  trimTrailingZeros,
} from "@/utils/ui";
import { setQuotes } from "@/src/features/token/tokenSlice";
import Decimal from "decimal.js";
import { useNavigation } from "@react-navigation/native";
import { setUserDetails } from "@/src/features/user/userSlice";
import InfoAlert from "../components/InfoAlert";
import { showLoading } from "@/src/features/loadingSlice";
import { requestNotificationPermission } from "@/lib/notifications/requestPermissions";

export default function HomeScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [showLokcupBalance, setShowLockUpBalance] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const quotes = useSelector((state: RootState) => state.token.quotes || {});
  const freeBalance = useSelector(
    (state: RootState) => state.balance.free || {}
  );
  const lockedBalance = useSelector(
    (state: RootState) => state.balance.lockup || {}
  );
  const email = useSelector((state: RootState) => state.user.email);
  const details = useSelector((state: RootState) => state.user.details);
  const [showAlert, setShowAlert] = useState(false);

  const syncData = async () => {
    setRefreshing(true);
    await Promise.all([fetchBalance(), fetchQuotes(), fetchProfile()]);
    setRefreshing(false);
  };

  const fetchQuotes = async () => {
    const res = await useUser.getQuotes();
    if (typeof res === "string") {
      console.log(res, "fetch quotes");
      return;
    }
    dispatch(setQuotes(res));
  };

  const fetchBalance = async () => {
    const res = await useUser.getBalance();
    if (typeof res === "string") {
      console.log(res, "fetch balance");
      return;
    }
    dispatch(setFreeBalances(res.free));
    dispatch(setLockupBalances(res.lockup));
  };

  const fetchProfile = async () => {
    let data = await useUser.getUserInfo();
    if (typeof data === "string") {
      console.log("failed to fetch profile");
      return;
    }
    dispatch(setUserDetails(data));
  };
  const onRefresh = async () => {
    syncData();
  };

  useEffect(() => {
    syncData();
  }, []);

  useEffect(() => {
    if (details && !details.twoFACompleted) {
      setShowAlert(true); // show the alert
    }
  }, [details]);

  const totalAssetValue = useMemo(() => {
    let totalValue = new Decimal(0);
    for (let [token, amount] of Object.entries(freeBalance)) {
      //@ts-expect-error here
      totalValue = totalValue.add(new Decimal(amount).mul(quotes[token]));
    }
    for (let [token, amount] of Object.entries(lockedBalance)) {
      //@ts-expect-error here
      totalValue = totalValue.add(new Decimal(amount).mul(quotes[token]));
    }
    return trimTrailingZeros(totalValue.toFixed(2));
  }, [freeBalance, lockedBalance, quotes]);

  const getPrice = (token: string) => {
    //@ts-expect-error here
    return parseNumberForView(quotes[token]);
  };

  const getTokensValue = (token: string, balance: string) => {
    return trimTrailingZeros(
      //@ts-expect-error here
      new Decimal(quotes[token]).mul(balance).toFixed(2)
    );
  };

  const getTokenImage = (token: string) => {
    const key = token.toLowerCase();
    return tokenImageMap[key] || require("@/assets/images/coin-img.png");
  };

  const setUpNotifications = async () => {
    let permissionsGranted = await requestNotificationPermission();
    if (permissionsGranted) {
      const token = await messaging().getToken();
      console.log("FCM Token : ", token);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setUpNotifications();
    }, 600);
  }, []);
  return (
    <View className="bg-black-1000">
      <View className="gap-10 min-h-screen max-w-5xl w-full mx-auto">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="w-full pt-10"
        >
          <View className="pb-44 px-4">
            <Pressable
              onPress={() => setShowEditProfile(true)}
              className="flex-row items-center gap-2"
            >
              <View className="bg-pink-1100 w-12 h-12 rounded-full items-center justify-center">
                <Text className="text-2xl font-medium text-white leading-[22px] tracking-[-0.36px]">
                  {details ? details.image : ""}
                </Text>
              </View>
              <Text className="text-[22px] text-white font-medium tracking-[-0.44px]">
                {email}
              </Text>
            </Pressable>

            <View className="items-center mt-[46px] mb-10">
              <SvgIcon name="spaceman" width="74" height="74" />
              <Text className="text-white text-[37px] mt-2 font-semibold">
                ${parseNumberForView(totalAssetValue)}
              </Text>
              {/* <View className="flex-row items-center justify-center gap-1.5">
                <Text className="text-base font-medium text-pink-1200">
                  ${parseFloat(totalAssetValue || "0") * 1.0}
                </Text>
                <View className="text-lg font-medium leading-[12px] text-pink-1200 bg-pink-1200/15 rounded-[5px] py-[5px] px-1">
                  <Text className="text-pink-1200">+2.13%</Text>
                </View>
              </View> */}
            </View>

            <View className="flex-row max-w-[210px] mx-auto gap-[7px]">
              <View className="bg-black-1300 rounded-2xl items-center  flex-1">
                <Link href="/receive-items">
                  <View className="w-full items-center p-[18px] py-[17px]">
                    <SvgIcon name="receiceIcon" width="24" height="24" />
                    <Text className="text-[13px] font-semibold mt-1 text-gray-1000">
                      {t("home.receive")}
                    </Text>
                  </View>
                </Link>
              </View>
              <View className="bg-black-1300 rounded-2xl items-center  flex-1">
                <Link href="/transfer-token">
                  <View className="w-full items-center p-[18px] py-[17px]">
                    <SvgIcon name="sendIcon" width="24" height="24" />
                    <Text className="text-[13px] font-semibold mt-1 text-gray-1000">
                      {t("home.send")}
                    </Text>
                  </View>
                </Link>
              </View>
              {/* <View className="bg-black-1300 rounded-2xl items-center  flex-1">
                <Pressable
                  onPress={() => {
                    //@ts-expect-error this
                    navigation.navigate("swap-tokens");
                  }}
                >
                  <View className="w-full items-center p-[18px] py-[17px]">
                    <SvgIcon name="swapIcon" width="24" height="24" />
                    <Text className="text-[13px] font-semibold mt-1 text-gray-1000">
                      {t("home.swap")}
                    </Text>
                  </View>
                </Pressable>
              </View> */}
            </View>

            <View className="flex-row items-center gap-[17px] my-4">
              <TouchableOpacity
                onPress={() => {
                  setShowLockUpBalance(false);
                }}
              >
                <Text
                  className={`text-xl font-semibold leading-[33px] ${"text-white"}`}
                >
                  {t("home.native")}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full ">
              {Object.entries(freeBalance).map(([token, amount]) => (
                <TouchableOpacity
                  key={token}
                  onPress={() => {
                    if (showLokcupBalance) {
                      router.push({
                        pathname: "/(Views)/lock-up-history",
                        params: {
                          symbol: token,
                        },
                      });
                      return;
                    } else {
                      router.navigate({
                        pathname: "/(Views)/chart-view",
                        params: {
                          symbol: token,
                        },
                      });
                    }
                  }}
                >
                  <View className="border-2 mb-2 border-black-1200 bg-black-1200 rounded-2xl flex-row items-center justify-between py-[13px] px-3">
                    <View className="flex-row items-center gap-[11px]">
                      <Image
                        source={getTokenImage(token)}
                        className="w-12 h-12 rounded-full"
                      />
                      <View>
                        <Text className="text-[17px] font-medium leading-5 text-white">
                          {token.toUpperCase()}
                        </Text>
                        <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                          {parseNumberForView(amount)} {token.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-[17px] font-medium leading-5 text-white text-right">
                        ${getTokensValue(token, amount)}
                      </Text>
                      <Text className="text-[15px] font-normal leading-5 text-gray-1200 text-right">
                        ${getPrice(token)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row items-center gap-[17px] my-4">
              <TouchableOpacity
                onPress={() => {
                  setShowLockUpBalance(true);
                }}
              >
                <Text
                  className={`text-xl font-semibold leading-[33px] ${"text-white"}`}
                >
                  {t("home.lock_up")}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full pb-8">
              {Object.entries(lockedBalance).map(([token, amount]) => (
                <TouchableOpacity
                  key={token}
                  onPress={() => {
                    if (showLokcupBalance) {
                      router.push({
                        pathname: "/(Views)/lock-up-history",
                        params: {
                          symbol: token,
                        },
                      });
                      return;
                    } else {
                      router.navigate({
                        pathname: "/(Views)/chart-view",
                        params: {
                          symbol: token,
                        },
                      });
                    }
                  }}
                >
                  <View className="border-2 mb-2 border-black-1200 bg-black-1200 rounded-2xl flex-row items-center justify-between py-[13px] px-3">
                    <View className="flex-row items-center gap-[11px]">
                      <Image
                        source={getTokenImage(token)}
                        className="w-12 h-12 rounded-full"
                      />
                      <View>
                        <Text className="text-[17px] font-medium leading-5 text-white">
                          {token.toUpperCase()}
                        </Text>
                        <Text className="text-[15px] font-normal leading-5 text-gray-1200">
                          {parseNumberForView(amount)} {token.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-[17px] font-medium leading-5 text-white text-right">
                        ${getTokensValue(token, amount)}
                      </Text>
                      <Text className="text-[15px] font-normal leading-5 text-gray-1200 text-right">
                        ${getPrice(token)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <InfoAlert
        visible={showAlert}
        setVisible={setShowAlert}
        text="You need to complete 2FA setup before continuing."
        type="info"
        primaryButtonText="OK"
        onDismiss={() => {
          router.push("/settings/google-otp"); // navigate after OK
        }}
      />
      <PopupModal visible={showEditProfile} setVisible={setShowEditProfile}>
        <View className="w-full px-4 flex-col items-center justify-center text-center">
          <View className="w-16 h-16 bg-pink-1100 rounded-full items-center justify-center">
            <Text className="text-[25px] font-medium text-white">
              {details ? details.image : ""}
            </Text>
          </View>
          <Text className="text-[22px] font-medium text-white mt-3 mb-6">
            {email}
          </Text>
          <PrimaryButton
            onPress={() => {
              setShowEditProfile(false);
              router.push("/(Views)/edit-profile");
            }}
            text={t("home.edit_profile")}
          />
        </View>
      </PopupModal>
    </View>
  );
}
