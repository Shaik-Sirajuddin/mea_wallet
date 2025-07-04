import React from "react";
import { Pressable, Text, View } from "react-native";
import { CheckBox } from "@rneui/themed";
import SvgIcon from "../components/SvgIcon";

export type FilterOption = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

type FilterViewProps = {
  filters: FilterOption[];
  selected: { [label: string]: { label: string; value: string } };
  onChange: (updated: {
    [label: string]: { label: string; value: string };
  }) => void;
  onApply?: () => void;
  onClose?: () => void;
};

const FilterView = ({
  filters,
  selected,
  onChange,
  onApply,
  onClose,
}: FilterViewProps) => {
  const toggleOption = (
    filterLabel: string,
    option: { label: string; value: string }
  ) => {
    onChange({ ...selected, [filterLabel]: option });
  };

  return (
    <View className="bg-black-1000 flex-1">
      <View className="w-full max-w-5xl mx-auto px-4 pt-8 pb-10">
        <View className="items-center relative">
          <Pressable
            onPress={onClose}
            className="absolute left-0 top-0 z-10 p-2"
          >
            <SvgIcon name="leftArrow" width="21" height="21" />
          </Pressable>
          <Text className="text-lg font-semibold text-white">Filter</Text>
          <Pressable
            onPress={onApply}
            className="absolute right-0 items-end justify-end z-10 p-2"
          >
            <Text className="text-pink-1200 text-[17px]">Apply</Text>
          </Pressable>
        </View>

        <View className="mt-10">
          {filters.map((filter) => (
            <View key={filter.label} className="mb-6">
              <Text className="text-[19px] font-semibold leading-[22px] mb-3 text-white">
                {filter.label}
              </Text>

              {filter.options.map((option, index) => (
                <Pressable
                  key={option.value}
                  onPress={() => toggleOption(filter.label, option)}
                  className={`bg-black-1200 ${
                    index === 0 ? "rounded-t-2xl" : ""
                  } ${
                    index === filter.options.length - 1 ? "rounded-b-2xl" : ""
                  } mb-[1px] p-4 flex-row items-center justify-between`}
                >
                  <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
                    {option.label}
                  </Text>
                  <CheckBox
                    checked={selected[filter.label]?.value === option.value}
                    onPress={() => {}} // disables inner press to use outer pressable
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#ED93FF"
                    uncheckedColor="#1F1F1F"
                    className="!bg-transparent !rounded-md !p-0 !m-0 !-mr-0"
                  />
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FilterView;
