// react components
import React from "react";

// react native components

// expo components
import { Drawer } from "expo-router/drawer";

// global components
import { useAuthStore } from "src/store";

// custom components
import {SideBar} from "src/components/SideMenu/SideBar";

// icons
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Fontisto,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type Props = {};

const AuthLayout: React.FC<Props> = (props: Props) => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) return null;

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <SideBar {...props} />}
    />
  );
};

export default AuthLayout;
