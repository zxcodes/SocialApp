/* eslint-disable react-native/no-inline-styles */
import { Colors, defaultStyles, isAndroid } from "@app/utils";
import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import AppText from "./AppText";

type AppButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
  disabled?: boolean;
};

export default ({
  children,
  onPress,
  style,
  textStyle,
  disabled,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.button,
        opacity: disabled ? 0.7 : 1,
        ...style,
      }}
      onPress={onPress}
      activeOpacity={0.4}
    >
      <AppText
        medium
        poppinsSemiBold
        color={Colors.JustWhite}
        style={{ ...textStyle }}
      >
        {children}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 33,
    backgroundColor: Colors.SkyBlue,
    borderRadius: 100,
    height: isAndroid ? 46 : 42,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    ...defaultStyles.boxShadow,
  },
});

//<AppButton onPress disabled?>Get started</AppButton>
