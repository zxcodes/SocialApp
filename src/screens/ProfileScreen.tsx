/* eslint-disable react-native/no-inline-styles */
import {
  AppButton,
  AppText,
  DisplayPicture,
  ProfileGallery,
  ProfileStats,
  Spacer,
} from "@app/components";
import {
  FlexContainer,
  MainContainer,
  PaddingContainer,
} from "@app/containers";
import StaticData from "@app/static/profileData.json";
import { BottomScreensParamsList } from "@app/types";
import { Colors, defaultStyles } from "@app/utils";
import ProfileBackgroundImage from "@assets/images/ProfileBackground.png";
import { BackArrowCircleIcon, MessageIcon } from "@assets/svg";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

type ProfileScreenProps = BottomTabScreenProps<
  BottomScreensParamsList,
  "ProfileScreen"
>;

export default function ProfileScreen({
  navigation,
  route,
}: ProfileScreenProps): JSX.Element {
  const { bio, followers, following, username, displayPicture } = route.params;

  function handleOnFollowClick() {
    return null;
  }

  function handleOnMessageClick() {
    return null;
  }

  return (
    <MainContainer
      fillHeight
      style={styles.mainContainer}
      backgroundColor={Colors.LightSkyBlue}
    >
      <ImageBackground
        source={ProfileBackgroundImage}
        style={styles.profileBackgroundImage}
      >
        <Spacer value={10} />
        <PaddingContainer>
          <FlexContainer position="rowBetween">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <BackArrowCircleIcon height={35} width={35} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                //Handle click.
              }}
            >
              <MessageIcon height={38} width={38} />
            </TouchableOpacity>
          </FlexContainer>
        </PaddingContainer>
      </ImageBackground>
      <Spacer value={10} />
      <PaddingContainer style={styles.profileContainer}>
        <Spacer value={15} />
        <FlexContainer position="rowBetween">
          <ProfileStats
            stat={followers}
            indicatorText="Followers"
            style={styles.profileStats}
          />
          <DisplayPicture
            username={username}
            image={displayPicture}
            style={styles.displayPictureHolder}
          />
          <ProfileStats
            stat={following}
            indicatorText="Following"
            style={styles.profileStats}
          />
        </FlexContainer>
        <Spacer value={20} />
        <FlexContainer position="center">
          <AppText extraSmall style={styles.bioText}>
            {bio}
          </AppText>
        </FlexContainer>
        <Spacer value={20} />
        <FlexContainer direction="row" position="center">
          <AppButton onPress={handleOnFollowClick}>Follow</AppButton>
          <Spacer value={20} between />
          <AppButton
            onPress={handleOnMessageClick}
            textStyle={{ color: Colors.JustBlack }}
            style={styles.secondaryButtonAction}
          >
            Message
          </AppButton>
        </FlexContainer>
        <Spacer value={15} />
        <FlexContainer position="center" direction="row">
          <AppText
            small
            style={{ borderBottomColor: "#6C7A9C", borderBottomWidth: 3 }}
          >
            All
          </AppText>
          <Spacer value={20} between />
          <AppText small>Photos</AppText>
          <Spacer value={20} between />
          <AppText small>Videos</AppText>
        </FlexContainer>
        <Spacer value={15} />
        <ProfileGallery images={StaticData.profileData.galleryImages} />
      </PaddingContainer>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  profileBackgroundImage: {
    height: 240,
    width: "100%",
  },
  mainContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  profileContainer: {
    // flex: 1,
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: Colors.LightSkyBlue,
    marginTop: -70,
    paddingHorizontal: 0,
  },
  profileStats: {
    marginHorizontal: 30,
  },
  displayPictureHolder: {
    position: "absolute",
    top: -30,
    left: "50%",
    marginLeft: -50,
    marginTop: -50,
  },
  bioText: {
    color: "#6C7A9C",
    textAlign: "center",
    width: 280,
  },
  secondaryButtonAction: {
    backgroundColor: Colors.JustWhite,
    ...defaultStyles.boxShadow,
    shadowColor: "#202020",
  },
});
