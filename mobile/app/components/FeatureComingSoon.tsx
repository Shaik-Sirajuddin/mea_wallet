import SvgIcon from "./SvgIcon";
import { Pressable, View, Text } from "react-native";
export const FeatureComingSoon = () => {
  return (
    <View className="w-full h-full">
      <Text className="font-bold px-8 text-xl text-center text-white my-auto">
        You are on waitlist {"\n"} {"\n"}
        This Features are not available for your platform yet
      </Text>
    </View>
  );
};

export default FeatureComingSoon;
