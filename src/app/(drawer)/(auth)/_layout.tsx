// react components
import React from "react";

// react native components
import { StyleSheet } from "react-native";

// expo components
import { Tabs } from "expo-router";
import SideBarIcon from "src/components/SideMenu/SideBarIcon";

// custom components
import { useAuthStore } from "src/store";
import TabButton from "../../../components/TabButton";

// icons
import { Icons } from "../../../constants/icons";

type Props = {};

const TabArr = [
  {
    route: "home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
  },
  {
    route: "listItems",
    label: "Search",
    type: Icons.Feather,
    icon: "search",
  },
  {
    route: "messages",
    label: "Add",
    type: Icons.AntDesign,
    icon: "pluscircle",
  },
  {
    route: "saved-lists",
    label: "Like",
    type: Icons.Feather,
    icon: "heart",
  },
  {
    route: "settings",
    label: "Account",
    type: Icons.FontAwesome,
    icon: "user-circle-o",
  },
];

export default function AuthLayout() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) return;
  return (
    <>
      <SideBarIcon />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tabs.Screen
              key={index}
              name={item.route}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#cb4834",
  },
});
