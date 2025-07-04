import React, { useEffect, useState } from "react";
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
import { tokenImageMap } from "@/utils/ui";
import FilterModal, { IFilterState } from "@/app/components/FilterModal";

const StakingHistory = () => {
  const [history, setHistory] = useState<StakingHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});
  const [popupVisible, setPopupVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const filters = [
    {
      label: "Status",
      options: [
        { label: "--", value: "" },
        { label: "Staking", value: "스테이킹" },
        { label: "Unstaking", value: "언스테이킹" },
      ],
    },
    {
      label: "Sort",
      options: [
        { label: "--", value: "" },
        { label: "Date", value: "날짜별" },
        { label: "Amount", value: "금액별" },
      ],
    },
  ];
  const initialFilterState: IFilterState = filters.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.label]: curr.options[0], // default to first option
    }),
    {}
  );
  const [selectedFilters, setSelectedFilters] =
    useState<IFilterState>(initialFilterState);
  const handleApply = () => {
    console.log("Selected Filters:", selectedFilters);
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
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-400 text-base">{label}</Text>
      <Text className="text-white text-base max-w-[60%] text-right">
        {value}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: StakingHistoryItem }) => (
    <View className="bg-black-1200 rounded-2xl px-6 py-4 mb-4 flex gap-2">
      {renderRow("Transaction ID", String(item.id))}
      {renderRow("Date", dayjs(item.date).format("YYYY-MM-DD HH:mm"))}
      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-400 text-base">Symbol</Text>
        <View className="flex flex-row gap-2 items-center">
          <Image
            source={
              tokenImageMap[item.token.toLowerCase()] ||
              tokenImageMap["default"]
            }
            className="w-8 h-8 rounded-full"
            resizeMode="contain"
          />
          <Text className="text-white text-base  text-right">{item.token}</Text>
        </View>
      </View>
      {renderRow("Amount", item.amount)}
      {renderRow("Previous Balance", item.previousBalance)}
      {renderRow("New Balance", item.newBalance)}
      {renderRow("Note", item.note || "-")}
      {renderRow("Status", item.state || "-")}
      {/* {renderRow("Maturity State", item.maturity_state || "-")} */}
    </View>
  );

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-5xl mx-auto pb-2">
        <View className="items-center relative mb-6">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-2"
          >
            <SvgIcon name="leftArrow" />
          </Pressable>
          <Text className="text-xl font-semibold text-white">
            Staking History
          </Text>
        </View>
        <View className="flex flex-row justify-end mb-2">
          <Pressable
            onPress={() => {
              setFilterVisible(true);
            }}
            className="p-4"
          >
            <FilterIcon />
          </Pressable>
        </View>

        <FlatList
          className="px-4 mt-4"
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
                  Load More
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />

        {history.length === 0 && !loading && (
          <View className="flex w-full text-center h-screen items-center justify-center absolute">
            <Text className="text-white text-base">No Records Found</Text>
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
        onChange={(data) => {
          setSelectedFilters(data);
        }}
        onApply={handleApply}
      />
    </View>
  );
};

export default StakingHistory;
