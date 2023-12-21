// react components
import React, { useEffect, useLayoutEffect, useState } from "react";

// react native components
import AsyncStorage from "@react-native-async-storage/async-storage";

// expo components
import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";

// global state
import { useAuthStore } from "src/store";

// custom components
import SplashScreen from "src/components/SplashScreen";

const Index = () => {
  const { initialized, isLoggedIn } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isFirstTime, setIsFirstTime] = useState(0);

  useEffect(() => {
    if (!initialized || !navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    // If the user is not signed in and the initial segment is not in the auth group.
    if (!isLoggedIn && !inAuthGroup) {
      if (isFirstTime > 0) {
        router.replace("/signIn");
      } else {
        setIsFirstTime(1);
        router.replace("/welcome");
      }
      return;
    }

    // If the user is signed in and the initial segment is not in the auth group.
    if (isLoggedIn && !inAuthGroup) {
      router.replace("/(drawer)/(auth)/home");
    }
  }, [segments, navigationState?.key, initialized, isLoggedIn, isFirstTime]);

  // Show SplashScreen while checking authentication.
  if (!initialized) {
    return <SplashScreen />;
  }

  // Default case: show nothing (you may modify this as needed).
  return null;
};

export default Index;
