import { RootState } from "@/src/store";
import { TokenQuotes } from "@/src/types/balance";
import {
  parseNumberForView,
  tokenImageMap,
  trimTrailingZeros,
} from "@/utils/ui";
import Decimal from "decimal.js";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";

const TokenPreview = ({
  token,
  amount,
}: {
  token: keyof TokenQuotes;
  amount: string;
}) => {
  const quote = useSelector((state: RootState) => state.token.quotes[token]);

  const getPrice = (token: string) => {
    return parseNumberForView(quote);
  };
  const getTokensValue = (token: string, balance: string) => {
    return trimTrailingZeros(new Decimal(quote).mul(balance).toFixed(2));
  };

  const getTokenImage = (token: string) => {
    const key = token.toLowerCase();
    return tokenImageMap[key] || require("@/assets/images/coin-img.png");
  };

  return (
    <View className="border-2 mb-2 border-black-1200 bg-black-1200 rounded-2xl flex-row items-center justify-between py-[13px] px-3">
      <View className="flex-row items-center gap-[11px]">
        <Image
          source={getTokenImage(token)}
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="text-[17px] font-medium leading-5 text-white">
            {token.toUpperCase()}
          </Text>
          <Text className="text-[15px] font-normal leading-5 text-gray-1200">
            {parseNumberForView(amount)} {token.toUpperCase()}
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-[17px] font-medium leading-5 text-white text-right">
          ${getTokensValue(token, amount)}
        </Text>
        <Text className="text-[15px] font-normal leading-5 text-gray-1200 text-right">
          ${getPrice(token)}
        </Text>
      </View>
    </View>
  );
};

export default TokenPreview;
