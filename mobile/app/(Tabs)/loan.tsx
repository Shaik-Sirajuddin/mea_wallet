import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import useLoan from "@/hooks/api/useLoan";
import InfoAlert from "@/app/components/InfoAlert";

const LoanTab = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    checkLoanLimit();
  }, []);

  const checkLoanLimit = async () => {
    setLoading(true);
    const result = await useLoan.getLoanLimit();

    if (typeof result === "string") {
      // Error occurred
      setAlertText(t("common.error_occurred") || "An error occurred");
      setAlertVisible(true);
      setLoading(false);
      return;
    }

    // Check if user already has a loan
    if (result.loan_count > 0) {
      setAlertText(
        t("loan.already_applying") || "I'm already applying for a loan."
      );
      setAlertVisible(true);
      setLoading(false);
      return;
    }

    // Check if loan limit is available
    if (result.loanMax === "Y") {
      // Redirect to loan application page
      router.push("/loan/application");
    } else {
      setAlertText(t("loan.limit_exceeded") || "Loan limit has been exceeded");
      setAlertVisible(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black-1000 items-center justify-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black-1000">
      <InfoAlert
        visible={alertVisible}
        setVisible={(visible) => {
          setAlertVisible(visible);
          if (!visible) {
            router.back();
          }
        }}
        text={alertText}
        type="error"
      />
    </View>
  );
};

export default LoanTab;
