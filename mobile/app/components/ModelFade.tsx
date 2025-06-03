import React from 'react';
import { Modal, View } from 'react-native';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
}

const PopupModalFade = ({ visible, setVisible, children}: Props) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View className="flex-1 justify-center bg-black/60 px-4">
        <View className="bg-[#191919] rounded-3xl pt-7 pb-5">
         

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default PopupModalFade;
