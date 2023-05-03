import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Dimensions, Platform, StyleSheet } from "react-native";

const isAndroid: boolean = Platform.OS === "android";

function deviceWidth(): number {
  return Dimensions.get("screen").width;
}

function deviceHeight(): number {
  return Dimensions.get("screen").height;
}

function alert(title: string, message?: string): void {
  if (title || message) {
    Alert.alert(title, message);
  } else {
    Alert.alert("No message provided!");
  }
}

async function getFromLocalStorage(
  key: string
): Promise<object | string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error retrieving data from local storage: ${error}`);
  }
  return null;
}

async function saveToLocalStorage(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error saving data to local storage: ${error}`);
  }
}

enum Colors {
  JustBlack = "#000000",
  JustWhite = "#ffffff",
  SkyBlue = "#5C95E3",
  LightSkyBlue = "#E6EEFA",
  SkyBlueMedium = "#648BBB",
}
enum FontFamily {
  PoppinsRegular = "Poppins-Regular",
  PoppinsLight = "Poppins-Light",
  PoppinsSemiBold = "Poppins-SemiBold",
  PoppinsBold = "Poppins-Bold",
}

enum FontSize {
  default = 17,
  medium = 16,
  small = 14,
  extraSmall = 12,
}

const defaultStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#5c95e3",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.24,
    shadowRadius: 13.84,
    elevation: 17,
  },
});

export {
  saveToLocalStorage,
  getFromLocalStorage,
  isAndroid,
  alert,
  Colors,
  FontFamily,
  FontSize,
  defaultStyles,
  deviceWidth,
  deviceHeight,
};
