import React from "react";
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import SvgIcon from "./SvgIcon";
import PrimaryButton from "./PrimaryButton";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  text: string;
}

const InfoAlert = ({ visible, setVisible, text }: Props) => {
  return (
    <>
      {visible && (
        <View className="flex-1 flex items-center justify-center bg-[rgba(31,31,31,0.5)] px-3 absolute top-0 bottom-0 h-full w-full">
          <View className="bg-[#191919] rounded-[16px] px-4 pb-8 pt-10 text-center w-full">
            <View className="flex gap-4">
              <Text className="text-white text-center text-lg">{text}</Text>
              <PrimaryButton
                text="OK"
                onPress={() => {
                  setVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default InfoAlert;
