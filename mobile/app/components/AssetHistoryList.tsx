import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { parseNumberForView, truncateAddress } from "@/utils/ui";
import { AssetHistoryItem } from "@/src/api/types/asset";
import useDeposit from "@/hooks/api/useDeposit";

interface AssetHistoryListProps {
  history: AssetHistoryItem[];
  displaySymbol: string;
  performCopy: (value: string) => void;
  page: number;
  onDepositStatusChange?: (
    type: "success" | "error" | "info",
    message: string
  ) => void;
}

const AssetHistoryList: React.FC<AssetHistoryListProps> = ({
  history,
  displaySymbol,
  performCopy,
  page,
  onDepositStatusChange,
}) => {
  const { t } = useTranslation();
  const [cancellingDepositId, setCancellingDepositId] = useState<string | null>(
    null
  );

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

  const handleCancelDeposit = async (item: AssetHistoryItem, index: number) => {
    // Use index + 1 as seqno since API expects sequence number
    const depositId = `${page}_${index}`;

    try {
      setCancellingDepositId(depositId);
      onDepositStatusChange?.("info", "Cancelling deposit...");

      const result = await useDeposit.cancelDeposit(item.seqno);

      if (typeof result === "string") {
        // Error case
        onDepositStatusChange?.("error", result);
      } else if (result.status !== "succ") {
        // StatusResponse but not successful
        onDepositStatusChange?.("error", result.status);
      } else {
        // Success case
        onDepositStatusChange?.("success", "Deposit cancelled successfully");
      }
    } catch (error: any) {
      onDepositStatusChange?.(
        "error",
        error?.message || "Failed to cancel deposit"
      );
    } finally {
      setCancellingDepositId(null);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: AssetHistoryItem;
    index: number;
  }) => {
    const depositId = `${page}_${index}`;
    const isDeposit =
      item.type?.toLowerCase().includes("deposit") || item.type === "입금";
    const isCancelling = cancellingDepositId === depositId;
    const canCancel = isDeposit && item.status === "Deposit Request";

    return (
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
        {renderRow(
          t("asset_history.from_address"),
          truncateAddress(item.fromAddress) || "--",
          "",
          () => performCopy(item.fromAddress)
        )}
        {renderRow(
          t("asset_history.to_address"),
          truncateAddress(item.toAddress) || "--",
          "",
          () => performCopy(item.toAddress)
        )}
        {renderRow(
          t("asset_history.txid"),
          <Text className="text-blue-400 font-bold">
            {truncateAddress(item.txHash) || "--"}
          </Text>,
          "",
          () => performCopy(item.txHash)
        )}
        {renderRow(t("asset_history.memo"), item.memo || "--", "", () =>
          performCopy(item.memo)
        )}

        {/* Deposit Cancellation Button */}
        {canCancel && (
          <View className="w-full flex flex-col items-end gap-2 mt-2">
            <View className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-black-1200/60 px-2 py-2 shadow-sm">
              <TouchableOpacity
                disabled={isCancelling}
                onPress={() => handleCancelDeposit(item, index)}
                className="px-3 py-1 rounded-lg border border-purple-500 bg-black-1200 flex-row items-center justify-center"
              >
                {isCancelling ? (
                  <>
                    <ActivityIndicator
                      size="small"
                      color="#a855f7"
                      className="mr-2"
                    />
                    <Text className="text-purple-500 text-xs md:text-sm font-semibold">
                      Cancelling...
                    </Text>
                  </>
                ) : (
                  <Text className="text-purple-500 text-xs md:text-sm font-semibold">
                    Deposit cancellation
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="w-full h-[1px] bg-white mt-2"></View>
      </View>
    );
  };

  return (
    <View>
      {history.map((item, index) => {
        return renderItem({ item, index });
      })}
    </View>
  );
};

export default AssetHistoryList;
