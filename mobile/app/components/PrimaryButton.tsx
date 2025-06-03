import { Pressable, Text } from 'react-native';

interface PrimaryButtonProps {
  onPress?: () => void;
  text?: string;
  className?: string;
}

const PrimaryButton = ({
  onPress,
  text,
  className = '',
}: PrimaryButtonProps) => {
 

  return (
    <Pressable
      onPress={onPress}
      className={`text-center w-full group  py-2.5 bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center active:bg-transparent active:text-pink-1100 hover:text-pink-1100 hover:bg-transparent ${className}`}
    >
       <Text className="text-base text-white group-active:text-pink-1100 font-semibold">
            {text}
        </Text>
    </Pressable>
  );
};

export default PrimaryButton;