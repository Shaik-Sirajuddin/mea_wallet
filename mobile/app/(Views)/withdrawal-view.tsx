import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SvgIcon from "../components/SvgIcon";
import { TokenBalances } from "@/src/types/balance";
import PrimaryButton from "../components/PrimaryButton";
import QRModal from "../components/QRModal";
import InfoAlert, { InfoAlertProps } from "../components/InfoAlert";
import { isValidPublicKey } from "@/utils/web3";
import { useAppDispatch } from "@/src/store/hooks";
import { RootState } from "@/src/store";
import { useSelector } from "react-redux";
import useAsset from "@/hooks/useAsset";
import useUser from "@/hooks/useUser";
import {
  setMinWithdraw,
  setWithdrawFees,
} from "@/src/features/token/tokenSlice";
import { useDispatch } from "react-redux";
import Decimal from "decimal.js";

const WithDrawal = () => {
  const navigation = useNavigation();
  const { symbol } = useLocalSearchParams<{ symbol: keyof TokenBalances }>();
  const freeBalance = useSelector(
    (state: RootState) => state.balance.free[symbol]
  );
  const minWithdrawl = useSelector(
    (state: RootState) => state.token.minWithdraw[symbol]
  );

  const disptach = useDispatch();

  const displaySymbol = useMemo(() => {
    return symbol.toUpperCase();
  }, [symbol]);

  const [qrScanVisible, setQRScanVisible] = useState(false);
  const [infoAlertVisible, setInfoAlertVisible] = useState(false);
  const [infoAlertState, setInfoAlertState] = useState<Partial<InfoAlertProps>>(
    {}
  );

  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("0");

  const options = [
    { label: "10%", value: 0.1 },
    { label: "50%", value: 0.5 },
    { label: "Max", value: 1.0 },
  ];
  const handleQRData = (data: string | null) => {
    setQRScanVisible(false);
    if (!data || !isValidPublicKey(data)) {
      setInfoAlertState({
        ...infoAlertState,
        type: "error",
        text: "Invalid Address",
      });
      setInfoAlertVisible(true);
      return;
    }
    setWithdrawalAddress(data);
  };

  const syncData = async () => {
    let result = await useUser.getWithdrawSettings();
    if (typeof result === "string") {
      setInfoAlertState({
        ...infoAlertState,
        type: "info",
        text: result,
      });
      setInfoAlertVisible(true);
      return;
    }
    console.log(result);
    disptach(setMinWithdraw(result.minWithdraw));
    disptach(setWithdrawFees(result.withdrawFees));
  };

  const handleQuickAmountSelect = (percent: number) => {
    if (!freeBalance) return;
    const amount = new Decimal(freeBalance).mul(percent);
    console.log("Selected amount:", amount.toString());
    setWithdrawAmount(amount.toString());
  };
  const handleNext = () => {
    // Validate withdrawal address
    if (!withdrawalAddress || !isValidPublicKey(withdrawalAddress)) {
      setInfoAlertState({
        type: "error",
        text: "Please enter a valid withdrawal address.",
      });
      setInfoAlertVisible(true);
      return;
    }

    // Validate withdrawal amount
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      setInfoAlertState({
        type: "error",
        text: "Please enter a valid withdrawal amount.",
      });
      setInfoAlertVisible(true);
      return;
    }

    const amount = new Decimal(withdrawAmount);

    if (amount.lessThan(minWithdrawl)) {
      setInfoAlertState({
        type: "error",
<<<<<<< Updated upstream
        text: `Minimum withdrawal amount is ${minWithdrawl} ${displaySymbol}.`,
=======
        text: t("withdrawal.min_amount_error", {
          amount: minWithdrawl,
          symbol: displaySymbol,
        }),
>>>>>>> Stashed changes
      });
      setInfoAlertVisible(true);
      return;
    }

    if (amount.greaterThan(freeBalance)) {
      setInfoAlertState({
        type: "error",
<<<<<<< Updated upstream
        text: `Withdrawal amount exceeds your available balance of ${freeBalance} ${displaySymbol}.`,
=======
        text: t("withdrawal.insufficient_balance", {
          balance: freeBalance,
          symbol: displaySymbol,
        }),
>>>>>>> Stashed changes
      });
      setInfoAlertVisible(true);
      return;
    }

    // If all validations pass
    console.log("Proceed to next step with:", {
      withdrawalAddress,
      amount: amount.toString(),
    });
    router.push({
      pathname: "/confirm-withdrawl",
      params: {
        symbol: symbol,
        amount: amount.toString(),
        address: withdrawalAddress,
      },
    });
  };

  useEffect(() => {
    syncData();
  }, []);
  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto">
        <View className="w-full h-full">
          <View className="items-center relative">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute left-0 top-2 z-10"
            >
              <SvgIcon name="leftArrow" width="20" height="20" />
            </Pressable>
