/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { FlexContainer } from "@app/containers";
import { Colors, isAndroid } from "@app/utils";

type QuickActionButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
  noBackground?: boolean;
};

export default ({
  children,
  onPress,
  disabled,
  style,
  noBackground,
}: QuickActionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.5}>
      <FlexContainer
        position="center"
        style={{
          ...(noBackground ? {} : styles.container),
          opacity: disabled ? 0.7 : 1,
          ...style,
        }}
      >
        {children}
      </FlexContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: isAndroid ? 40 : 36,
    width: isAndroid ? 40 : 36,
    backgroundColor: Colors.SkyBlue,
    borderRadius: 100,
  },
});

// <QuickActionButton onPress noBackground>
//   <Icon height={18} width={18} />
// </QuickActionButton>
