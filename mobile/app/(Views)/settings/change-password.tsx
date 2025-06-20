import SvgIcon from "@/app/components/SvgIcon";
import EyeIcon from "@/assets/images/eye-icon.svg";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleChangePassword = () => {
    let valid = true;

    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError("Current password is required");
      valid = false;
    } else {
      setCurrentPasswordError(null);
    }

    // Validate new password
    if (!newPassword) {
      setNewPasswordError("New password is required");
      valid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setNewPasswordError(null);
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (valid) {
      Alert.alert("Password Changed Successfully...");
      // Your logic here
    }
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
            {/*Old Password Field */}
            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Password <Text className="text-pink-1200">*</Text>
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  value={currentPassword}
                  onChangeText={(text) => {
                    setCurrentPassword(text);
                    if (currentPasswordError) setCurrentPasswordError(null);
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
              {currentPasswordError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {currentPasswordError}
                </Text>
              ) : null}
            </View>

            {/* New Password Field */}
            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Password to change<Text className="text-pink-1200"> *</Text>
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (newPasswordError) setNewPasswordError(null);
                  }}
                  secureTextEntry={!showPassword}
                  placeholder="Enter Password to change"
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
              {newPasswordError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {newPasswordError}
                </Text>
              ) : null}
              <Text className="text-[15px] text-gray-1200 font-medium px-10">
                Including lowercase letters, numbers, and special characters, 4
                to 15 characters.
              </Text>
            </View>

            {/* Match Password Field */}
            <View className="mb-2">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                <Text className="text-base font-medium text-white">
                  Verify password<Text className="text-pink-1200"> *</Text>
                </Text>
              </View>
              <View className="relative">
                <TextInput
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) setConfirmPasswordError(null);
                  }}
                  secureTextEntry={!showPassword}
                  placeholder="Enter Password to change"
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
              {confirmPasswordError ? (
                <Text className="text-red-500 text-xs mt-1 ml-2">
                  {confirmPasswordError}
                </Text>
              ) : null}
            </View>
          </View>
        </View>

        {/* Bottom Links */}
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
    </View>
  );
};

export default ChangePassword;
