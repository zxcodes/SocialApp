import { FlexContainer } from "@app/containers";
import React, { useState } from "react";
import { Image, ImageStyle, StyleSheet, ViewStyle } from "react-native";
import FallbackUserImage from "@assets/images/FallbackImage.png";
import Spacer from "./Spacer";
import AppText from "./AppText";
import { Colors } from "@app/utils";

type DisplayPictureProps = {
  image: string;
  username?: string;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

function DisplayPicture({
  image,
  style,
  username,
  imageStyle,
}: DisplayPictureProps): JSX.Element {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  return (
    <FlexContainer style={{ ...style }}>
      <Image
        onError={() => setImageLoadError((bool) => !bool)}
        source={imageLoadError ? FallbackUserImage : { uri: image }}
        style={{ ...styles.displayPicture, ...imageStyle }}
      />
      <Spacer value={3} />
      <AppText poppinsBold>{username}</AppText>
    </FlexContainer>
  );
}

const styles = StyleSheet.create({
  displayPicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 3.5,
    borderColor: Colors.JustWhite,
  },
});

export default DisplayPicture;

// <DisplayPicture
//  username={username}
//  image={displayPicture}
//  style
// />
