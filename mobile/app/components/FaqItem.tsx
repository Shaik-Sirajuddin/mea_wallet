import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface FaqItemProps {
  id: string;
  number: number;
  title: string;
  subtitle: string;
}

function FaqItem({ id, number, title, subtitle }: FaqItemProps) {
  const isFirstFaq = number === 1;
  const textColor = isFirstFaq ? 'text-pink-1200' : 'text-gray-1200';
  const borderColor = isFirstFaq ? 'border-pink-1200' : 'border-gray-1200';

  return (
    <Pressable
      onPress={() => router.push({
        pathname: "/(Views)/faq/faqs/[id]",
        params: { id }
      })}
      className="flex-row items-center mb-8 gap-3"
    >
      <View className={`border-2 ${borderColor} rounded-full items-center justify-center w-10 h-10`}>
        <Text className={`${textColor} text-2xl`}>{number}</Text>
      </View>
      <View>
        <Text className={`text-[17px] font-semibold ${textColor}`}>{title}</Text>
        <Text className={`text-sm font-medium ${textColor}`}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

export default FaqItem;
