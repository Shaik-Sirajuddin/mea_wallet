import React from "react";
import { View, Text } from "react-native";

type InfoListProps = {
  items: { title: string; value: string | number | React.ReactNode }[];
};

const InfoList: React.FC<InfoListProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <View
          key={item.title}
          className={`flex-row justify-between items-center p-[15px] bg-black-1200 ${
            index === 0 ? "rounded-t-2xl" : ""
          } ${index === items.length - 1 ? "rounded-b-2xl" : ""} mb-[1px]`}
        >
          <Text className="text-[17px] font-medium leading-[22px] text-gray-1200">
            {item.title}
          </Text>
          <Text className="text-white flex items-center gap-3">
            {item.value}
          </Text>
        </View>
      ))}
    </>
  );
};

export default InfoList;
