import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import SvgIcon from "../components/SvgIcon";
import { LockupHistoryItem } from "@/src/api/types/lockup";
import useAsset from "@/hooks/useAsset";
import InfoAlert, { InfoAlertProps } from "../components/InfoAlert";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { TokenBalances } from "@/src/types/balance";
import { BackButton } from "../components/BackButton";

const LockUpHistory = () => {
  const { t } = useTranslation();
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const lockedBalance = useSelector(
    (state: RootState) =>
      state.balance.lockup[symbol as keyof Omit<TokenBalances, "sol">]
  );
  const displaySymbol = useMemo(() => {
    return symbol.toUpperCase();
  }, [symbol]);
  const [history, setHistory] = useState<LockupHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalBlock, setTotalBlock] = useState(0);

  const [infoAlertVisible, setInfoAlertVisible] = useState(false);
  const [infoAlertState, setInfoAlertState] = useState<Partial<InfoAlertProps>>(
    {}
  );

  const fetchHistory = async () => {
    console.log("symbol here", symbol);
    if (!symbol) return;

    setLoading(true);
    const res = await useAsset.getLockupHistory(symbol.toUpperCase(), page);

    if (typeof res === "string") {
      setInfoAlertState({
        type: "error",
        text: res,
      });
      setInfoAlertVisible(true);
      return;
    }
    setHistory(res.items);
    setTotalBlock(res.totalBlock);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [page, symbol]);

  useEffect(() => {
    let minCloseTime: Date | null = null;
    for (let lockup of history) {
      if (minCloseTime === null) {
        minCloseTime = lockup.endDate;
      } else {
        if (minCloseTime.getTime() > lockup.endDate.getTime()) {
          minCloseTime = lockup.endDate;
        }
      }
    }
    if (minCloseTime === null) {
      return;
    }
    let intervalId = setInterval(() => {
      console.log("auto close called");
      useAsset.autoCloseLockUp();
    }, Date.now() - minCloseTime.getTime());
    return () => clearInterval(intervalId);
  }, [history]);

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full h-full mx-auto">
        <ScrollView>
          <View className="w-full">
            <View className="items-center relative ">
              <BackButton />

              <Text className="text-lg font-semibold text-white">
                {t("lockup.title")}
              </Text>
            </View>

            <View
              style={{
                minHeight: "65%",
              }}
              className="relative mt-10 flex flex-col justify-between"
            >
              <View>
                <View className="flex flex-row items-center gap-2 mb-3">
                  <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
                  <Text className="text-base font-medium leading-[22px] text-white">
                    {t("lockup.history")}
                  </Text>
                </View>
              </View>
              <View className="flex items-center justify-center text-center px-8 bg-black-1200 w-full h-[71px] rounded-[15px] mb-6">
                <Text className="text-white font-medium text-[15px]">
                  {lockedBalance}{" "}
                  <Text className="text-gray-1200">{displaySymbol}</Text>
                </Text>
              </View>
              <View className="flex-1 flex justify-center mb-6">
                {loading && (
                  <View className="py-10 items-center">
                    <ActivityIndicator color="white" />
                  </View>
                )}

                {!loading && history.length === 0 && (
                  <Text className="text-white text-center py-10">
                    {t("lockup.no_history")}
                  </Text>
                )}

                {!loading && history.length !== 0 && (
                  <Text className="text-white text-center">
                    {t("lockup.activity_details")}
                  </Text>
                )}
              </View>

              <View className="">
                {!loading &&
                  history.map((item, index) => (
                    <View key={index} className="mb-4">
                      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                        <Text className="text-[17px] font-medium text-gray-1200">
                          {t("lockup.date")}
                        </Text>
                        <Text className="text-[17px] font-medium text-white">
                          {new Date(item.registeredAt).toLocaleString()}
                        </Text>
                      </View>
                      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                        <Text className="text-[17px] font-medium text-gray-1200">
                          {t("lockup.quantity")}
                        </Text>
                        <Text className="text-[17px] font-medium text-white">
                          {item.amount}
                        </Text>
                      </View>
                      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                        <Text className="text-[17px] font-medium text-gray-1200">
                          {t("lockup.start_date")}
                        </Text>
                        <Text className="text-[17px] font-medium text-white">
                          {item.startDate.toLocaleDateString()}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                        <Text className="text-[17px] font-medium text-gray-1200">
                          {t("lockup.end_date")}
                        </Text>
                        <Text className="text-[17px] font-medium text-white">
                          {item.endDate.toLocaleDateString()}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
                        <Text className="text-[17px] font-medium text-gray-1200">
                          {t("lockup.state")}
                        </Text>
                        <Text className="text-[17px] font-medium text-white">
                          {item.status}
                        </Text>
                      </View>
                      <View className="w-full h-[1px] bg-white mt-2"></View>
                    </View>
                  ))}
              </View>

              {/* Pagination */}
              <View className="flex flex-row items-center justify-center gap-4 mt-6">
                <TouchableOpacity
                  disabled={page <= 1}
                  onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="opacity-80"
                >
                  <SvgIcon name="leftArrow2" width="12" height="18" />
                </TouchableOpacity>

                <View className="w-7 h-7 p-0.5 rounded-full bg-black-1200 flex items-center justify-center">
                  <Text className="text-[17px] font-medium leading-[22px] text-gray-1200/70 text-center">
                    {page}
                  </Text>
                </View>

                <TouchableOpacity
                  disabled={history.length === 0 || page >= totalBlock}
                  onPress={() => setPage((prev) => prev + 1)}
                  className="opacity-80"
                >
                  <SvgIcon name="rightArrow" width="12" height="18" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Notice Section */}
            <View className="px-4">
              <View className="flex-row mt-9 items-center gap-2 mb-3">
                <SvgIcon name="infoIcon" />
                <Text className="text-base font-medium leading-[22px] text-white">
                  {t("lockup.notice")}
                </Text>
              </View>

              <View className="text-[17px] text-white py-10 font-medium px-6 bg-black-1200 w-full rounded-[15px]">
                <View className="ml-5 space-y-4">
                  <View className="flex-row">
                    <Text className="text-white mr-2">•</Text>
                    <Text className="text-[15px] font-medium leading-5 text-gray-1200 flex-1">
                      {t("lockup.notice_after_end_date")}
                    </Text>
                  </View>

                  <View className="flex-row">
                    <Text className="text-white mr-2">•</Text>
                    <Text className="text-[15px] font-medium leading-5 text-gray-1200 flex-1">
                      {t("lockup.notice_withdrawal_available")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <InfoAlert
        {...infoAlertState}
        visible={infoAlertVisible}
        setVisible={setInfoAlertVisible}
        onDismiss={() => {
          // Optionally refetch or handle dismiss logic here
        }}
      />
    </View>
  );
};

export default LockUpHistory;
