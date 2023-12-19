// react components
import React, { useEffect } from "react";

// react native components

// expo components
import { useRootNavigationState } from "expo-router";
import { useRouter, useSegments } from "expo-router";

// global state
import { useAuthStore } from "src/store";

// custom components
import SplashScreen from "src/components/SplashScreen";

const Index = () => {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  const { initialized, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything
      //  segment is not anything in the auth group.
      !isLoggedIn &&
      !inAuthGroup
    ) {
      // Redirect to the login page.
      router.replace("/signIn");
    } else if (isLoggedIn && !inAuthGroup) {
      // go to tabs root.
      router.replace("/(auth)/home");
    }
  }, [segments, navigationState?.key, initialized]);

  return <SplashScreen />;
};

export default Index;

// // Use useLayoutEffect for synchronous UI updates
// useLayoutEffect(() => {
//   // Check if it's the first time the app is opened
//   const checkFirstTime = async () => {
//     try {
//       const value = await AsyncStorage.getItem("firstTime");
//       if (value === null) {
//         setIsFirstTime(true);
//         await AsyncStorage.setItem("firstTime", "false");
//       } else {
//         setIsFirstTime(false);
//       }
//     } catch (error) {
//       console.error("Error reading AsyncStorage:", error);
//     }
//   };

//   checkFirstTime();

//   // Simulate app loading with a delay
//   const loadingTimeout = setTimeout(() => {
//     setAppLoading(false);
//   }, 3000);

//   return () => clearTimeout(loadingTimeout);
// }, []);
