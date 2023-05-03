import { ProfileScreenDataProps } from "@app/types";
import { Colors, deviceWidth } from "@app/utils";
import React from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

type ProfileGalleryProps = {
  images: ProfileScreenDataProps["galleryImages"];
};

const imageWidth = deviceWidth() / 3;

function ProfileGallery({ images }: ProfileGalleryProps): JSX.Element {
  return (
    <FlatList
      data={images}
      contentContainerStyle={styles.galleryContainer}
      numColumns={3}
      keyExtractor={(image) => image.id.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              //handle image click.
            }}
          >
            <Image source={{ uri: item.url }} style={styles.galleryImage} />
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  galleryContainer: {
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: Colors.JustWhite,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: Colors.JustWhite,
    paddingBottom: 200,
  },
  galleryImage: {
    height: 180,
    width: imageWidth,
    marginHorizontal: 5.5,
    marginVertical: 0.5,
  },
});

export default ProfileGallery;
