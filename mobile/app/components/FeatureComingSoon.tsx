import SvgIcon from "./SvgIcon";
import { Pressable, View, Text } from "react-native";
export const FeatureComingSoon = () => {
  return (
    <View className="w-full h-full">
      <Text className="font-bold text-xl text-center text-white my-auto">
        You are on waitlist <br />
        This Features are not available for your platform yet
      </Text>
    </View>
  );
};

export default FeatureComingSoon;
