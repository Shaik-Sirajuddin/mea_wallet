import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import SvgIcon from "@/app/components/SvgIcon";
import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import OtpModal from "@/app/components/OTPModal";
import useStaking, { StakingPlan } from "@/hooks/useStaking";
import { tokenImageMap } from "@/utils/ui";
import Decimal from "decimal.js";
import { RootState } from "@/src/store";
import { useSelector } from "react-redux";
import { TokenBalances } from "@/src/types/balance";
import { BackButton } from "@/app/components/BackButton";

const EnrollPlan = () => {
  const { t } = useTranslation();
  const { plan } = useLocalSearchParams();

  let parsedPlan: StakingPlan | null = null;
  try {
    parsedPlan = plan ? JSON.parse(plan as string) : null;
  } catch (error) {
    console.error("Failed to parse plan data", error);
  }

  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<
    keyof TokenBalances | null
  >("recon");
  const [tokenModalVisible, setTokenModalVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [enrollmentSucces, setEnrollmentSuccess] = useState(false);
  const freeBalance = useSelector(
    (state: RootState) => state.balance.free || {}
  );
  const expectedInterest = useMemo(() => {
    try {
      const deposit = parseFloat(amount || "0");
      return new Decimal(deposit)
        .mul(parsedPlan!.interestRate)
        .div(100)
        .toFixed(2);
    } catch (error) {
      console.log("something went wrong", error);
      return "0";
    }
  }, [amount]);

  useEffect(() => {
    setTimeout(() => {
      //   setTokenModalVisible(true);
    }, 0);
  }, []);

  if (!parsedPlan) {
    return (
      <View className="bg-black-1000 flex-1 items-center justify-center">
        <Text className="text-white">{t("staking.invalid_plan_data")}</Text>
      </View>
    );
  }

  const handleEnroll = async () => {
    if (!selectedToken) {
      setModalState({
        text: t("staking.please_select_token"),
        type: "error",
      });
      setPopupVisible(true);
      return;
    }
    if (!amount || parseFloat(amount) < parseFloat(parsedPlan!.minDeposit)) {
      setModalState({
        text: t("staking.minimum_deposit_error", {
          minDeposit: parsedPlan!.minDeposit,
        }),
        type: "error",
      });
      setPopupVisible(true);
      return;
    }

    if (new Decimal(amount).gt(freeBalance[selectedToken])) {
      setModalState({
        text: t("staking.amount_exceeds_balance", {
          balance: freeBalance[selectedToken],
          token: selectedToken.toUpperCase(),
        }),
        type: "error",
      });
      setPopupVisible(true);
      return;
    }
    setOtpModalVisible(true);
  };

  const handleOtpSubmit = async (otp: string | null) => {
    setOtpModalVisible(false);
    if (!otp || otp.length < 6) {
      setModalState({
        text: t("common.invalid_otp"),
        type: "error",
      });
      setPopupVisible(true);
      return;
    }

    let result = await useStaking.applyStaking({
      asset: selectedToken!.toUpperCase(),
      deposit_money: amount,
      interest: expectedInterest,
      interest_rate: parseFloat(parsedPlan.interestRate),
      otp_code: otp!,
      seqno: parsedPlan.id.toString(),
    });

    if (typeof result === "string") {
      setModalState({
        text: result || t("staking.enrollment_failed"),
        type: "error",
      });
      setPopupVisible(true);
      return;
    }
    setModalState({
      text: t("staking.enrolled_successfully"),
      type: "success",
    });
    setPopupVisible(true);
    setEnrollmentSuccess(true);
  };

  return (
    <View className="flex-1 bg-black-1000">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-black-1000"
      >
        <ScrollView className="flex-grow-0" keyboardShouldPersistTaps="handled">
          <View className="bg-black-1000 flex-1">
            <View className="w-full mx-auto ">
              <View className="items-center relative">
                <BackButton />

                <Text className="text-lg font-semibold text-white">
                  {t("staking.staking_list")}
                </Text>
              </View>

              {/* Plan Details */}
              <View className="bg-black-1200 border-black-1200 border-2 rounded-2xl p-4 mt-10">
                <Text className="text-white font-semibold text-lg mb-3">
                  {parsedPlan.name}
                </Text>

                <View className="bg-black-700 rounded-xl p-3 mb-4">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-400 text-base">
                      {t("staking.lockup_period")}
                    </Text>
                    <Text className="text-white text-lg font-medium">
                      {parsedPlan.lockupDays}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-400 text-base">
                      {t("staking.min_deposit")}
                    </Text>
                    <Text className="text-white text-lg font-medium">
                      {parsedPlan.minDeposit}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-3">
                    <Text className="text-gray-400 text-base">
                      {t("staking.compensation")}
                    </Text>
                    <Text className="text-green-500 text-xl font-bold">
                      {parsedPlan.interestRate}%
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-400 text-base">
                      {t("staking.early_withdrawl_fee")}
                    </Text>
                    <Text className="text-white text-lg font-medium">
                      {parsedPlan.unstakingFee}%
                    </Text>
                  </View>
                </View>

                {/* Selected Token */}
                <View className="mb-4">
                  <Text className="text-gray-400 mb-2">
                    {t("components.token")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setTokenModalVisible(true)}
                    className="border border-gray-700 rounded-xl px-4 py-2 bg-black-900 flex-row items-center"
                  >
                    {selectedToken ? (
                      <>
                        <View className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-gray-600 bg-black-900">
                          <Image
                            source={tokenImageMap[selectedToken]}
                            className="w-full h-full"
                            resizeMode="cover"
                          />
                        </View>
                        <Text className="text-white text-base">
                          {selectedToken.toUpperCase()}
                        </Text>
                      </>
                    ) : (
                      <Text className="text-white">
                        {t("staking.select_token")}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-400 text-base">
                    {t("components.available_balance")}:
                  </Text>
                  <Text className="text-white text-lg font-medium">
                    {selectedToken
                      ? freeBalance[selectedToken as keyof TokenBalances]
                      : "--"}
                  </Text>
                </View>
                {/* Expected Final Amount */}
                <View className="mb-4 mt-4">
                  <Text className="text-gray-400">
                    {t("staking.interest_at_maturity")}
                  </Text>
                  <View className="flex flex-row gap-2 items-center mt-2">
                    <Text className="text-green-500 text-2xl font-extrabold">
                      {expectedInterest}
                    </Text>
                    <Text className="text-white text font-bold">
                      {selectedToken?.toUpperCase()}
                    </Text>
                  </View>
                </View>

                {/* Amount Input */}
                <View className="mb-4">
                  <Text className="text-gray-400 mb-2">
                    {t("common.amount")}
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                    placeholder={t("staking.enter_amount_to_stake")}
                    className="border border-gray-700 rounded-xl px-4 py-2 text-white bg-black-900"
                    placeholderTextColor="#999"
                  />
                </View>

                {/* Enroll Button */}
                <TouchableOpacity
                  onPress={handleEnroll}
                  activeOpacity={1}
                  className="bg-pink-1100 rounded-xl py-3 items-center"
                >
                  <Text className="text-white font-semibold text-base">
                    {t("staking.staking")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Token Selection Modal */}
            <Modal visible={tokenModalVisible} transparent animationType="fade">
              <View className="flex-1 bg-black-1000 bg-opacity-95 justify-center items-center px-8">
                <View className="bg-black-800 rounded-xl p-4 w-full">
                  <Text className="text-white text-lg font-semibold mb-4">
                    {t("staking.select_token")}
                  </Text>

                  {parsedPlan.supportedTokens.map((token) => (
                    <TouchableOpacity
                      key={token}
                      onPress={() => {
                        setSelectedToken(token);
                        setTokenModalVisible(false);
                      }}
                      className="flex-row items-center py-3 px-2 border-b border-gray-700"
                    >
                      <View className="w-10 h-10 rounded-full overflow-hidden mr-4 border border-gray-600 bg-black-900">
                        <Image
                          source={tokenImageMap[token]}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      </View>
                      <Text className="text-white text-base">
                        {token.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  <TouchableOpacity
                    onPress={() => setTokenModalVisible(false)}
                    className="mt-4 bg-pink-1100 rounded-xl py-3 items-center"
                  >
                    <Text className="text-white font-semibold text-base">
                      {t("common.cancel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <InfoAlert
              {...modalState}
              visible={popupVisible}
              setVisible={setPopupVisible}
              onDismiss={() => {
                if (enrollmentSucces) {
                  router.dismiss();
                  router.navigate("/(Tabs)/staking");
                }
              }}
            />
            <OtpModal visible={otpModalVisible} onClose={handleOtpSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EnrollPlan;
