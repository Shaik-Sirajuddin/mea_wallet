import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import SvgIcon from "@/app/components/SvgIcon";
import LabelInput from "@/app/components/LabeledInput";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import useAuth from "@/hooks/useAuth";
import OtpModal from "@/app/components/OTPModal";

enum ErrorType {
  CURRENT_PASSWORD,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
}

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [inputError, setInputError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const navigation = useNavigation();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});

  //otp modal
  const [otpModalVisible, setOTPModalVisible] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const validateForm = () => {
    if (!currentPassword) {
      setInputError("Current password is required");
      setErrorType(ErrorType.CURRENT_PASSWORD);
      return false;
    }
    if (!newPassword) {
      setInputError("New password is required");
      setErrorType(ErrorType.NEW_PASSWORD);
      return false;
    }
    if (newPassword.length < 6) {
      setInputError("Password must be at least 6 characters");
      setErrorType(ErrorType.NEW_PASSWORD);
      return false;
    }
    if (!confirmPassword) {
      setInputError("Please confirm your password");
      setErrorType(ErrorType.CONFIRM_PASSWORD);
      return false;
    }
    if (confirmPassword !== newPassword) {
      setInputError("Passwords do not match");
      setErrorType(ErrorType.CONFIRM_PASSWORD);
      return false;
    }
    return true;
  };

  const handleOTPSubmit = async (otp: string | null) => {
    setOTPModalVisible(false);
    if (!otp || otp.length < 6) {
      setModalState({
        ...modalState,
        text: "TwoFA Failed!",
        type: "error",
      });
      setPopUpVisible(true);
      return;
    }
    let result = await useAuth.changePassword(
      currentPassword,
      newPassword,
      otp
    );
    console.log("result here" , result)
    if (typeof result === "string") {
      setModalState({
        ...modalState,
        text: result,
        type: "error",
      });
      setPopUpVisible(true);
      return;
    }
    //show success text
    setModalState({
      ...modalState,
      text: "Password Change Successfully",
      type: "success",
    });
    setPopUpVisible(true);
    setPasswordUpdated(true)
  };
  const handleChangePassword = async () => {
    if (!validateForm()) return;
    // Implement API call or update logic here
    setOTPModalVisible(true);
  };


  return (
    <View className="flex-1 bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto pt-8 pb-10 justify-between">
        <View>
          <View className="items-center">
            <Pressable
              className="absolute left-0 top-2"
              onPress={() => navigation.goBack()}
            >
              <SvgIcon name="leftArrow" width="21" height="21" />
            </Pressable>
            <Text className="text-lg font-semibold text-white">Password</Text>
          </View>

          <View className="mt-10 mb-2">
            {/* Old Password Field */}
            <LabelInput
              label="Password"
              required
              isSecure
              value={currentPassword}
              onChangeText={(text) => {
                setCurrentPassword(text);
                if (inputError && errorType === ErrorType.CURRENT_PASSWORD) {
                  setInputError(null);
                  setErrorType(null);
                }
              }}
              placeholder="Enter Password"
              errorText={
                inputError && errorType === ErrorType.CURRENT_PASSWORD
                  ? inputError
                  : undefined
              }
            />

            {/* New Password Field */}
            <LabelInput
              label="Password to change"
              required
              isSecure
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                if (inputError && errorType === ErrorType.NEW_PASSWORD) {
                  setInputError(null);
                  setErrorType(null);
                }
              }}
              placeholder="Enter Password to change"
              errorText={
                inputError && errorType === ErrorType.NEW_PASSWORD
                  ? inputError
                  : undefined
              }
            />

            {/* Confirm Password Field */}
            <LabelInput
              label="Verify password"
              required
              isSecure
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (inputError && errorType === ErrorType.CONFIRM_PASSWORD) {
                  setInputError(null);
                  setErrorType(null);
                }
              }}
              placeholder="Confirm Password"
              errorText={
                inputError && errorType === ErrorType.CONFIRM_PASSWORD
                  ? inputError
                  : undefined
              }
            />
          </View>
        </View>

        {/* Bottom Button */}
        <View className="items-center mt-6">
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleChangePassword}
            className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
          >
            <Text className="text-base group-active:text-pink-1100 text-white font-semibold">
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <InfoAlert
        {...modalState}
        visible={popUpVisible}
        setVisible={setPopUpVisible}
        onDismiss={() => {
          if (passwordUpdated) {
            router.back();
          }
        }}
      />
      <OtpModal visible={otpModalVisible} onClose={handleOTPSubmit} />
    </View>
  );
};

export default ChangePassword;
