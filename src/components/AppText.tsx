import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {Colors, FontFamily, FontSize} from '@app/utils';

interface AppTextProps extends TextProps {
  color?: string;
  poppinsLight?: boolean;
  poppinsSemiBold?: boolean;
  poppinsBold?: boolean;
  medium?: boolean;
  small?: boolean;
  extraSmall?: boolean;
  style?: TextStyle;
  children: React.ReactNode;
}

export default ({
  children,
  color = Colors.JustBlack,
  poppinsBold,
  poppinsLight,
  poppinsSemiBold,
  medium,
  small,
  extraSmall,
  numberOfLines,
  ellipsizeMode,
  style,
}: AppTextProps): JSX.Element => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={{
        color,
        fontSize: medium
          ? FontSize.medium
          : small
          ? FontSize.small
          : extraSmall
          ? FontSize.extraSmall
          : FontSize.default,
        fontFamily: poppinsBold
          ? FontFamily.PoppinsBold
          : poppinsLight
          ? FontFamily.PoppinsLight
          : poppinsSemiBold
          ? FontFamily.PoppinsSemiBold
          : FontFamily.PoppinsRegular,
        ...style,
      }}>
      {children}
    </Text>
  );
};

// <AppText small color poppinsRegular>
//   {text}
// </AppText>
