import SvgIcon from "./SvgIcon";
import { Pressable, View } from "react-native";
import { useNavigation } from "expo-router";
export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      className="absolute left-0 flex items-start justify-start p-6"
      onPress={() => navigation.goBack()}
    >
      <View className="absolute top-2">
        <SvgIcon name="leftArrow" width="21" height="21" />
      </View>
    </Pressable>
  );
};
