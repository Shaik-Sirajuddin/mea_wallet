import FaqItem from '@/app/components/FaqItem';
import React from 'react';
import { ScrollView, Text } from 'react-native';
const faqs = [
  { id: '1', title: 'How to use a wallet', subtitle: 'How to send tokens to the other party' },
  { id: '2', title: 'How to recover my seed phrase', subtitle: 'Guide to wallet recovery' },
  { id: '3', title: 'How to swap tokens', subtitle: 'Exchanging tokens within the app' },
];

const Faqs = () => {
  return (
    <ScrollView className='w-full max-w-[300px] mx-auto'>
        <Text className="text-[21px] font-semibold leading-[29px] text-center text-white mb-8">
              Top 3 Popular Questions
            </Text>

            <ScrollView className="p-4">
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

          
    </ScrollView>
  )
}

export default Faqs
