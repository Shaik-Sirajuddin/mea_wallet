import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import SvgIcon from "../components/SvgIcon";
import { TokenQuotes } from "@/src/types/balance";

const TokenActionsView = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const { symbol } = useLocalSearchParams<{ symbol: keyof TokenQuotes }>();

  const buttons = [
    { label: t("token_actions.deposit"), url: "/deposit-view" },
    { label: t("token_actions.withdrawal"), url: "/withdrawal-view" },
    { label: t("token_actions.history"), url: "/asset-history" },
    { label: t("token_actions.chart"), url: "/chart-view" },
  ];

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
      <View className="w-full h-full max-w-5xl mx-auto  pb-10">
        <View className="items-center relative">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-2 z-10"
          >
            <SvgIcon name="leftArrow2" width="14" height="14" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">
            {t("token_actions.native")}
          </Text>
        </View>

        <View className="relative mt-10">
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
    </View>
  );
};

export default TokenActionsView;
