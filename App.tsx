import BottomNavBar from "@app/navigation/BottomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NetInfo from "@react-native-community/netinfo";
import { NoNetwork } from "@app/components";

function App(): JSX.Element | null {
  const [noNetwork, setNoNetwork] = useState<boolean>(false);

  useEffect(() => {
    const networkInfoSubscription = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setNoNetwork(true);
      } else {
        setNoNetwork(false);
      }
    });
    return () => networkInfoSubscription();
  });

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <Fragment>
      {noNetwork ? (
        <NoNetwork />
      ) : (
        <NavigationContainer>
          <BottomNavBar />
        </NavigationContainer>
      )}
    </Fragment>
  );
}

export default App;
