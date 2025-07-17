import { useLocalSearchParams, useNavigation, router } from "expo-router";
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SvgIcon from "../components/SvgIcon";
import PrimaryButton from "../components/PrimaryButton";
import InfoAlert, { InfoAlertProps } from "../components/InfoAlert";
import { useAppDispatch } from "@/src/store/hooks";
import { setMinDeposit } from "@/src/features/token/tokenSlice"; // adjust slice import
import useDeposit from "@/hooks/useDeposit";
import { TokenBalances } from "@/src/types/balance";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import {
  setDepositAddresses,
  setRegisteredAddresses,
} from "@/src/features/asset/depositSlice";
import { parseNumberForView, updateIfValid } from "@/utils/ui";
import { BackButton } from "../components/BackButton";

const Deposit = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { symbol } = useLocalSearchParams<{ symbol: keyof TokenBalances }>();
  const [depositAmount, setDepositAmount] = useState("");
  const minDeposit = useSelector(
    (state: RootState) => state.token.minDeposit[symbol]
  );
  const freeBalance = useSelector(
    (state: RootState) => state.balance.free[symbol] || ""
  );
  const [infoAlertVisible, setInfoAlertVisible] = useState(false);
  const [infoAlertState, setInfoAlertState] = useState<Partial<InfoAlertProps>>(
    {}
  );

  const displaySymbol = useMemo(() => symbol?.toUpperCase() || "", [symbol]);
  const dispatch = useAppDispatch();

  const fetchDepositSettings = async () => {
    const res = await useDeposit.getDepositSettings();
    if (typeof res === "string") {
      setInfoAlertState({
        type: "error",
        text: res,
      });
      setInfoAlertVisible(true);
      return;
    }

    // Dispatch to redux store
    dispatch(setMinDeposit(res.minDeposit));
    dispatch(setRegisteredAddresses(res.userDepositAddresses));
    dispatch(setDepositAddresses(res.managerDepositAddresses));
  };

  const handleNext = () => {
    if (!depositAmount || parseFloat(depositAmount) < parseFloat(minDeposit)) {
      setInfoAlertState({
        type: "error",
        text: t("deposit.min_deposit_error", {
          amount: minDeposit,
          symbol: displaySymbol,
        }),
      });
      setInfoAlertVisible(true);
      return;
    }

    router.push({
      pathname: "/confirm-deposit",
      params: { amount: depositAmount, symbol: displaySymbol },
    });
  };

  useEffect(() => {
    fetchDepositSettings();
  }, []);

  return (
    <View className="bg-black-1000">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-black-1000"
      >
        <ScrollView className="h-full" keyboardShouldPersistTaps="handled">
          <View className="w-full h-full max-w-5xl mx-auto pb-0 ">
            <View className="w-full h-full">
              <View className="items-center relative">
                <BackButton />
                <Text className="text-lg font-semibold text-white">
                  {t("deposit.title")}
                </Text>
              </View>

              <View className="relative mt-10">
                <View className="mt-2.5 mb-2">
                  <View className="flex flex-row items-center gap-2 mb-3">
                    <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                    <Text className="text-base font-medium leading-[22px] text-white">
                      {t("deposit.quantity_held")}
                    </Text>
                  </View>

                  <View className="relative">
                    <View className="text-[15px] flex flex-row items-center justify-center text-center text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]">
                      <Text className="text-white">
                        {parseNumberForView(freeBalance)}
                      </Text>
                      <Text className="text-gray-1200 ml-1">
                        {displaySymbol}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-5 mb-4">
                    <View className="flex flex-row items-center gap-2 mb-3">
                      <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                      <Text className="text-base font-medium leading-[22px] text-white">
                        {t("deposit.deposit_quantity")}
                      </Text>
                    </View>

                    <View className="relative items-center justify-center mb-2">
                      <TextInput
                        placeholder={t("deposit.enter_amount_min", {
                          amount: minDeposit,
                          symbol: displaySymbol,
                        })}
                        placeholderTextColor="#fff"
                        value={depositAmount}
                        onChangeText={(value) => {
                          updateIfValid(value, setDepositAmount);
                        }}
                        className="text-[17px] text-white font-medium pl-8 pr-14 border border-gray-1200 w-full h-[71px] rounded-[15px]"
                        keyboardType="numeric"
                      />
                      <TouchableOpacity className="absolute right-6">
                        <SvgIcon name="smallSwapIcon" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex flex-row gap-2 justify-center mt-auto">
                <PrimaryButton text={t("common.next")} onPress={handleNext} />
              </View>
            </View>
          </View>

          <InfoAlert
            {...infoAlertState}
            visible={infoAlertVisible}
            setVisible={setInfoAlertVisible}
            onDismiss={() => {}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Deposit;
