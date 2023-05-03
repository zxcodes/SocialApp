/* eslint-disable react-native/no-inline-styles */
import { AppButton, AppText, Spacer } from "@app/components";
import {
  FlexContainer,
  MainContainer,
  PaddingContainer,
} from "@app/containers";
import { BottomScreensParamsList } from "@app/types";
import { Colors, alert } from "@app/utils";
import { MAX_VIDEO_RECORDING_LENGTH } from "@app/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import ObjectID from "bson-objectid";
import { ResizeMode, Video } from "expo-av";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";

type CameraScreenProps = BottomTabScreenProps<
  BottomScreensParamsList,
  "CameraScreen"
>;

async function getVideosFromAsyncStorage() {
  try {
    const videosJson = await AsyncStorage.getItem("videos");
    return videosJson ? JSON.parse(videosJson) : [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
}

async function addVideoToLocalStorage(uri: string, videoId: ObjectID) {
  try {
    const existingVideos = await getVideosFromAsyncStorage();
    const updatedVideos = [{ uri, videoId }, ...existingVideos];
    await AsyncStorage.setItem("videos", JSON.stringify(updatedVideos));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function CameraScreen({ navigation }: CameraScreenProps): JSX.Element | null {
  const cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>();
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useState<boolean>();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<string>("");
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const isFocussed = useIsFocused();

  const getAudioAndCameraPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const microphonePermission =
      await Camera.requestMicrophonePermissionsAsync();

    setHasCameraPermission(cameraPermission.status === "granted");
    setHasMicrophonePermission(microphonePermission.status === "granted");
  };

  useEffect(() => {
    getAudioAndCameraPermissions();
  }, []);

  if (
    !hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return (
      <>
        <Spacer value={20} />
        <PaddingContainer>
          <AppText>Getting permissions...</AppText>
        </PaddingContainer>
      </>
    );
  } else if (!hasCameraPermission || !hasMicrophonePermission) {
    return (
      <>
        <Spacer value={20} />
        <FlexContainer position="center" fillHeight>
          <AppText poppinsSemiBold style={styles.noPermissionsText}>
            Permissions for camera or audio were not granted. Please grant them
            and try again.
          </AppText>
        </FlexContainer>
      </>
    );
  }

  const recordVideo = () => {
    setIsRecording(true);
    const recordingOptions = {
      quality: "480p",
      maxDuration: MAX_VIDEO_RECORDING_LENGTH,
      mute: false,
    };

    cameraRef.current?.recordAsync(recordingOptions).then((recordedVideo) => {
      setVideo(recordedVideo.uri);
      setIsRecording(false);
    });
  };

  const stopVideoRecording = () => {
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  if (video) {
    return (
      <MainContainer fillHeight>
        <FlexContainer fillHeight position="center">
          <Video
            shouldPlay
            style={styles.videoPreview}
            source={{ uri: video }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
          />
          <Spacer value={20} />
          <FlexContainer direction="row">
            <AppButton onPress={() => setVideo("")}>Discard</AppButton>
            <Spacer value={10} between />
            <AppButton
              onPress={async () => {
                if (video) {
                  await addVideoToLocalStorage(video, ObjectID());
                  navigation.navigate("HomeScreen");
                  setVideo("");
                } else {
                  alert("Saving failed.", "Please try again.");
                }
              }}
            >
              Post
            </AppButton>
          </FlexContainer>
        </FlexContainer>
      </MainContainer>
    );
  }

  return isFocussed ? (
    <>
      <Camera
        style={styles.cameraView}
        ref={cameraRef}
        onCameraReady={() => {
          setCameraReady(true);
        }}
      />
      <Spacer value={20} />
      <FlexContainer>
        <AppButton
          disabled={cameraReady ? false : true}
          onPress={isRecording ? stopVideoRecording : recordVideo}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </AppButton>
      </FlexContainer>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  cameraView: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  videoPreview: {
    flex: 0.8,
    alignSelf: "stretch",
    borderRadius: 15,
  },
  noPermissionsText: {
    textAlign: "center",
    color: Colors.SkyBlue,
    paddingHorizontal: 30,
  },
});

export default CameraScreen;
