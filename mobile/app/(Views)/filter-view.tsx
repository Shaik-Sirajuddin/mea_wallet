import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { CheckBox } from "@rneui/themed";
import SvgIcon from "../components/SvgIcon";

type FilterOption = {
  label: string;
  options: string[];
};

type FilterViewProps = {
  filters: FilterOption[];
  selected: { [label: string]: string }; // current selected values
  onChange: (updated: { [label: string]: string }) => void; // called on change
  onApply?: () => void; // optional apply handler
  onClose?: () => void; // optional close handler
};

const FilterView: React.FC<FilterViewProps> = ({
  filters,
  selected,
  onChange,
  onApply,
  onClose,
}) => {
  const toggleOption = (filterLabel: string, option: string) => {
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
          <TouchableOpacity
            onPress={onApply}
            className="absolute right-0 items-end justify-end z-10 p-2"
          >
            <Text className="text-pink-1200 text-[17px]">Apply</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          {filters.map((filter) => (
            <View key={filter.label} className="mb-6">
              <Text className="text-[19px] font-semibold leading-[22px] mb-3 text-white">
                {filter.label}
              </Text>

              {filter.options.map((option, index) => (
                <View
                  key={option}
                  className={`bg-black-1200 ${
                    index === 0 ? "rounded-t-2xl" : ""
                  } ${
                    index === filter.options.length - 1 ? "rounded-b-2xl" : ""
                  } mb-[1px] p-4 flex-row items-center justify-between`}
                >
                  <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
                    {option}
                  </Text>
                  <CheckBox
                    checked={selected[filter.label] === option}
                    onPress={() => toggleOption(filter.label, option)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#ED93FF"
                    uncheckedColor="#1F1F1F"
                    className="!bg-transparent !rounded-md !p-0 !m-0 !-mr-0"
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FilterView;
