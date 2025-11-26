import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import SvgIcon from "@/app/components/SvgIcon";
import dayjs from "dayjs";

interface HistoryPopupProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  fetchData: (page: number) => Promise<any>;
  type: "interest" | "topup";
}

const HistoryPopup = ({
  visible,
  onDismiss,
  title,
  fetchData,
  type,
}: HistoryPopupProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setData([]);
      setPage(1);
      loadHistory(1);
    }
  }, [visible]);

  const loadHistory = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetchData(pageNum);
      if (res && res.data) {
        if (pageNum === 1) {
          setData(res.data);
        } else {
          setData((prev) => [...prev, ...res.data]);
        }
        setTotalPages(res.total_block);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadHistory(nextPage);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const renderRow = (label: string, value: string | React.ReactNode) => (
      <View className="flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
        <View className="flex-1">
          <Text className="text-xs font-medium text-gray-1200 truncate">
            {label}
          </Text>
        </View>
        <View className="flex-row items-center gap-2 ml-3">
          {typeof value === "string" ? (
            <Text className="text-right text-white text-sm font-medium">
              {value}
            </Text>
          ) : (
            value
          )}
        </View>
      </View>
    );

    if (type === "topup") {
      return (
        <View className="mb-2 border-b border-gray-700 pb-3">
          {renderRow(
            t("common.date"),
            dayjs(item.regDate || item.date).format("YYYY. MM. DD.")
          )}
          {renderRow(t("loan.asset"), (item.symbol || "USDT").toUpperCase())}
          {renderRow(t("loan.category"), item.category || "Additional Margin")}
          {renderRow(t("common.amount"), `${item.amount || item.price || "0"}`)}
          {renderRow(t("loan.prev"), `${item.prev || "0"}`)}
          {renderRow(t("loan.next"), `${item.next || "0"}`)}
        </View>
      );
    }

    return (
      <View className="mb-2 border-b border-gray-700 pb-3">
        {renderRow(
          t("common.date"),
          dayjs(item.regDate || item.date).format("YYYY-MM-DD")
        )}
        {renderRow(t("loan.asset"), (item.symbol || "USDT").toUpperCase())}
        {renderRow(t("common.amount"), `${item.amount || item.price || "0"}`)}
        {renderRow(
          t("loan.process_date") || "Proc. date",
          item.processDate ? (
            dayjs(item.processDate).format("YYYY-MM-DD")
          ) : (
            <Text className="text-gray-1200 text-sm">|</Text>
          )
        )}
        {renderRow(
          t("loan.status"),
          item.stateStr || item.status || t("loan.before_payment")
        )}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View className="flex-1 bg-black/80 justify-center items-center px-4">
        <View className="bg-black-1200 w-[92%] max-w-md rounded-2xl border border-gray-800 p-5 shadow-xl h-[78vh]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-100">{title}</Text>
            <TouchableOpacity
              onPress={onDismiss}
              className="p-2 rounded-md hover:bg-black-1000"
            >
              <SvgIcon name="crossIcon" width="18" height="18" color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading ? (
                <Text className="text-gray-400 text-center mt-10">
                  {t("components.no_records_found")}
                </Text>
              ) : null
            }
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="small" color="#fff" className="mt-4" />
              ) : page < totalPages ? (
                <TouchableOpacity
                  onPress={loadMore}
                  className="bg-pink-1100 py-3 rounded-xl mt-4 items-center"
                >
                  <Text className="text-white font-semibold">
                    {t("common.load_more")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="py-3">
                  <Text className="text-center text-xs text-gray-500">
                    This is the last page.
                  </Text>
                </View>
              )
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default HistoryPopup;
