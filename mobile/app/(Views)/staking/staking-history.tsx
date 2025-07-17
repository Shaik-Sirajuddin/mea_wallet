import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { router } from "expo-router";
import dayjs from "dayjs";

import useStaking from "@/hooks/useStaking";
import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import SvgIcon from "@/app/components/SvgIcon";
import FilterIcon from "@/assets/images/double-arrow.svg";
import { StakingHistoryItem } from "@/src/api/types/staking";
import { parseNumberForView, tokenImageMap } from "@/utils/ui";
import FilterModal, { IFilterState } from "@/app/components/FilterModal";
import { BackButton } from "@/app/components/BackButton";

const StakingHistory = () => {
  const { t } = useTranslation();
  const [history, setHistory] = useState<StakingHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const filters = [
    {
      label: t("components.status"),
      options: [
        { label: "--", value: "" },
        { label: t("components.staking"), value: "스테이킹" },
        { label: t("components.unstaking"), value: "언스테이킹" },
      ],
    },
    {
      label: t("components.sort"),
      options: [
        { label: "--", value: "" },
        { label: t("components.date"), value: "날짜별" },
        { label: t("common.amount"), value: "금액별" },
      ],
    },
  ];

  const initialFilterState: IFilterState = filters.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.label]: curr.options[0],
    }),
    {}
  );
  const [selectedFilters, setSelectedFilters] =
    useState<IFilterState>(initialFilterState);

  const handleApply = () => {
    setFilterVisible(false);
    syncHistory(1);
  };

  const syncHistory = async (requestedPage = 1) => {
    setLoading(true);
    const res = await useStaking.getStakingHistory(
      requestedPage,
      selectedFilters["Sort"].value,
      selectedFilters["Status"].value
    );

    if (typeof res === "string") {
      setModalState({
        text: res,
        type: "error",
      });
      setPopupVisible(true);
    } else {
      if (requestedPage === 1) {
        setHistory(res.items);
      } else {
        setHistory((prev) => [...prev, ...res.items]);
      }
      setTotalPages(res.totalPages);
    }

    setLoading(false);
  };

  useEffect(() => {
    syncHistory(1);
  }, []);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      syncHistory(nextPage);
    }
  };

  const renderRow = (label: string, value: string) => (
    <View className="flex-row justify-between bg-black-1200 p-4 rounded-2xl">
      <Text className="text-gray-400 text-base">{label}</Text>
      <Text className="text-white text-base max-w-[60%] text-right">
        {value}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: StakingHistoryItem }) => (
    <View className="rounded-2xl py-4  flex gap-2">
      {renderRow(
        t("staking.date"),
        dayjs(item.date).format("YYYY.MM.DD HH:mm:ss")
      )}
      {renderRow(t("staking.asset"), item.token.toUpperCase())}
      {renderRow(
        t("staking.existing_reserves"),
        `${parseNumberForView(
          item.previousBalance
        )} ${item.token.toUpperCase()}`
      )}
      {renderRow(t("staking.event"), item.state || "-")}
      {renderRow(
        t("staking.variable_amount"),
        `${parseNumberForView(item.amount)} ${item.token.toUpperCase()}`
      )}
      {renderRow(
        t("staking.current_amount"),
        `${parseNumberForView(item.newBalance)} ${item.token.toUpperCase()}`
      )}
      {renderRow(t("staking.state"), item.state || "-")}
      {renderRow(t("staking.memo"), item.note || "-")}
      <View className="bg-white h-[1px] mt-4"></View>
    </View>
  );

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-5xl mx-auto pb-2">
        <View className="items-center relative mb-6">
          <BackButton />
          <Text className="text-xl font-semibold text-white">
            {t("staking.staking")}
          </Text>
        </View>

        <View className="flex flex-row justify-between mb-2">
          <View className="flex-row items-center gap-2">
            <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
            <Text className="text-base font-medium text-white">
              {t("history.transaction_history")}
            </Text>
          </View>
          <Pressable onPress={() => setFilterVisible(true)} className="p-4">
            <FilterIcon />
          </Pressable>
        </View>

        <FlatList
          className="mt-4"
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator size="small" color="#fff" className="mt-4" />
            ) : page < totalPages ? (
              <TouchableOpacity
                onPress={loadMore}
                activeOpacity={1}
                className="bg-pink-1100 rounded-[15px] px-4 py-2 mt-4 items-center"
              >
                <Text className="text-white text-lg font-semibold">
                  {t("common.load_more")}
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />

        {history.length === 0 && !loading && (
          <View className="flex w-full text-center h-screen items-center justify-center absolute">
            <Text className="text-white text-base">
              {t("components.no_records_found")}
            </Text>
          </View>
        )}
      </View>

      <InfoAlert
        {...modalState}
        visible={popupVisible}
        setVisible={setPopupVisible}
      />
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        filters={filters ?? []}
        selected={selectedFilters}
        onChange={setSelectedFilters}
        onApply={handleApply}
      />
    </View>
  );
};

export default StakingHistory;
