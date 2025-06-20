import SvgIcon from "@/app/components/SvgIcon";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const ContactForm = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const maxLength = 500;

  const handleSend = () => {
    if (message.trim() === "") return;
    // Your send logic here
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1  bg-black-1000 pt-8 pb-10"
    >
      <View className="items-center relative">
        <Pressable
          onPress={() => navigation.goBack()}
          className="absolute -left-2 top-0 z-10 p-2"
        >
          <SvgIcon name="leftArrow" width="21" height="21" />
        </Pressable>
        <Text className="text-lg font-semibold text-white">
          Customer Support
        </Text>
      </View>
      <View className="relative mt-6">
        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={maxLength}
          placeholder="Please enter your inquiry details"
          placeholderTextColor="rgba(136,136,136,0.5)"
          className="text-[15px] font-semibold leading-5 pt-10 text-gray-1200 rounded-2xl bg-black-1200 h-[286px] w-full text-center"
        />
        <View className="absolute bottom-4 right-4">
          <Text className="text-[15px] font-semibold leading-5 text-gray-1200/50">
            {message.length}/{maxLength}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={handleSend}
        disabled={message.trim() === ""}
        className={`mt-6 h-[45px] rounded-[15px] w-full items-center justify-center border transition-all duration-500 ${
          message.trim() === ""
            ? "bg-pink-1100/50 border-pink-1100/50"
            : "bg-pink-1100 border-pink-1100"
        }`}
      >
        {({ pressed }) => (
          <Text
            className={`text-base font-semibold ${
              pressed || message.trim() === "" ? "text-white/60" : "text-white"
            }`}
          >
            Send
          </Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default ContactForm;
