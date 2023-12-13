// react components
import React from "react";

// expo components
import { Stack } from 'expo-router'

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="reset" />
    </Stack>
  )
}

export default _layout