import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { TokenQuotes } from "@/src/types/balance";

const TokenActions = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const { symbol } = useLocalSearchParams<{ symbol: keyof TokenQuotes }>();

  const buttons = useMemo(() => {
    if (symbol === "usdt_savings") {
      return [{ label: t("token_actions.transfer"), url: "/deposit-view" }];
    } else {
      return [
        { label: t("token_actions.deposit"), url: "/deposit-view" },
        { label: t("token_actions.withdrawal"), url: "/withdrawal-view" },
        { label: t("token_actions.history"), url: "/asset-history" },
      ];
    }
  }, [symbol]);
  const normalizePath = (path: string) => path.replace(/\/$/, "");

  // useEffect(() => {
  //   router.push({
  //     pathname: "/withdrawal-view",
  //     params: {
  //       symbol,
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   router.push({
  //     pathname: "/withdrawal-view",
  //     params: {
  //       symbol,
  //     },
  //   });
  // }, []);
  return (
    <View className="bg-black-1000 flex-1">
      <View className="relative">
        {buttons.map((btn, index) => {
          const isActive = normalizePath(pathname) === normalizePath(btn.url);
          return (
            <Pressable
              key={index}
              onPress={() =>
                router.push({
                  pathname: btn.url as any,
                  params: {
                    symbol,
                  },
                })
              }
              onPressIn={() => setPressedIndex(index)}
              onPressOut={() => setPressedIndex(null)}
              className={` flex items-center justify-center w-full py-4 mb-2 rounded-[15px] transition-all duration-500 ${
                isActive || pressedIndex === index
                  ? "bg-pink-1100"
                  : "bg-black-1200"
              }`}
            >
              <Text className="text-white text-base font-semibold">
                {btn.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TokenActions;
