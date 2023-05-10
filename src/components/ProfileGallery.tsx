import { ProfileScreenDataProps } from "@app/types";
import { Colors, deviceWidth } from "@app/utils";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

type ProfileGalleryProps = {
  images: ProfileScreenDataProps["galleryImages"];
};

const imageWidth = deviceWidth() / 3.3;

function ProfileGallery({ images }: ProfileGalleryProps): JSX.Element {
  return (
    <ScrollView
      contentContainerStyle={styles.galleryContainer}
      showsVerticalScrollIndicator={false}
      horizontal
    >
      {images.map((image) => {
        return (
          <TouchableOpacity
            key={image.id}
            onPress={() => {
              //handle image click.
            }}
          >
            <Image source={{ uri: image.url }} style={styles.galleryImage} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    backgroundColor: Colors.LightSkyBlue,
    paddingBottom: 200,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: deviceWidth(),
  },
  galleryImage: {
    height: 180,
    width: imageWidth,
    marginHorizontal: 5.5,
    marginVertical: 5.5,
  },
});

export default ProfileGallery;
