import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { BackButton } from "@/app/components/BackButton";
import useLoan from "@/hooks/api/useLoan";
import useUser from "@/hooks/api/useUser";
import InfoAlert from "@/app/components/InfoAlert";
import { Picker } from "@react-native-picker/picker";
import { parseNumberForView, formatDecimal } from "@/utils/ui";

const LoanApplication = () => {
  const { t } = useTranslation();

  // Form state
  const [asset, setAsset] = useState("MEA");
  const [collateralQuantity, setCollateralQuantity] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // Data state
  const [balance, setBalance] = useState("0");
  const [tokenPrice, setTokenPrice] = useState("0");
  const [minLoanAmount, setMinLoanAmount] = useState("10");
  const [loanYield, setLoanYield] = useState(0);
  const [assetYield, setAssetYield] = useState(0);

  // UI state
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [refreshTimer, setRefreshTimer] = useState(60);

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      setRefreshTimer((prev) => (prev > 0 ? prev - 1 : 60));
      if (refreshTimer === 0) {
        fetchData();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [asset]);

  const fetchData = async () => {
    // Fetch settings
    const settingsResult = await useLoan.getSettings();
    if (typeof settingsResult !== "string") {
      setMinLoanAmount(settingsResult.min_loan_amount);
      setLoanYield(settingsResult.LoanYield);
      setAssetYield(settingsResult.AssetYield);
    }

    // Fetch user balance
    const balanceResult = await useUser.getBalance();
    if (typeof balanceResult !== "string") {
      const assetKey = asset.toLowerCase() as keyof typeof balanceResult.free;
      setBalance(balanceResult.free[assetKey] || "0");
    }

    // Fetch quotes for token price
    const quotesResult = await useUser.getQuotes();
    if (typeof quotesResult !== "string") {
      const assetKey = asset.toLowerCase() as keyof typeof quotesResult;
      setTokenPrice(quotesResult[assetKey] || "0");
    }
  };

  // Calculations
  const collateralQty = parseFloat(collateralQuantity) || 0;
  const price = parseFloat(tokenPrice);
  const collateralValuation = collateralQty * price;
  const lockedCollateralPercent = 40;
  const collateralRatioPercent = 60;
  const safetyBufferQty = collateralQty * (lockedCollateralPercent / 100);
  const loanDisbursementAmount =
    collateralValuation * (collateralRatioPercent / 100);

  const handleSubmit = async () => {
    if (!collateralQuantity || collateralQty <= 0) {
      setAlertType("error");
      setAlertText(
        t("loan.enter_valid_amount") || "Please enter a valid amount"
      );
      setAlertVisible(true);
      return;
    }

    if (collateralQty < parseFloat(minLoanAmount)) {
      setAlertType("error");
      setAlertText(`${t("loan.min_amount_error")} ${minLoanAmount}`);
      setAlertVisible(true);
      return;
    }

    if (!otpCode || otpCode.length !== 6) {
      setAlertType("error");
      setAlertText(
        t("loan.enter_valid_otp") || "Please enter a valid 6-digit OTP"
      );
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    const result = await useLoan.applyLoan({
      asset,
      deposit_money: collateralQty,
      otp_code: otpCode,
    });

    setLoading(false);

    if (typeof result === "string" || result.status !== "success") {
      setAlertType("error");
      setAlertText(
        typeof result === "string"
          ? result
          : t("loan.application_failed") || "Loan application failed"
      );
      setAlertVisible(true);
    } else {
      setAlertType("success");
      setAlertText(
        t("loan.application_success") ||
          "Loan application submitted successfully"
      );
      setAlertVisible(true);
      setTimeout(() => {
        router.replace("/loan/overview");
      }, 2000);
    }
  };

  const renderRow = (
    label: string,
    value: React.ReactNode,
    unit: string = ""
  ) => (
    <View className="flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
      <Text className="text-[12px] font-medium leading-[22px] tracking-[-0.34px] text-gray-1200">
        {label}
      </Text>
      <View className="flex-row items-center">
        {typeof value === "string" ? (
          <Text className="text-[12px] font-medium leading-[22px] tracking-[-0.34px] text-white">
            {value}
          </Text>
        ) : (
          value
        )}
        {unit && (
          <Text className="text-gray-1200 text-[15px] ml-1">{unit}</Text>
        )}
      </View>
    </View>
  );

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-3xl mx-auto pb-2">
        <View className="items-center relative mb-10 px-4">
          <BackButton />
          <Text className="text-lg font-semibold text-white">
            {t("loan.loan") || "Loan"}
          </Text>
        </View>

        <ScrollView
          className="px-4"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Asset Selection */}
          {renderRow(
            t("loan.asset"),
            <View className="w-[160px]">
              <View className="bg-black-1000 border border-gray-700 rounded px-3 py-2">
                <Picker
                  selectedValue={asset}
                  onValueChange={(value) => {
                    setAsset(value);
                    setCollateralQuantity("");
                  }}
                  style={{ color: "#fff", height: 38 }}
                  dropdownIconColor="#fff"
                >
                  <Picker.Item label="MEA" value="MEA" />
                  <Picker.Item label="SOL" value="SOL" />
                  <Picker.Item label="FOX9" value="FOX9" />
                </Picker>
              </View>
            </View>
          )}

          {/* Balance */}
          {renderRow(t("loan.balance"), parseNumberForView(balance))}

          {/* Collateral Quantity Input */}
          {renderRow(
            t("loan.collateral_quantity"),
            <TextInput
              className="w-[160px] h-[38px] text-[15px] text-white bg-black-1000 border border-gray-700 rounded px-3 py-1 text-right"
              placeholder={`min : ${minLoanAmount}`}
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={collateralQuantity}
              onChangeText={setCollateralQuantity}
            />
          )}

          {/* OTP Code */}
          {renderRow(
            t("common.title.google_otp_code"),
            <TextInput
              className="w-[160px] h-[38px] text-[15px] text-white bg-black-1000 border border-gray-700 rounded px-3 py-1 text-right"
              placeholder="Google OTP Code"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={otpCode}
              onChangeText={setOtpCode}
              maxLength={6}
            />
          )}

          {/* Token Price */}
          {renderRow(
            t("loan.token_price_usdt"),
            parseNumberForView(tokenPrice)
          )}

          {/* Collateral Quantity (Display) */}
          {renderRow(
            `${t("loan.collateral_quantity")} ${asset}`,
            parseNumberForView(collateralQty.toString())
          )}

          {/* Collateral Valuation */}
          {renderRow(
            t("loan.collateral_valuation_usdt"),
            parseNumberForView(collateralValuation.toFixed(6))
          )}

          {/* Locked Collateral */}
          {renderRow(
            t("loan.locked_collateral"),
            lockedCollateralPercent.toString(),
            "%"
          )}

          {/* Collateral Ratio */}
          {renderRow(
            t("loan.collateral_ratio"),
            collateralRatioPercent.toString(),
            "%"
          )}

          {/* Safety Buffer Quantity */}
          {renderRow(
            `${t("loan.safety_buffer_quantity")} ${lockedCollateralPercent}%`,
            parseNumberForView(safetyBufferQty.toFixed(6))
          )}

          {/* Loan Disbursement Amount */}
          {renderRow(
            t("loan.loan_disbursement_amount_usdt"),
            parseNumberForView(loanDisbursementAmount.toFixed(6))
          )}

          {/* Precautions Section */}
          <View className="flex-row mt-9 items-center gap-2 mb-3">
            <Text className="text-base font-medium leading-[22px] text-white">
              ※ {t("loan.precautions_for_loan") || "Precautions for Loan"}
            </Text>
          </View>

          <View className="bg-black-1200 rounded-[15px] p-6 mb-6">
            <View className="ml-5">
              <Text className="text-[15px] font-medium leading-5 text-gray-1200 mb-3">
                {t("loan.price_refresh_notice") ||
                  "The price is refreshed every minute based on real-time market price fluctuations."}
              </Text>
              <View className="flex-row justify-end">
                <View className="flex-row items-center gap-2 h-7 px-2.5 rounded-full border border-gray-700 bg-black-1100">
                  <Text className="text-gray-200 text-xs">
                    {String(Math.floor(refreshTimer / 60)).padStart(2, "0")}:
                    {String(refreshTimer % 60).padStart(2, "0")}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className="h-[44px] rounded-xl bg-blue-1100 border border-blue-1100 items-center justify-center mb-6"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">
                {t("loan.loan_application") || "Loan application"}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>

      <InfoAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        text={alertText}
        type={alertType}
      />
    </View>
  );
};

export default LoanApplication;
