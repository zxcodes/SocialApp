/* eslint-disable react-native/no-inline-styles */
import { UserDetailsType } from "@app/types";
import { Colors, isAndroid } from "@app/utils";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";
import Spacer from "./Spacer";
import FallbackUserImage from "@assets/images/FallbackImage.png";

type StoriesListProps = {
  userDetails: UserDetailsType;
  style?: ImageStyle;
};

function handleStoryClick() {
  return null;
}

function StoryImage({
  uri,
  style,
}: {
  uri: string;
  style?: ImageStyle;
}): JSX.Element {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  return (
    <Image
      onError={() => setImageLoadError((bool) => !bool)}
      borderRadius={100}
      source={imageLoadError ? FallbackUserImage : { uri: uri }}
      style={{
        ...styles.image,
        ...style,
      }}
    />
  );
}

function StoriesList({ userDetails }: StoriesListProps): JSX.Element {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      initialNumToRender={7}
      data={userDetails}
      keyExtractor={(item) => item.userId}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleStoryClick}
            style={{
              ...styles.container,
            }}
          >
            <View
              style={{
                ...(item.hasStory ? styles.hasStory : {}),
                borderRadius: 100,
              }}
            >
              <StoryImage uri={item.displayPicture} />
            </View>
            <Spacer value={2} />
            <AppText poppinsSemiBold small>
              {item.username}
            </AppText>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: isAndroid ? 74 : 70,
    width: isAndroid ? 74 : 70,
    borderWidth: 3,
    borderColor: Colors.JustWhite,
  },
  hasStory: {
    borderWidth: 2.5,
    borderColor: Colors.SkyBlue,
  },
});

export default StoriesList;
