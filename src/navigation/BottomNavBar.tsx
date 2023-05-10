/* eslint-disable react-native/no-inline-styles */
import {
  HomeScreen,
  ChatScreen,
  CameraScreen,
  ProfileScreen,
  NotificationsScreen,
} from "@app/screens";
import StaticData from "@app/static/profileData.json";
import { BottomScreensParamsList } from "@app/types";
import { Colors, isAndroid } from "@app/utils";
import { TAB_ICON_SIZE } from "@app/utils/constants";
import {
  AddButtonIcon,
  ChatIcon,
  HomeIcon,
  NotificationsIcon,
  ProfileIcon,
} from "@assets/svg";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const Tab = createBottomTabNavigator<BottomScreensParamsList>();

const options: BottomTabNavigationOptions = {
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: Colors.SkyBlueMedium,
    borderTopWidth: 0,
    height: isAndroid ? 90 : 100,
  },
};

const initialRouteName: keyof BottomScreensParamsList = "HomeScreen";

export default () => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
      sceneContainerStyle={{
        backgroundColor: Colors.JustWhite,
        marginBottom: isAndroid ? 0 : -40,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          ...options,
          tabBarIcon: (e) => {
            return e.focused ? (
              <View style={styles.activeTab}>
                <HomeIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
              </View>
            ) : (
              <HomeIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          ...options,
          tabBarIcon: (e) => {
            return e.focused ? (
              <View style={styles.activeTab}>
                <ChatIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
              </View>
            ) : (
              <ChatIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
        }}
      />
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          ...options,
          headerShown: true,
          headerTitle: "Record a video",
          headerStyle: {
            backgroundColor: Colors.SkyBlue,
          },
          headerTitleStyle: {
            color: Colors.JustWhite,
          },
          tabBarIcon: (e) => {
            return e.focused ? (
              <View style={styles.activeTab}>
                <AddButtonIcon height={37} width={37} />
              </View>
            ) : (
              <AddButtonIcon height={37} width={37} />
            );
          },
        }}
      />
      <Tab.Screen
        initialParams={StaticData.profileData}
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          ...options,
          tabBarIcon: (e) => {
            return e.focused ? (
              <View style={styles.activeTab}>
                <ProfileIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
              </View>
            ) : (
              <ProfileIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          ...options,
          tabBarIcon: (e) => {
            return e.focused ? (
              <View style={styles.activeTab}>
                <NotificationsIcon
                  height={TAB_ICON_SIZE}
                  width={TAB_ICON_SIZE}
                />
              </View>
            ) : (
              <NotificationsIcon height={TAB_ICON_SIZE} width={TAB_ICON_SIZE} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTab: {
    borderWidth: 1.5,
    borderColor: Colors.JustWhite,
    borderRadius: 100,
    padding: 8,
  },
});
