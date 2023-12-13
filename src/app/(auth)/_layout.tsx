// react components
import React from "react";

// expo components
import { Tabs } from "expo-router";

type Props = {};

const _layout = (props: Props) => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="message" />
      <Tabs.Screen name="saved-lists" />
    </Tabs>
  );
};

export default _layout;
