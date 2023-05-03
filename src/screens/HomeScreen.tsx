/* eslint-disable react-native/no-inline-styles */
import {
  AppText,
  QuickActionButton,
  Spacer,
  StoriesList,
  VideoCard,
} from "@app/components";
import Space from "@app/components/Spacer";
import {
  FlexContainer,
  MainContainer,
  PaddingContainer,
} from "@app/containers";
import StaticData from "@app/static/profileData.json";
import { VideoType } from "@app/types";
import { Colors, deviceHeight, getFromLocalStorage } from "@app/utils";
import { CameraIcon, HomeNotificationsIcon, VideoNotFound } from "@assets/svg";
import { useIsFocused } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

function handleNotifications() {
  return null;
}

function handleCameraLaunch() {
  return null;
}

export default function HomeScreen(): JSX.Element {
  const isFocussed = useIsFocused();
  const [feedVideos, setFeedVideos] = useState<any>();

  const fetchFeedVideos = async () => {
    try {
      const res = await getFromLocalStorage("videos");
      if (res) {
        setFeedVideos(res);
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
      <ScrollView>
        <Space value={10} />
        <PaddingContainer>
          <FlexContainer position="rowBetween">
            <QuickActionButton
              style={{ backgroundColor: Colors.LightSkyBlue }}
              onPress={handleCameraLaunch}
            >
              <CameraIcon height={20} width={20} />
            </QuickActionButton>
            <AppText color={Colors.JustBlack} poppinsSemiBold>
              Explore
            </AppText>
            <QuickActionButton
              style={{ backgroundColor: Colors.LightSkyBlue }}
              onPress={handleNotifications}
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
