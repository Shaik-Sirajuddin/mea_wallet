import React from "react";
import { Modal, View, TouchableWithoutFeedback } from "react-native";
import FilterView, { FilterOption } from "./FilterView";
export type IFilterState = {
  [label: string]: { label: string; value: string };
};
type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  filters: FilterOption[];
  selected: { [label: string]: { label: string; value: string } };
  onChange: (updated: {
    [label: string]: { label: string; value: string };
  }) => void;
  onApply?: () => void;
};

const FilterModal = ({
  visible,
  onClose,
  filters,
  selected,
  onChange,
  onApply,
}: FilterModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50" />
      </TouchableWithoutFeedback>

      <View className="flex-1 bg-black-1000 h-screen absolute w-full">
        <FilterView
          filters={filters}
          selected={selected}
          onChange={onChange}
          onApply={onApply}
          onClose={onClose}
        />
      </View>
    </Modal>
  );
};

export default FilterModal;
