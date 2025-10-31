import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { TokenBalances } from "@/src/types/balance";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "@/src/features/loadingSlice";
import useEarn from "@/hooks/api/useEarn";
import InfoAlert, { InfoAlertProps } from "../InfoAlert";
import BalanceYieldGuide from "../BalanceYieldGuide";
import useUser from "@/hooks/api/useUser";
import {
  setFreeBalances,
  setLockupBalances,
} from "@/src/features/balance/balanceSlice";

export type ConfirmTransferParams = {
  symbol: keyof TokenBalances;
  amount: string;
};

const ReceiveInstant = ({ symbol, amount }: ConfirmTransferParams) => {
  const { t } = useTranslation();
  const [infoAlertVisible, setInfoAlertVisible] = useState(false);
  const [infoAlertState, setInfoAlertState] = useState<Partial<InfoAlertProps>>(
    {}
  );
  const [transferSuccess, setTransferSuccess] = useState(false);

  const dispatch = useDispatch();
  const processClaim = async () => {
    try {
      dispatch(showLoading());
      let result = await useEarn.claim({
        amount,
        symbol,
      });
      dispatch(hideLoading());
      if (typeof result === "string") {
        setInfoAlertState({
          type: "error",
          text: result,
        });
        setInfoAlertVisible(true);
        return;
      }
      setInfoAlertState({
        type: "success",
        text: t("earn.transfer.transfer_successful"),
      });
      setInfoAlertVisible(true);
      setTransferSuccess(true);
    } catch (error) {
      console.log("something wrong", error);
    } finally {
      fetchBalance();
    }
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

  return (
    <View>
      <View className="bg-transparent flex justify-center">
        <View className="flex flex-row justify-center gap-2">
          <TouchableOpacity
            disabled={amount === "0" || amount === ""}
            className={`rounded-xl self-center px-4 py-2 border-gray-600 border ${
              amount === "0" || amount === "" ? "bg-[#2A2A2A]" : "bg-[#1E1E1E]"
            }`}
            onPress={() => {
              if (amount !== "0" && amount !== "") {
                processClaim();
              }
            }}
          >
            <Text
              className={`text-center ${
                amount === "0" || amount === "" ? "text-gray-300" : "text-white"
              }`}
            >
              Receive
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <InfoAlert
        {...infoAlertState}
        visible={infoAlertVisible}
        setVisible={setInfoAlertVisible}
      />
    </View>
  );
};

export default ReceiveInstant;
