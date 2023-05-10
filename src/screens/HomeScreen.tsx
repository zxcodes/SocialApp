/* eslint-disable react-native/no-inline-styles */
import {
  AppText,
  QuickActionButton,
  Spacer,
  StoriesList,
  VideoCard,
} from "@app/components";
import {
  FlexContainer,
  MainContainer,
  PaddingContainer,
} from "@app/containers";
import StaticData from "@app/static/profileData.json";
import { BottomScreensParamsList, VideoType } from "@app/types";
import { Colors, deviceHeight, getFromLocalStorage } from "@app/utils";
import { CameraIcon, HomeNotificationsIcon, VideoNotFound } from "@assets/svg";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type HomeScreenProps = BottomTabScreenProps<
  BottomScreensParamsList,
  "HomeScreen"
>;

export default function HomeScreen({
  navigation,
}: HomeScreenProps): JSX.Element {
  const isFocussed = useIsFocused();
  const [feedVideos, setFeedVideos] = useState<any>();

  const fetchFeedVideos = async () => {
    try {
      const videos = await getFromLocalStorage("videos");
      if (videos) {
        setFeedVideos(videos);
      } else {
        setFeedVideos(null);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedVideos();
  }, [isFocussed]);

  return (
    <MainContainer
      backgroundColor={Colors.JustWhite}
      fillHeight
      style={styles.mainContainer}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <PaddingContainer>
          <FlexContainer position="rowBetween">
            <QuickActionButton
              style={{ backgroundColor: Colors.LightSkyBlue }}
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
            >
              <CameraIcon height={20} width={20} />
            </QuickActionButton>
            <AppText color={Colors.JustBlack} poppinsSemiBold>
              Explore
            </AppText>
            <QuickActionButton
              style={{ backgroundColor: Colors.LightSkyBlue }}
              onPress={() => navigation.navigate("NotificationsScreen")}
            >
              <HomeNotificationsIcon height={20} width={20} />
            </QuickActionButton>
          </FlexContainer>
        </PaddingContainer>
        <PaddingContainer style={{ paddingHorizontal: 10 }}>
          <StoriesList userDetails={StaticData.allUsers} />
          {feedVideos?.length ? (
            <>
              <Spacer value={25} />
              <View>
                {feedVideos.map((video: VideoType) => {
                  return (
                    <Fragment key={video.videoId}>
                      <VideoCard uri={video.uri} />
                      <Spacer value={20} />
                    </Fragment>
                  );
                })}
              </View>
            </>
          ) : (
            <FlexContainer style={styles.emptyFeed} position="center">
              <VideoNotFound height={100} width={100} />
              <Spacer value={20} />
              <AppText poppinsSemiBold style={styles.emptyFeedText}>
                No videos found. Click on + icon to start recording videos.
              </AppText>
            </FlexContainer>
          )}
        </PaddingContainer>
      </ScrollView>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 0,
  },
  emptyFeed: {
    height: deviceHeight() > 800 ? 450 : 300,
  },
  emptyFeedText: {
    width: 280,
    color: Colors.SkyBlue,
    textAlign: "center",
  },
});
