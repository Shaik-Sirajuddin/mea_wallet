import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import SvgIcon from "@/app/components/SvgIcon";
import InfoAlert from "@/app/components/InfoAlert";

interface PrincipalRepaymentPopupProps {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (otp: string) => Promise<void>;
  paymentAmount: string;
}

const PrincipalRepaymentPopup = ({
  visible,
  onDismiss,
  onSubmit,
  paymentAmount,
}: PrincipalRepaymentPopupProps) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleSubmit = async () => {
    if (!otp) return;

    setLoading(true);
    try {
      await onSubmit(otp);
      setAlertType("success");
      setAlertText(
        t("loan.principal_repay_success") || "Principal repayment successful"
      );
      setAlertVisible(true);
      setOtp("");
      setTimeout(() => {
        onDismiss();
      }, 100);
    } catch (error) {
      console.error(error);
      setAlertType("error");
      setAlertText(
        t("loan.principal_repay_failed") ||
          "Failed to process principal repayment"
      );
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onDismiss}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 bg-black/80 justify-center items-center px-4">
            <View className="bg-black-1200 w-[92%] max-w-md rounded-2xl border border-gray-800 p-5 shadow-xl">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-100">
                  {t("loan.principal_repayment") || "Principal Repayment"}
                </Text>
                <TouchableOpacity
                  onPress={onDismiss}
                  className="p-2 rounded-md hover:bg-black-1000"
                >
                  <SvgIcon name="crossIcon" width="18" height="18" color="#fff" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                  <Text className="text-sm text-gray-300 mb-1">
                    {t("loan.payment_amount") || "Payment Amount"}
                  </Text>
                  <TextInput
                    className="w-full rounded-lg border border-gray-700 bg-black-1000 px-3 py-2 text-white"
                    value={paymentAmount}
                    editable={false}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm text-gray-300 mb-1">
                    {t("common.title.google_otp_code") || "OTP CODE"}
                  </Text>
                  <TextInput
                    className="w-full rounded-lg border border-gray-700 bg-black-1000 px-3 py-2 text-white"
                    placeholder=""
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={setOtp}
                    maxLength={6}
                  />
                </View>

                <View className="mt-5 flex-row items-center gap-2">
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    className="flex-1 h-[42px] items-center justify-center rounded-lg border border-pink-1100 bg-pink-1100"
                  >
                    {loading ? (
                      <ActivityIndicator color="white" size="small" />
                    ) : (
                      <Text className="text-white font-semibold">
                        {t("loan.repay") || "Repay"}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onDismiss}
                    disabled={loading}
                    className="flex-1 h-[42px] items-center justify-center rounded-lg border border-gray-700 bg-transparent"
                  >
                    <Text className="text-gray-200 font-semibold">
                      {t("common.cancel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <InfoAlert
        visible={alertVisible}
        setVisible={setAlertVisible}
        text={alertText}
        type={alertType}
      />
    </>
  );
};

export default PrincipalRepaymentPopup;
