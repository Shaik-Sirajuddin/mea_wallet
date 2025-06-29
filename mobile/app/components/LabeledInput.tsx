import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import EyeIcon from "@/assets/images/eye-icon.svg";

interface LabeledInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  isSecure?: boolean;
  errorText?: string | null;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  onChangeText,
  required = false,
  isSecure = false,
  errorText,
  ...rest
}) => {
  const [showSecure, setShowSecure] = useState(false);

  return (
    <View className="mb-4">
      <View className="flex-row items-center gap-2 mb-2">
        <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
        <Text className="text-base font-medium text-white">
          {label} {required && <Text className="text-pink-1200">*</Text>}
        </Text>
      </View>

      <View className="relative">
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure && !showSecure}
          placeholder={`Enter ${label}`}
          placeholderTextColor="#FFFFFF"
          className="text-[17px] text-white font-medium pl-8 pr-14 bg-black-1200 w-full h-[71px] rounded-[15px]"
        />
        {isSecure && (
          <TouchableOpacity
            onPress={() => setShowSecure(!showSecure)}
            className="absolute p-2 top-1/2 right-4 -translate-y-1/2"
          >
            <EyeIcon />
          </TouchableOpacity>
        )}
      </View>

      {errorText ? (
        <Text className="text-red-500 text-sm mt-1 ml-2">{errorText}</Text>
      ) : null}
    </View>
  );
};

export default LabeledInput;
