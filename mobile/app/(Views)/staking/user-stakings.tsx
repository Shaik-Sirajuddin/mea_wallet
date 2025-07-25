import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import SvgIcon from "@/app/components/SvgIcon";
import useStaking from "@/hooks/useStaking";
import { UserStaking } from "@/src/api/types/staking";
import { tokenImageMap } from "@/utils/ui";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StakingItem from "@/app/components/StakingItem";
import WithdrawalModal from "@/app/components/WithdrawModel";
import FilterModal, { IFilterState } from "@/app/components/FilterModal";
import FilterIcon from "@/assets/images/double-arrow.svg";
import { BackButton } from "@/app/components/BackButton";

const UserStakings = () => {
  const { t } = useTranslation();
  const [stakings, setStakings] = useState<UserStaking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});

  const [selectedStaking, setSelectedStaking] = useState<UserStaking | null>(
    null
  );
  const [popupVisible, setPopupVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const filters = [
    {
      label: t("components.status"),
      options: [
        { label: "--", value: "" },
        {
          label: t("components.unstaking_application"),
          value: "언스테이킹신청",
        },
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
      [curr.label]: curr.options[0], // default to first option
    }),
    {}
  );
  const [selectedFilters, setSelectedFilters] =
    useState<IFilterState>(initialFilterState);
  const handleApply = () => {
    console.log("Selected Filters:", selectedFilters);
    setFilterVisible(false);
    syncStakings(1);
  };
  const syncStakings = async (requestedPage = 1) => {
    setLoading(true);
    const res = await useStaking.getUserStakings(
      requestedPage,
      selectedFilters["Status"].value,
      selectedFilters["Sort"].value
    );

    if (typeof res === "string") {
      setModalState({
        text: res,
        type: "error",
      });
      setPopupVisible(true);
    } else {
      if (requestedPage === 1) {
        setStakings(res.items);
      } else {
        setStakings((prev) => [...prev, ...res.items]);
      }
      setTotalPages(res.totalPages);
    }

    setLoading(false);
  };

  useEffect(() => {
    syncStakings(1);
  }, []);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      syncStakings(nextPage);
    }
  };

  const handleUnstakeClick = (staking: UserStaking) => {
    setWithdrawModalVisible(true);
    setSelectedStaking(staking);
    // call unstake API here
  };

  const unstake = async (isEarlyUnstake: boolean) => {
    //todo loading bars
    setWithdrawModalVisible(false);
    if (!selectedStaking) {
      return;
    }
    let result = await useStaking.closeStaking(selectedStaking.id);

    if (typeof result === "string") {
      setModalState({
        text: result,
        type: "error",
      });
      setPopupVisible(true);
      return;
    }
    setModalState({
      text: isEarlyUnstake
        ? t("staking.unstaking_success")
        : t("staking.claim_success"),
      type: "success",
    });
    setPopupVisible(true);
    syncStakings(1);
  };

  useEffect(() => {
    let minCloseTime: Date | null = null;
    for (let staking of stakings) {
      if (minCloseTime === null) {
        minCloseTime = staking.expectedWithdrawalDate;
      } else {
        if (minCloseTime.getTime() > staking.expectedWithdrawalDate.getTime()) {
          minCloseTime = staking.expectedWithdrawalDate;
        }
      }
    }
    if (minCloseTime === null) {
      return;
    }
    let intervalId = setTimeout(() => {
      console.log("auto close called");
      useStaking.autoCloseStaking();
    }, Date.now() - minCloseTime.getTime());
    return () => clearTimeout(intervalId);
  }, [stakings]);

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-5xl mx-auto pb-2">
        <View className="items-center relative mt-4 mb-6">
          <BackButton />
          <Text className="text-lg font-semibold text-white">
            {t("staking.my_staking")}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center mb-2">
          <View className="flex-row items-center gap-2">
            <View className="w-6 h-6 rounded-full bg-black-1200 border-[5px] border-gray-1100" />
            <Text className="text-base font-medium text-white">
              {t("history.transaction_history")}
            </Text>
          </View>
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
          className="mt-2"
          data={stakings}
          renderItem={({ item }) => {
            return (
              <StakingItem
                item={item}
                handleClaim={() => {
                  handleUnstakeClick(item);
                }}
                handleEarlyUnstake={() => {
                  handleUnstakeClick(item);
                }}
              />
            );
          }}
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
                <Text className="text-white font-semibold">
                  {t("common.load_more")}
                </Text>
              </TouchableOpacity>
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 110 }}
        />

        {stakings.length === 0 && !loading && (
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
      {selectedStaking && (
        <WithdrawalModal
          visible={withdrawModalVisible}
          onClose={() => setWithdrawModalVisible(false)}
          onConfirm={unstake}
          item={selectedStaking}
        />
      )}
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

export default UserStakings;
