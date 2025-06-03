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
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PopupModalFade from "../components/ModelFade";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [checkEmailPopup, setCheckEmailPopup] = useState(false);
  const [checkWalletPopup, setCheckWalletPopup] = useState(false);

  // Validation state
  const [emailError, setEmailError] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSignup = () => {
    let valid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    } else {
      setEmailError(null);
    }

    // Wallet Validation
    if (!wallet) {
      setWalletError("Wallet is required");
      valid = false;
    } else {
      setEmailError(null);
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (true) {
      Alert.alert("Register Successfully...");
      router.push("/success-page");
      // Place your signup logic here
    }
  };

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
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="Enter Email Address"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-28 bg-black-1200 w-full h-[71px] rounded-[15px]"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => {
                    setCheckEmailPopup(true);
                  }}
                  className="text-white block font-medium leading-[22px] py-1 px-3 bg-pink-1100 absolute top-1/2 -translate-y-1/2 right-4 rounded-2xl"
                >
                  <Text className="text-white text-[17px]">Check</Text>
                </TouchableOpacity>
              </View>
              {emailError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {emailError}
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
                    if (passwordError) setPasswordError(null);
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
              {passwordError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {passwordError}
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
                  value={Cpassword}
                  onChangeText={(text) => {
                    setCPassword(text);
                    if (passwordError) setPasswordError(null);
                  }}
                  secureTextEntry={!showCPassword}
                  placeholder="Enter Password"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-14 bg-black-1200 w-full h-[71px] rounded-[15px]"
                />
                <TouchableOpacity
                  onPress={() => setShowCPassword((prev) => !prev)}
                  className="absolute p-2 top-1/2 right-4 -translate-y-1/2"
                >
                  <EyeIcon />
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {passwordError}
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
                    if (walletError) setWalletError(null);
                  }}
                  placeholder="Wallet Address"
                  placeholderTextColor="#FFFFFF"
                  className="text-[17px] text-white font-medium pl-8 pr-28 bg-black-1200 w-full h-[71px] rounded-[15px]"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => {
                    setCheckWalletPopup(true);
                  }}
                  className="text-white block font-medium leading-[22px] py-1 px-3 bg-pink-1100 absolute top-1/2 -translate-y-1/2 right-4 rounded-2xl"
                >
                  <Text className="text-white text-[17px]">Check</Text>
                </TouchableOpacity>
              </View>
              {emailError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {emailError}
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
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleSignup}
              className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
            >
              <Text className="text-base group-active:text-pink-1100 text-white font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
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
