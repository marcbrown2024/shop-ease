// react components
import React from "react";

// react native components

// expo components
import { Tabs } from "expo-router";
import SideBar from "src/components/SideMenu/SideBar";

// custom components

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <>
      <SideBar />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="message" />
        <Tabs.Screen name="saved-lists" />
      </Tabs>
    </>
  );
};

export default AuthLayout;
