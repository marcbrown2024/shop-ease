// react components
import React from "react";

// expo components
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen name="signIn" options={{ animation: "slide_from_right" }} />
      <Stack.Screen name="signUp" options={{ animation: "slide_from_right" }} />
      <Stack.Screen
        name="forgetPassword"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
};

export default PublicLayout;
