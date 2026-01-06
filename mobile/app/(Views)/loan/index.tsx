import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import useLoan from "@/hooks/api/useLoan";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/src/features/loadingSlice";
import { showInfo } from "@/src/features/infoOverLaySlice";

export default function Loan() {
  const { t } = useTranslation();
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch()
  const sync = async () => {
    const loanInfo = await useLoan.getLoanLimit();
    if (typeof loanInfo === 'string') {
      return undefined
    }
    let hasLoan = typeof loanInfo !== "string" && loanInfo?.loan_count > 0 || loanInfo.loanMax == 'Y'
    if (hasLoan) {
      setHasActiveLoan(true);
    } else {
      setHasActiveLoan(false);
    }
    return hasLoan
  };

  useEffect(() => {
    sync();
  }, []);

  const handleGoToApplication = async () => {
    dispatch(showLoading())
    try {
      let hasLoan = await sync()
      if (hasLoan === undefined) {
        dispatch(showInfo({ type: "error", message: "Something went wrong!" }));
        return;
      }
      if (hasLoan) {
        setShowWarning(true);
        return;
      }
      router.push("/(Views)/loan/application");

    } catch (error) {
      console.log("loading error ,", error)
    }
    finally {
      dispatch(hideLoading())
    }
  };

  return (
    <View className="bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto">
        <View className="items-center relative mt-2">
          <Text className="text-lg font-semibold text-white">
            {t("loan.title")}
          </Text>
        </View>
        <View className="mt-10">
          <Pressable
            onPress={handleGoToApplication}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../../assets/images/passive-income.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              {t("loan.application")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(Views)/loan/overview")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../../assets/images/task.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              {t("loan.overview")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(Views)/loan/history")}
            className="flex-row items-center gap-3 px-3 py-5 mb-2 rounded-2xl border-2 border-transparent active:border-pink-1200 bg-black-1200 transition-all duration-500"
          >
            <View className="w-8 h-8 rounded-full bg-gray-1500 flex items-center justify-center">
              <Image
                source={require("../../../assets/images/history.png")}
                className="h-6 w-6"
                tintColor={"white"}
              />
            </View>
            <Text className="text-base font-semibold leading-5 text-white">
              {t("loan.transaction_history")}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Already applying loan popup */}
      <Modal
        transparent
        visible={showWarning}
        animationType="fade"
        onRequestClose={() => setShowWarning(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-4">
          <View className="relative w-[92%] max-w-md rounded-2xl border bg-black-1200 p-5 text-gray-100 shadow-xl">
            <Text className="mb-3 text-lg text-white font-semibold">
              {t("common.info.info") || "Warning"}
            </Text>
            <View className="pl-1">
              <Text className="text-base text-gray-200">
                {t("loan.already_applying") || "I'm already applying for a loan."}
              </Text>
            </View>
            <View className="mt-5 flex flex-row justify-end items-center gap-3">
              <Pressable
                className="inline-flex items-center justify-center h-10 px-4 py-0 rounded-md text-sm font-semibold text-white box-border border bg-gray-900 border-gray-700"
                onPress={() => setShowWarning(false)}
              >
                <Text className="text-sm font-semibold text-white">
                  {t("common.close") || "Close"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
