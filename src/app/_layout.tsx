// react components
import React from "react";

// react native components
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

// expo components
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

// custom components
import SplashScreen from "src/components/SplashScreen";
import AppPopUps from "src/components/AppPopUps";

// global store
import { globalState } from "src/store";

export default function RootLayout() {
  const { loading } = globalState();

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    // The native splash screen will stay visible for as long as there
    // are `<SplashScreen />` components mounted. This component can be nested.

    return <SplashScreen />;
  }

  return (
    <>
      <AppPopUps />
      <Spinner visible={loading} />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </>
  );
}
