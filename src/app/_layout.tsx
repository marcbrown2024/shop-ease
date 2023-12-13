// react components
import React, { useEffect, useState } from "react";

// react native components

// expo components
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

// custom components
import WelcomePage from "./(public)/welcome";

type Props = {};

const RootLayoutNav = (props: Props) => {
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const InitialLayout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded) {
        router.replace("/loading");
      } else {
        const inTabsGroup = segments[0] === "(auth)";
        console.log("Is signed in", isSignedIn);

        if (isSignedIn && !inTabsGroup) {
          router.replace("/home");
        } else if (!isSignedIn) {
          router.replace("/sign-up");
        }
      }
    }, [isSignedIn]);

    return <Slot />;
  };

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;
