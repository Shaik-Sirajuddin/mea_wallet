import { BackButton } from "@/app/components/BackButton";
import DepositAddressList from "@/app/components/DepositAddressList";
import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import SvgIcon from "@/app/components/SvgIcon";
import useDeposit from "@/hooks/useDeposit";
import { setDepositAddresses } from "@/src/features/asset/depositSlice";
import { RootState } from "@/src/store";
import { useAppDispatch } from "@/src/store/hooks";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const WalletAddress = () => {
  const { t } = useTranslation();
  const registeredAddresses = useSelector(
    (store: RootState) => store.deposit.depositAddresses
  );
  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({
    text: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const addWalletAddress = async () => {
    let result = await useDeposit.registerAddress(newAddress);
    if (typeof result === "string") {
      //show error
      setModalState({
        ...modalState,
        type: "error",
        text: result,
      });
      setModalVisible(true);
      return;
    }
    setModalState({
      ...modalState,
      type: "success",
      text: t("settings.wallet_address_added"),
    });
    setModalVisible(true);
    syncWalletAddress();
  };
  const syncWalletAddress = async () => {
    let result = await useDeposit.getWalletAddresses();
    if (typeof result === "string") {
      //show error
      return;
    }
    dispatch(setDepositAddresses(result));
  };

  useEffect(() => {
    syncWalletAddress();
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ padding: 0 }}
      keyboardShouldPersistTaps="handled"
      className="bg-black-1000"
    >
      <View className="flex-1 bg-black-1000 h-full">
        <View className="w-full max-w-5xl mx-auto justify-between">
          <View className="items-center">
            <BackButton />
            <Text className="text-lg font-semibold text-white">
              {t("settings.wallet_address")}
            </Text>
          </View>

          <View className="mt-10 mb-2">
            <View className="w-full">
              {/* QR Code */}
              <View className="items-center">
                <Image
                  source={require("@/assets/images/qr-code2.png")}
                  className="max-w-[390px]"
                  resizeMode="contain"
                />
              </View>

              {/* Input with Copy Button */}
              <View className="relative my-8">
                <TextInput
                  placeholder={t("settings.enter_wallet_address")}
                  placeholderTextColor="#FFFFFF"
                  className="text-base pr-20 text-white font-semibold px-4 border border-gray-1000 w-full  h-[53px] rounded-[6px]"
                  onChangeText={(text) => {
                    setNewAddress(text);
                  }}
                />
                <TouchableOpacity
                  onPress={addWalletAddress}
                  className="absolute top-1/2 -translate-y-1/2 right-3 bg-pink-1100 py-[5px] px-[8px] rounded-2xl"
                >
                  <Text className="text-white text-[14px] font-medium leading-[22px]">
                    {t("settings.add")}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Instruction List */}
              <View className="px-6">
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">1</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    {t("settings.wallet_address_instruction_1")}
                  </Text>
                </View>
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">2</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    {t("settings.wallet_address_instruction_2")}
                  </Text>
                </View>
                <View className="flex-row items-center mb-1 gap-2.5">
                  <View className="w-5 h-5 border border-white !rounded-full items-center justify-center">
                    <Text className="text-white flex text-xs">3</Text>
                  </View>
                  <Text className="text-[15px] font-normal leading-5 text-gray-1000">
                    {t("settings.wallet_address_instruction_3")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <DepositAddressList addresses={registeredAddresses} />
          {/* <View className="items-center mt-6">
          <TouchableOpacity
            activeOpacity={1}
            className="w-full h-[45px] group bg-pink-1100 border border-pink-1100 active:text-pink-1100 active:bg-transparent hover:text-pink-1100 hover:bg-transparent rounded-[15px] flex items-center justify-center"
          >
            <Text className="text-base group-active:text-pink-1100 font-semibold">
              Sharing Addresses
            </Text>
          </TouchableOpacity>
        </View> */}
        </View>
      </View>
      <InfoAlert
        {...modalState}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </ScrollView>
  );
};

export default WalletAddress;
