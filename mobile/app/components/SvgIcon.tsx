// components/SvgIcon.tsx
import { icons } from '@/assets/icons/icons'; // update the path to match your structure
import React from 'react';
import { SvgXml } from 'react-native-svg';

type SvgIconProps = {
  name: keyof typeof icons;
  color?: string;
  width?: string;
  height?: string;
};

const SvgIcon = ({ name, color = 'none', width = "20px", height = "22px" }: SvgIconProps) => {
  const xml = icons[name](color);
  return <SvgXml xml={xml} width={width} height={height} />;
};

export default SvgIcon;
