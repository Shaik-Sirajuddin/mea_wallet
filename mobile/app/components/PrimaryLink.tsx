import { Link } from 'expo-router';
import { Text } from 'react-native';

type Route = '/';

interface PrimaryLinkProps {
  href: Route;
  text: string;
  className?: string;
}

const PrimaryLink = ({ href = '/', text, className = '' }: PrimaryLinkProps) => {
  return (
    <Link
      href={href}
      className={`mb-[9px] text-center text-white py-2.5 bg-pink-1100 border border-pink-1100 rounded-[15px] flex items-center justify-center active:bg-transparent active:text-pink-1100 hover:text-pink-1100 hover:bg-transparent ${className}`}
    >
      <Text className="text-base font-semibold leading-[22px]">
        {text}
      </Text>
    </Link>
  );
};

export default PrimaryLink;