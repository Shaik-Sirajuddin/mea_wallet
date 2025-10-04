import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { parseNumberForView, truncateAddress } from "@/utils/ui";
import { TransferHistoryItem } from "@/src/api/types/earn/transfer";

interface TransferHistoryListProps {
  history: TransferHistoryItem[];
  displaySymbol: string;
  page: number;
}

const TransferHistoryList: React.FC<TransferHistoryListProps> = ({
  history,
  displaySymbol,
  page,
}) => {
  const { t } = useTranslation();

  const renderRow = (
    label: string,
    // Change value type to React.ReactNode
    value: React.ReactNode,
    lightText: string = "",
    onPress: (() => void) | null = null
  ) => (
    <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
      <Text className="text-base font-medium text-gray-1200">{label}</Text>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          {/* Conditionally render based on value type */}
          {typeof value === "string" ? (
            <Text className="text-base font-medium text-white">{value}</Text>
          ) : (
            value
          )}
        </TouchableOpacity>
      ) : (
        <View className="flex flex-row">
          {/* Conditionally render based on value type */}
          {typeof value === "string" ? (
            <Text className="text-base font-medium text-white">{value}</Text>
          ) : (
            value
          )}
          <Text className="text-base font-medium text-gray-1200">
            {" "}
            {lightText}
          </Text>
        </View>
      )}
    </View>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: TransferHistoryItem;
    index: number;
  }) => (
    <View className="mb-4" key={page.toString() + "_" + index.toString()}>
      {renderRow(
        t("asset_history.total_date"),
        new Date(item.registeredAt).toLocaleDateString(),
        new Date(item.registeredAt).toLocaleTimeString()
      )}
      {renderRow(t("asset_history.division"), "", item.type)}
      {renderRow(
        t("asset_history.amount"),
        `${parseNumberForView(item.amount)}`,
        `${displaySymbol}`
      )}
      {renderRow(
        t("asset_history.fee"),
        `${parseNumberForView(item.withdrawFee)}`,
        `${displaySymbol}`
      )}
      {renderRow(
        t("asset_history.previous_amount"),
        `${parseNumberForView(item.previousBalance)}`,
        `${displaySymbol}`
      )}
      {renderRow(
        t("asset_history.amount_after"),
        `${parseNumberForView(item.nextBalance)}`,
        `${displaySymbol}`
      )}
      {renderRow(t("asset_history.state"), item.status)}
      <View className="w-full h-[1px] bg-white mt-2"></View>
    </View>
  );

  return (
    <View>
      {history.map((item, index) => {
        return renderItem({ item, index });
      })}
    </View>
  );
};

export default TransferHistoryList;
