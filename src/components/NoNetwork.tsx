/* eslint-disable react-native/no-inline-styles */
import { FlexContainer } from "@app/containers";
import React from "react";
import NoNetworkIndicatorImage from "@assets/images/NoNetwork.png";
import Spacer from "./Spacer";
import AppText from "./AppText";
import { Colors } from "@app/utils";
import { Image } from "react-native";

function NoNetwork(): JSX.Element {
  return (
    <FlexContainer fillHeight position="center">
      <Image
        source={NoNetworkIndicatorImage}
        style={{ height: 200, width: 200 }}
      />
      <Spacer value={10} />
      <AppText
        poppinsSemiBold
        style={{ color: Colors.SkyBlue, width: 290, textAlign: "center" }}
      >
        Uh, oh! Looks like you aren't connected to the internet.
      </AppText>
    </FlexContainer>
  );
}

export default NoNetwork;
