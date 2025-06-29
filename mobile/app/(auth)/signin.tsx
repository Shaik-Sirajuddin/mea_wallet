import EyeIcon from "@/assets/images/eye-icon.svg";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "@/hooks/useAuth";
import utils from "@/utils";
import InfoAlert from "../components/InfoAlert";
import storage from "@/storage";
import { STORAGE_KEYS } from "@/storage/keys";

enum ErrorType {
  INVALID_EMAIL,
  INVALID_PASSWORD,
}
const Signin: React.FC = () => {
  const [email, setEmail] = useState("test");
  const [password, setPassword] = useState("Testtest");
  const [showPassword, setShowPassword] = useState(false);

  // Validation state
  const [inputError, setInputError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);
  const [popUpVisible, setPopUpVisible] = useState(false);

  const validateForm = () => {
    // Email validation
    if (!email) {
      setInputError("Email is required");
      setErrorType(ErrorType.INVALID_EMAIL);
      return;
    }
    // if (!utils.validateEmail(email)) {
    //   setInputError("Please enter a valid email");
    //   setErrorType(ErrorType.INVALID_EMAIL);
    //   return;
    // }

    if (!password) {
      setErrorType(ErrorType.INVALID_PASSWORD);
      setInputError("Password is required");
      return;
    }
    // if (password.length < 6) {
    //   setErrorType(ErrorType.INVALID_PASSWORD);
    //   setInputError("Password must be at least 6 characters");
    //   return;
    // }
    return true;
  };
  const handleSignIn = async () => {
    if (!validateForm()) {
      return;
    }
    let result = await useAuth.login(email, password);
    //sign up failed
    if (typeof result === "string") {
      Alert.alert("Login Error", result);
      return;
    }
    await storage.save(STORAGE_KEYS.AUTH.TOKEN, result.token);
    router.push("/success-page");
  };

  useEffect(() => {
    if (inputError) {
      setPopUpVisible(true);
    }
  }, [inputError]);

  return (
    <View className="flex-1 bg-black-1000">
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

            {/* <Logo width={125} height={30} /> */}
          </View>

          <View className="flex-row items-center gap-4 mt-12">
            <TouchableOpacity>
              <Text className="text-xl font-semibold text-white">Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/signup")}>
              <Text className="text-xl font-semibold text-gray-400">
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
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (inputError && errorType === ErrorType.INVALID_EMAIL) {
                  setInputError(null);
                }
              }}
              placeholder="Enter Email Address"
              placeholderTextColor="#FFFFFF"
              className="text-[17px] text-white font-medium px-8 bg-black-1200 w-full h-[71px] rounded-[15px]"
              keyboardType="email-address"
              autoCapitalize="none"
            />
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
                  if (inputError && errorType === ErrorType.INVALID_PASSWORD) {
                    setInputError(null);
                  }
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
          </View>
        </View>

        {/* Bottom Links */}
        <View className="items-center mt-6">
          <PrimaryButton
            onPress={handleSignIn}
            className="mb-[9px] w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
            text="Sign In"
            disabled={inputError !== null}
          />
          <View className="mt-5 mb-4">
            <Link href="/forget-password">
              <Text className="text-[15px] text-gray-400">Forgot Password</Text>
            </Link>
          </View>
          <View>
            <TouchableOpacity onPress={() => router.replace("/signup")}>
              <Text className="text-[15px] text-pink-1100">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <InfoAlert
        visible={popUpVisible}
        setVisible={setPopUpVisible}
        text={inputError ?? ""}
      />
    </View>
  );
};

export default Signin;
