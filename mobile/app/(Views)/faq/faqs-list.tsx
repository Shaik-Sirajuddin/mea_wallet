import FaqItem from '@/app/components/FaqItem';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

export default function FAQList() {
  const { t } = useTranslation();
  const router = useRouter();

  const faqs = [
    { id: '1', title: t("faq.how_to_use_wallet"), subtitle: t("faq.how_to_send_tokens") },
    { id: '2', title: t("faq.how_to_recover_seed"), subtitle: t("faq.wallet_recovery_guide") },
    { id: '3', title: t("faq.how_to_swap_tokens"), subtitle: t("faq.exchanging_tokens") },
  ];

  return (
        <View className="w-full max-w-[300px] mx-auto">
            <Text className='text-[21px] font-semibold leading-[29px] text-center text-white'>{t("faq.popular_questions")}</Text>

          <ScrollView className="mt-10">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.id}
                id={faq.id}
                number={index + 1}
                title={faq.title}
                subtitle={faq.subtitle}
              />
            ))}
          </ScrollView>
        </View>
  );
} 