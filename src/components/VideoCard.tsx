/* eslint-disable react-native/no-inline-styles */
import { FlexContainer, PaddingContainer } from "@app/containers";
import StaticData from "@app/static/profileData.json";
import { Colors } from "@app/utils";
import { MAX_VIDEO_CARD_ICON_SIZE } from "@app/utils/constants";
import { HeartIcon, MoreIcon, SaveIcon, ShareIcon } from "@assets/svg";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./AppText";
import DisplayPicture from "./DisplayPicture";
import QuickActionButton from "./QuickActionButton";
import Spacer from "./Spacer";

type VideoCardProps = {
  uri: string;
  noOfLikes?: string;
};

function VideoCard({ uri }: VideoCardProps): JSX.Element | null {
  const video = useRef(null);
  const [onVideoLoad, setOnVideoLoad] = useState<boolean>(false);

  return uri ? (
    <PaddingContainer style={styles.cardContainer}>
      <FlexContainer
        position="start"
        direction="row"
        style={{ paddingHorizontal: 10 }}
      >
        <DisplayPicture
          imageStyle={styles.userImage}
          image={StaticData.allUsers[0].displayPicture}
        />
        <Spacer value={5} between />
        <View>
          <AppText small poppinsSemiBold>
            Kanat
          </AppText>
          <AppText small style={{ marginTop: -5 }}>
            {`@${StaticData.allUsers[0].username}`}
          </AppText>
        </View>
      </FlexContainer>
      <Video
        ref={video}
        style={styles.videoPlayer}
        source={{
          uri: uri,
        }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        onLoad={() => setOnVideoLoad((bool) => !bool)}
      />
      <FlexContainer style={styles.cardActions} position="rowBetween">
        <FlexContainer direction="row">
          <QuickActionButton
            disabled={onVideoLoad ? false : true}
            noBackground
            onPress={() => {
              //Handle on more click.
            }}
          >
            <MoreIcon
              height={MAX_VIDEO_CARD_ICON_SIZE}
              width={MAX_VIDEO_CARD_ICON_SIZE}
            />
          </QuickActionButton>
          <Spacer value={6} between />
          <QuickActionButton
            disabled={onVideoLoad ? false : true}
            noBackground
            onPress={() => {
              //Handle on like.
            }}
          >
            <HeartIcon
              height={MAX_VIDEO_CARD_ICON_SIZE}
              width={MAX_VIDEO_CARD_ICON_SIZE}
            />
          </QuickActionButton>
        </FlexContainer>
        <FlexContainer direction="row">
          <QuickActionButton
            disabled={onVideoLoad ? false : true}
            noBackground
            onPress={() => {
              //Handle on share click.
            }}
          >
            <ShareIcon
              height={MAX_VIDEO_CARD_ICON_SIZE}
              width={MAX_VIDEO_CARD_ICON_SIZE}
            />
          </QuickActionButton>
          <Spacer value={5} between />
          <QuickActionButton
            disabled={onVideoLoad ? false : true}
            noBackground
            onPress={() => {
              //Handle on save click.
            }}
          >
            <SaveIcon
              height={MAX_VIDEO_CARD_ICON_SIZE}
              width={MAX_VIDEO_CARD_ICON_SIZE}
            />
          </QuickActionButton>
        </FlexContainer>
      </FlexContainer>
    </PaddingContainer>
  ) : null;
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 50,
    height: 400,
    backgroundColor: Colors.LightSkyBlue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 5,
  },
  userImage: {
    height: 40,
    width: 40,
    borderWidth: 2.5,
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: Colors.JustWhite,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -5,
  },
  cardActions: {
    height: 50,
    backgroundColor: Colors.SkyBlueMedium,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 25,
  },
});

export default VideoCard;
