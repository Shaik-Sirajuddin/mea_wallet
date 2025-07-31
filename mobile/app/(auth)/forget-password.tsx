import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import SvgIcon from "../components/SvgIcon";
import utils from "@/utils/index";
import PrimaryButton from "../components/PrimaryButton";
import InfoAlert from "../components/InfoAlert";
import { useTranslation } from "react-i18next";

const ForgetPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [popupVisible, setPopUpVisible] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleForgotPassword = () => {
    if (!email) {
      setEmailError(t("auth.forgot_password.email_required"));
      return;
    } else if (!utils.validateEmail(email)) {
      setEmailError(t("auth.forgot_password.invalid_email"));
      return;
    }
    setPopUpVisible(true);
  };

  return (
    <>
      <View className="flex-1 bg-black-1000 items-center justify-center">
        <View className="w-full h-full max-w-5xl mx-auto px-4 pt-8 pb-10 justify-between">
          <View>
            <View className="items-center">
              <View
                style={{
                  width: 77,
                  height: 38,
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "contain",
                  }}
                  source={require("../../assets/images/logo.png")}
                />
              </View>
            </View>

            <Text className="text-xl font-semibold text-white mt-12">
              {t("auth.forgot_password.title")}
            </Text>

            {/* Email Field */}
            <View className="mt-3 mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  {t("auth.forgot_password.enter_email")}{" "}
                  <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError(null);
                }}
                placeholder={t("auth.forgot_password.placeholder_email")}
                placeholderTextColor="#6b7280"
                className="text-[17px] placeholder:text-gray-500 text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {emailError}
                </Text>
              ) : null}
            </View>

            <View className="w-full">
              <View className="flex flex-row items-center gap-2 mb-3">
                <SvgIcon name="infoIcon" />
                <Text className="text-base font-medium leading-[22px] text-white">
                  {t("auth.forgot_password.notice_title")}
                </Text>
              </View>

              <View className="py-6 px-8 bg-black-1200 rounded-[15px] w-full">
                <Text className="text-[17px] font-medium text-white">
                  {t("auth.forgot_password.notice_desc")}
                </Text>
              </View>
            </View>
          </View>

          <View className="items-center mt-6">
            <PrimaryButton
              onPress={handleForgotPassword}
              className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
              text={t("auth.forgot_password.confirm")}
              disabled={emailError !== null}
            />
            <View className="mt-4 mb-4">
              <TouchableOpacity onPress={() => router.replace("/signin")}>
                <Text className="text-[15px] text-gray-400">
                  {t("auth.forgot_password.signin")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => router.replace("/signup")}>
                <Text className="text-[15px] text-pink-1100">
                  {t("auth.forgot_password.signup")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <InfoAlert
        visible={popupVisible}
        setVisible={setPopUpVisible}
        text={t("auth.forgot_password.reset_link_sent")}
      />
    </>
  );
};

export default ForgetPassword;
