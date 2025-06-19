import EyeIcon from "@/assets/images/eye-icon.svg";
import InforIcon from "@/assets/images/info-icon.svg";
import Logo from "@/assets/images/logo-small.svg";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PopupModalFade from "../components/InfoAlert";
import { isValidPublicKey } from "@/utils/web3";
import useAuth from "@/hooks/useAuth";
import PrimaryButton from "../components/PrimaryButton";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

enum ErrorType {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_ADDRESS,
  MISMATCH_PASSWORD,
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [checkEmailPopup, setCheckEmailPopup] = useState(false);
  const [checkWalletPopup, setCheckWalletPopup] = useState(false);

  // Validation state
  const [inputError, setInputError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const validateForm = () => {
    // Email validation
    if (!email) {
      setInputError("Email is required");
      setErrorType(ErrorType.INVALID_EMAIL);
      return;
    }
    if (!validateEmail(email)) {
      setInputError("Please enter a valid email");
      setErrorType(ErrorType.INVALID_EMAIL);
      return;
    }

    // Wallet Validation
    if (!wallet) {
      setInputError("Wallet is required");
      setErrorType(ErrorType.INVALID_ADDRESS);
      return;
    }
    if (!isValidPublicKey(wallet)) {
      setInputError("Invalid PublicKey");
      setErrorType(ErrorType.INVALID_ADDRESS);
      return;
    }

    // Password validation
    if (!password) {
      setErrorType(ErrorType.INVALID_PASSWORD);
      setInputError("Password is required");
      return;
    }
    if (password.length < 6) {
      setErrorType(ErrorType.INVALID_PASSWORD);
      setInputError("Password must be at least 6 characters");
      return;
    }

    if (password !== verifyPassword) {
      setErrorType(ErrorType.MISMATCH_PASSWORD);
      setInputError("Password mismatch");
      return;
    }
    return true;
  };
  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    let result = await useAuth.signUp(email, password);
    //sign up failed
    if (typeof result === "string") {
      Alert.alert("SignUp Error", result);
      return;
    }
    //save data to database
    Alert.alert("Register Successfully...");
    router.push("/success-page");
  };
  useEffect(() => {
    if (inputError) {
      Alert.alert("Invalid Input", inputError);
    }
  }, [inputError]);

