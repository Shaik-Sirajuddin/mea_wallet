import { Pressable, PressableProps, Text } from "react-native";

interface PrimaryButtonProps extends PressableProps {
  text?: string;
  className?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  onPress,
  text,
  className = "",
  disabled = false,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      className={`
        text-center w-full group py-2.5 rounded-[15px] 
        flex items-center justify-center transition-all duration-100 ease-in-out
        ${
          disabled
            ? "bg-gray-300 border-gray-300 opacity-50"
            : "bg-pink-1100 border-pink-1100 hover:text-pink-1100 hover:bg-transparent active:scale-[0.97] active:opacity-90"
        }
        ${className}
      `}
      {...props}
    >
      <Text
        className={`
          text-base font-semibold transition-all duration-100 ease-in-out
          ${
            disabled
              ? "text-gray-300"
              : "text-white group-pressed:text-pink-1100"
          }
        `}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default PrimaryButton;
