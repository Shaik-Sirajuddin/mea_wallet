import InfoAlert, { InfoAlertProps } from "@/app/components/InfoAlert";
import SvgIcon from "@/app/components/SvgIcon";
import useStaking from "@/hooks/useStaking";
import { UserStaking } from "@/src/api/types/staking";
import { tokenImageMap } from "@/utils/ui";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
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

const UserStakings = () => {
  const [stakings, setStakings] = useState<UserStaking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedState, setSelectedState] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [modalState, setModalState] = useState<Partial<InfoAlertProps>>({});

  const [selectedStaking, setSelectedStaking] = useState<UserStaking | null>(
    null
  );
  const [popupVisible, setPopupVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);

  const syncStakings = async (requestedPage = 1) => {
    setLoading(true);
    const res = await useStaking.getUserStakings(
      requestedPage,
      selectedState,
      selectedSort
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
  }, [selectedState, selectedSort]);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      syncStakings(nextPage);
    }
  };

  const handleEarlyUnstake = (staking: UserStaking) => {
    setWithdrawModalVisible(true);
    setSelectedStaking(staking);
    // call unstake API here
  };

  const handleClaim = (stakingId: number) => {
    setModalState({
      text: `Claim requested for #${stakingId}`,
      type: "success",
    });
    setPopupVisible(true);
    // call claim API here
  };

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-5xl mx-auto pb-2">
        <View className="items-center relative mt-4 mb-6">
          <Pressable
            onPress={() => router.back()}
            className="absolute left-0 top-2"
          >
            <SvgIcon name="leftArrow" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">My Stakings</Text>
        </View>

        {/* Horizontally scrollable filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-4 px-2 space-x-2"
        >
          <TouchableOpacity
            onPress={() =>
              setSelectedState((prev) =>
                prev === "언스테이킹신청" ? "" : "언스테이킹신청"
              )
            }
            className={`px-4 py-2 rounded-xl ${
              selectedState === "언스테이킹신청"
                ? "bg-pink-1100"
                : "bg-black-800"
            }`}
          >
            <Text className="text-white font-medium">Unstaking Requested</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSelectedSort((prev) => (prev === "날짜별" ? "" : "날짜별"))
            }
            className={`px-4 py-2 rounded-xl ${
              selectedSort === "날짜별" ? "bg-pink-1100" : "bg-black-800"
            }`}
          >
            <Text className="text-white font-medium">Sort by Date</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSelectedSort((prev) => (prev === "금액별" ? "" : "금액별"))
            }
            className={`px-4 py-2 rounded-xl ${
              selectedSort === "금액별" ? "bg-pink-1100" : "bg-black-800"
            }`}
          >
            <Text className="text-white font-medium">Sort by Amount</Text>
          </TouchableOpacity>
        </ScrollView>

        <FlatList
          className="mt-2"
          data={stakings}
          renderItem={({ item }) => {
            return (
              <StakingItem
                item={item}
                handleClaim={handleClaim}
                handleEarlyUnstake={() => {
                  handleEarlyUnstake(item);
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
                <Text className="text-white font-semibold">Load More</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      </View>

      <InfoAlert
        {...modalState}
        visible={popupVisible}
        setVisible={setPopupVisible}
      />
      <WithdrawalModal
        visible={withdrawModalVisible}
        onClose={() => setWithdrawModalVisible(false)}
        onConfirm={() => {}}
        item={selectedStaking}
      />
    </View>
  );
};

export default UserStakings;