  useEffect(() => {
    if (inputError && errorType === ErrorType.INVALID_EMAIL) {
      setInputError(null);
    }
  }, [email]);
  useEffect(() => {
    if (inputError && errorType === ErrorType.INVALID_PASSWORD) {
      setInputError(null);
    }
  }, [password]);
  useEffect(() => {
    if (inputError && errorType === ErrorType.MISMATCH_PASSWORD) {
      setInputError(null);
    }
  }, [verifyPassword]);
  useEffect(() => {
    if (inputError && errorType === ErrorType.INVALID_ADDRESS) {
      setInputError(null);
    }
  }, [wallet]);
  return (
    <View className="flex-1 bg-black-1000">
      <View className="w-full h-full max-w-5xl mx-auto justify-between">
        <ScrollView className="flex-1 px-4 pt-8 pb-10">
          <View>
            <View className="items-center">
              <Logo width={125} height={30} />
            </View>

            <View className="flex-row items-center gap-4 mt-12">
              <TouchableOpacity onPress={() => router.replace("/signin")}>
                <Text className="text-xl font-semibold text-gray-400">
                  Sign In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.replace("/signup")}>
                <Text className="text-xl font-semibold text-white">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Email Field */}
            <View className="mt-3 mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Email Address <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="w-full relative">
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  placeholder="Enter Email Address"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-28 bg-black-1200 w-full h-[71px] rounded-[15px]"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {/* <TouchableOpacity
                  onPress={() => {
                    setCheckEmailPopup(true);
                  }}
                  className="text-white block font-medium leading-[22px] py-1 px-3 bg-pink-1100 absolute top-1/2 -translate-y-1/2 right-4 rounded-2xl"
                >
                  <Text className="text-white text-[17px]">Check</Text>
                </TouchableOpacity> */}
              </View>
              {inputError && errorType === ErrorType.INVALID_EMAIL ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {inputError}
                </Text>
              ) : null}
            </View>

            {/* Password Field */}
            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Password <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  secureTextEntry={!showPassword}
                  placeholder="Enter Password"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-14 bg-black-1200 w-full h-[71px] rounded-[15px]"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="absolute p-2 top-1/2 right-4 -translate-y-1/2"
                >
                  <EyeIcon />
                </TouchableOpacity>
              </View>
              {inputError && errorType === ErrorType.INVALID_PASSWORD ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {inputError}
                </Text>
              ) : null}
              <Text className="text-[15px] mt-2 font-medium leading-[22px] text-gray-1200 px-8">
                Including lowercase letters, numbers, and special characters, 4
                to 15 characters.
              </Text>
            </View>

            {/* Match Password Field */}
            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Verify password <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  value={verifyPassword}
                  onChangeText={(text) => {
                    setVerifyPassword(text);
                  }}
                  secureTextEntry={!showVerifyPassword}
                  placeholder="Enter Password"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-14 bg-black-1200 w-full h-[71px] rounded-[15px]"
                />
                <TouchableOpacity
                  onPress={() => setShowVerifyPassword((prev) => !prev)}
                  className="absolute p-2 top-1/2 right-4 -translate-y-1/2"
                >
                  <EyeIcon />
                </TouchableOpacity>
              </View>
              {inputError && errorType === ErrorType.MISMATCH_PASSWORD ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {inputError}
                </Text>
              ) : null}
            </View>

            {/* Wallet Field */}
            <View className="mt-3 mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Wallet Address <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="w-full relative">
                <TextInput
                  value={wallet}
                  onChangeText={(text) => {
                    setWallet(text);
                  }}
                  placeholder="Wallet Address"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-8 bg-black-1200 w-full h-[71px] rounded-[15px]"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {/* <TouchableOpacity
                  onPress={() => {
                    setCheckWalletPopup(true);
                  }}
                  className="text-white block font-medium leading-[22px] py-1 px-3 bg-pink-1100 absolute top-1/2 -translate-y-1/2 right-4 rounded-2xl"
                >
                  <Text className="text-white text-[17px]">Check</Text>
                </TouchableOpacity> */}
              </View>

              {inputError && errorType === ErrorType.INVALID_ADDRESS ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {inputError}
                </Text>
              ) : null}

              <Text className="text-[15px] mt-2 font-medium leading-[22px] text-gray-1200 px-8">
                Please enter your Solana network wallet address.
              </Text>
            </View>

            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <InforIcon />
                <Text className="text-base font-medium leading-[22px] text-white">
                  Terms of Use <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="relative mb-2">
                <TextInput
                  multiline
                  numberOfLines={5}
                  className="text-[17px] text-white font-medium placeholder:text-white px-8 py-4 bg-black-1200 w-full h-[136px] rounded-[15px]"
                  placeholder=""
                  placeholderTextColor="#FFFFFF"
                  style={{ textAlignVertical: "top" }}
                />
              </View>
            </View>
            <View className="flex mb-4 ml-6 gap-3">
              <Checkbox
                value="terms"
                isChecked={agreedToTerms}
                onChange={(isSelected) => setAgreedToTerms(isSelected)}
                size="md"
                isInvalid={false}
                isDisabled={false}
                className=" outline-none border-none"
              >
                <CheckboxIndicator className="!bg-slate-50 !outline-none !border-none">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel className="text-[15px] ml-2 font-medium leading-[22px] !text-gray-1200">
                  I agree to the Terms of Use.
                </CheckboxLabel>
              </Checkbox>
            </View>

            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <InforIcon />
                <Text className="text-base font-medium leading-[22px] text-white">
                  Privacy Policy <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="relative mb-2">
                <TextInput
                  multiline
                  numberOfLines={5}
                  className="text-[17px] text-white font-medium placeholder:text-white px-8 py-4 bg-black-1200 w-full h-[136px] rounded-[15px]"
                  placeholder=""
                  placeholderTextColor="#FFFFFF"
                  style={{ textAlignVertical: "top" }}
                />
              </View>

              <View className="flex mb-4 ml-6 gap-3">
                <Checkbox
                  value="privacy"
                  isChecked={agreedToPrivacy}
                  onChange={(isSelected) => setAgreedToPrivacy(isSelected)}
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                  className=" outline-none border-none"
                >
                  <CheckboxIndicator className="!bg-slate-50 !outline-none !border-none">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-[15px] ml-2 font-medium leading-[22px] !text-gray-1200">
                    I agree to the Terms of Use.
                  </CheckboxLabel>
                </Checkbox>
              </View>
            </View>
          </View>

          {/* Bottom Links */}
          <View className="items-center mt-6 mb-16">
            <PrimaryButton
              onPress={handleSignup}
              className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
              text="Sign Up"
              disabled={inputError !== null}
            />
          </View>
        </ScrollView>
      </View>
      <PopupModalFade visible={checkEmailPopup} setVisible={setCheckEmailPopup}>
        <View className="px-4">
          <Text className="text-[17px] text-center text-white">
            Wrong approach!
          </Text>
          <Text className="text-[17px] text-center text-white mb-4">
            Please check your Email Address
          </Text>
          <Pressable
            className="text-center group  py-2.5 bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center active:bg-transparent active:text-pink-1100 hover:text-pink-1100 hover:bg-transparent"
            onPress={() => setCheckEmailPopup(false)}
          >
            <Text className="text-base text-white group-active:text-pink-1100 font-semibold">
              Ok
            </Text>
          </Pressable>
        </View>
      </PopupModalFade>

      <PopupModalFade
        visible={checkWalletPopup}
        setVisible={setCheckWalletPopup}
      >
        <View className="px-4">
          <Text className="text-[17px] text-center text-white">
            Wrong approach!
          </Text>
          <Text className="text-[17px] text-center text-white mb-4">
            Please check your Wallet Address
          </Text>
          <Pressable
            className="text-center group  py-2.5 bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center active:bg-transparent active:text-pink-1100 hover:text-pink-1100 hover:bg-transparent"
            onPress={() => setCheckWalletPopup(false)}
          >
            <Text className="text-base text-white group-active:text-pink-1100 font-semibold">
              Ok
            </Text>
          </Pressable>
        </View>
      </PopupModalFade>
    </View>
  );
};

export default Signup;
