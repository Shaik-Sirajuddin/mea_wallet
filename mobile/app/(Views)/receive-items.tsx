import { router, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { tokenImageMap, truncateAddress } from "@/utils/ui";
import SvgIcon from "../components/SvgIcon";
import InfoAlert, { InfoAlertProps } from "../components/InfoAlert";
import * as Clipboard from "expo-clipboard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "@/src/store/hooks";
import useDeposit from "@/hooks/useDeposit";
import {
  setDepositAddresses,
  setRegisteredAddresses,
} from "@/src/features/asset/depositSlice";
import { setMinDeposit } from "@/src/features/token/tokenSlice";
import { t } from "i18next";
import { BackButton } from "../components/BackButton";
import TokenPreview from "../components/TokenPreview";
import { TokenQuotes } from "@/src/types/balance";

const ReceiveItems = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({
    type: "success",
    text: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const _depositAddresses = useSelector(
    (state: RootState) => state.deposit.depositAddresses
  );
  const balances = useSelector((state: RootState) => state.balance.free);
  const depositAddress = useMemo(() => {
    return _depositAddresses[0] ?? "";
  }, [_depositAddresses]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const syncDepositSettings = async () => {
    const res = await useDeposit.getDepositSettings();
    if (typeof res === "string") {
      setModalState({
        type: "error",
        text: res,
      });
      setModalVisible(true);
      return;
    }
    dispatch(setMinDeposit(res.minDeposit));
    dispatch(setRegisteredAddresses(res.userDepositAddresses));
    dispatch(setDepositAddresses(res.managerDepositAddresses));
  };

  useEffect(() => {
    syncDepositSettings();
  }, []);

  return (
    <View
      className="bg-black-1000 flex-1"
      style={{ paddingBottom: insets.bottom }}
    >
      <View className="w-full h-full max-w-5xl mx-auto">
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="w-full">
            <View className="items-center relative">
              <BackButton />

              <Text className="text-lg font-semibold text-white">
                {t("receive.title")}
              </Text>
            </View>

            <View className="relative mt-10">
              {Object.entries(balances).map(([tokenSymbol, balance]) => (
                <Pressable
                  key={tokenSymbol}
                  onPress={() => {
                    console.log("navigate called");
                    router.push({
                      pathname: "/deposit-view",
                      params: {
                        symbol: tokenSymbol,
                      },
                    });
                  }}
                  className="mb-2"
                >
                  <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4">
                    <View className="flex flex-row items-center gap-3">
                      <Image
                        source={tokenImageMap[tokenSymbol]}
                        className="w-12 h-12 rounded-full"
                        resizeMode="cover"
                      />
                      <View>
                        <Text className="text-[17px] font-medium leading-[22px] text-white">
                          {tokenSymbol.toUpperCase()}
                        </Text>
                        <View className="flex-row items-center gap-1">
                          <Text className="text-[15px] font-medium leading-[22px] text-white">
                            {truncateAddress(depositAddress)}
                          </Text>
                        </View>
                      </View>
                      <View className="flex-1 flex items-end">
                        <TouchableOpacity
                          className="px-4 py-3"
                          onPress={() => {
                            router.push({
                              pathname: "/(Views)/mea-address",
                              params: {
                                symbol: tokenSymbol,
                              },
                            });
                          }}
                        >
                          <SvgIcon
                            name="QRIcon"
                            width="26"
                            height="26"
                            color="pink"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {/* <TokenPreview token={tokenSymbol as keyof TokenQuotes}/> */}
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <InfoAlert
        {...modalState}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </View>
  );
};

export default ReceiveItems;
