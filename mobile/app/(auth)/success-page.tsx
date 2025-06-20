import { Link, router } from "expo-router";
import { Image, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const SuccessPage = () => {
  return (
    <View className="flex-1 h-full bg-black-1000 items-center justify-center">
      <View className=" rounded-[15px] min-h-[451px] max-w-5xl flex-col items-center justify-end p-5 gap-[88px]">
        <View className="items-center mb-5">
          <View className="mb-5">
            <Image source={require("../../assets/images/sparkle-img.png")} />
          </View>
          <Text className=" text-[28px] my-3 font-semibold leading-[22px] text-white text-center">
            We're all set!
          </Text>
          <Text className="text-xl font-semibold leading-[22px] text-gray-1200 text-center">
            The wallet is now fully available.
          </Text>
        </View>
        <View className="w-full flex">
          <Link href="/(Tabs)/home">
            <PrimaryButton
              text="Start"
              onPress={() => {
                router.replace("/(Tabs)/home");
              }}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SuccessPage;
