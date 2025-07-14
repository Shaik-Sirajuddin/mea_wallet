import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { parseNumberForView, truncateAddress } from "@/utils/ui";
import { AssetHistoryItem } from "@/src/api/types/asset";

interface AssetHistoryListProps {
  history: AssetHistoryItem[]; // ideally define AssetHistoryItem[]
  displaySymbol: string;
  performCopy: (value: string) => void;
  page: number;
}

const AssetHistoryList: React.FC<AssetHistoryListProps> = ({
  history,
  displaySymbol,
  performCopy,
  page,
}) => {
  const { t } = useTranslation();

  const renderRow = (
    label: string,
    value: string,
    onPress: (() => void) | null = null
  ) => (
    <View className="flex flex-row items-center justify-between bg-black-1200 rounded-[15px] p-4 mb-1">
      <Text className="text-base font-medium text-gray-1200">{label}</Text>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Text className="text-base font-medium text-white">{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-base font-medium text-white">{value}</Text>
      )}
    </View>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: AssetHistoryItem;
    index: number;
  }) => (
    <View className="mb-4" key={page.toString() + "_" + index.toString()}>
      {renderRow(
        t("asset_history.total_date"),
        new Date(item.registeredAt).toLocaleString()
      )}
      {renderRow(t("asset_history.division"), item.type)}
      {renderRow(
        t("asset_history.amount"),
        `${parseNumberForView(item.amount)} ${displaySymbol}`
      )}
      {renderRow(
        t("asset_history.fee"),
        `${parseNumberForView(item.withdrawFee)} ${displaySymbol}`
      )}
      {renderRow(
        t("asset_history.previous_amount"),
        `${parseNumberForView(item.previousBalance)} ${displaySymbol}`
      )}
      {renderRow(
        t("asset_history.amount_after"),
        `${parseNumberForView(item.nextBalance)} ${displaySymbol}`
      )}
      {renderRow(t("asset_history.state"), item.status)}
      {renderRow(
        t("asset_history.from_address"),
        truncateAddress(item.fromAddress) || "--",
        () => performCopy(item.fromAddress)
      )}
      {renderRow(
        t("asset_history.to_address"),
        truncateAddress(item.toAddress) || "--",
        () => performCopy(item.toAddress)
      )}
      {renderRow(
        t("asset_history.txid"),
        truncateAddress(item.txHash) || "--",
        () => performCopy(item.txHash)
      )}
      <View className="w-full h-[1px] bg-white mt-2"></View>
    </View>
  );

  return (
    <View>
      {history.map((item , index) => {
        return renderItem({ item , index });
      })}
    </View>
  );
};

export default AssetHistoryList;