<<<<<<< Updated upstream
            <Text className="text-lg font-semibold text-white">Withdrawal</Text>
=======
            <Text className="text-lg font-semibold text-white">
              {t("withdrawal.title")}
            </Text>
>>>>>>> Stashed changes
          </View>
          <View className="relative mt-10">
            <View className="mt-2.5 mb-2">
              <View className="flex flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium leading-[22px] text-white">
                  Withdrawal possible
                </Text>
              </View>

              <View className="relative">
                <View className="text-[15px] flex flex-row items-center justify-center text-center text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]">
                  <Text className="text-white">{freeBalance}</Text>
                  <Text className="text-gray-1200 ml-1">{displaySymbol}</Text>
                </View>
              </View>

              <View className="mt-5 mb-4">
                <View className="flex flex-row items-center gap-2 mb-3">
                  <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                  <Text className="text-base font-medium leading-[22px] text-white">
                    Withdrawal Address
                  </Text>
                </View>
                <View>
                  <TextInput
                    value={withdrawalAddress}
                    onChangeText={setWithdrawalAddress}
                    placeholder="Withdrawal Address"
                    placeholderTextColor="#fff"
                    keyboardType="default"
                    className="text-[15px] text-white font-medium px-8 pr-20 bg-black-1200 w-full h-[71px] rounded-[15px]"
                  />
                  <View className="flex justify-center items-center absolute right-5 top-0 bottom-0 z-10">
                    <TouchableOpacity
                      onPress={() => {
                        setQRScanVisible(true);
                      }}
                    >
                      <SvgIcon name="qrScannerIcon" height="30" width="30" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View className="mt-5 mb-4">
                <View className="flex flex-row items-center gap-2 mb-3">
                  <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                  <Text className="text-base font-medium leading-[22px] text-white">
                    Withdrawal Quantity
                  </Text>
                </View>

                <View className="relative items-center justify-center mb-2">
                  <TextInput
<<<<<<< Updated upstream
                    placeholder={
                      "Enter Amount (Minimum " +
                      minWithdrawl +
                      " " +
                      displaySymbol +
                      " )"
                    }
=======
                    placeholder={t("withdrawal.enter_amount_min", {
                      amount: minWithdrawl,
                      symbol: displaySymbol,
                    })}
>>>>>>> Stashed changes
                    placeholderTextColor="#fff"
                    className="text-[17px] text-white font-medium pl-8 pr-14 border border-gray-1200 w-full h-[71px] rounded-[15px]"
                    keyboardType="numeric"
                    value={withdrawAmount}
                    onChangeText={setWithdrawAmount}
                  />
                  <TouchableOpacity className="absolute right-6">
                    <SvgIcon name="smallSwapIcon" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex flex-row items-center justify-center gap-2.5">
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className="text-base mb-2 font-semibold text-white text-center py-3 rounded-[15px] w-[91px] bg-black-1200"
                    activeOpacity={0.8}
                    onPress={() => {
                      handleQuickAmountSelect(option.value);
                    }}
                  >
                    <Text className="text-white text-base font-semibold text-center">
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <PrimaryButton
            text="NEXT"
            onPress={() => {
              handleNext();
            }}
          />
        </View>
      </View>
      <QRModal visible={qrScanVisible} onClose={handleQRData} />
      <InfoAlert
        {...infoAlertState}
        visible={infoAlertVisible}
        setVisible={setInfoAlertVisible}
        onDismiss={() => {
          //show success
        }}
      />
    </View>
  );
};

export default WithDrawal;
