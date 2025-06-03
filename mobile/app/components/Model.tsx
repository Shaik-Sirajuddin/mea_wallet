import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import SvgIcon from './SvgIcon';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
  animationType?: "slide" | "none" | "fade";
}

const PopupModal = ({ visible, setVisible, children, animationType="slide"}: Props) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType}
      onRequestClose={() => setVisible(false)}
    >
      <View className="flex-1 justify-end bg-black/60 ">
        <View className="bg-[#191919] rounded-t-[32px] pt-[27px] px-4 pb-16 text-center">
          <Pressable
            onPress={() => setVisible(false)}
            className="p-2 -mt-1 mb-8 mr-2 justify-end items-end"
            android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
          >
            <SvgIcon name="crossIcon" width="12" height="12" />
          </Pressable>

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;
