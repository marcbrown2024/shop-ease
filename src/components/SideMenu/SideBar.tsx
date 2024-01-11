// react components
import React, { useState } from "react";

// react native components
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

// expo components
import { router, usePathname } from "expo-router";

// custom components

// constants
import Colors from "src/constants/colors";

// icons
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export const SideBar: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const pathName = usePathname();

  const [defaultImage, setDefaultImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/shop-ease-18b7c.appspot.com/o/defaultImage.png?alt=media&token=d787ba0d-dcde-4879-9e34-c400e8b345c3"
  );

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: Colors.primary }}
    >
      <View className="absolute h-32 w-full">
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/shop-ease-6760b.appspot.com/o/freshProduce.jpg?alt=media&token=5c2f65f0-eedf-4b6a-a44f-672ac35a0ba5",
          }}
          resizeMode="stretch"
          className="h-full w-full"
        />
      </View>
      <View className="h-fit w-full mt-24">
        <View className="flex-row items-center space-x-6 border-b border-[#d68752] py-4">
          <View className="relative h-16 w-16 md:h-20 md:w-20 rounded-full">
            <Image
              source={{
                uri: defaultImage,
              }}
              className="h-full w-full"
            ></Image>
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                shadowColor: "rgba(0,0,0,0.4)",
                shadowOpacity: 0.3,
                elevation: 12,
              }}
              className="absolute bottom-0 right-0 bg-slate-400 p-1 rounded-full"
            >
              <Entypo name="edit" size={22} color="black" />
            </TouchableOpacity>
          </View>
          <View className="space-y-4">
            <View className="space-y-2">
              <Text className="text-base md:text-lg text-white font-bold">
                Santasha Johnson
              </Text>
              <Text className="text-xs md:text-sm text-white">
                +1 (803) 599-0763
              </Text>
              <Text className="text-xs md:text-sm text-white">
                santashajohnson818@gmail.com
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity>
                <AntDesign name="google" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="apple1" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="My Lists"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name="clipboard-list"
            size={28}
            color="#fff"
          />
        )}
      />
      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Add Items"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons
            name="clipboard-plus"
            size={28}
            color="#fff"
          />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Saved List"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <AntDesign name="heart" size={26} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Share Lists"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="share" size={30} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Notifications"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <MaterialIcons name="notifications" size={30} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Messages"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <Ionicons name="chatbubbles" size={26} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Tutorial/Help"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <FontAwesome5 name="chalkboard-teacher" size={22} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Chat and Support"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <FontAwesome5 name="headset" size={24} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="About ShopEase"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="information" size={26} color="#fff" />
        )}
      />

      <DrawerItem
        onPress={() => router.push("/saved-lists")}
        label="Settings"
        labelStyle={{ color: "#fff" }}
        style={{
          backgroundColor:
            pathName === "/saved-lists" ? "#9f3c2dfd" : undefined,
        }}
        icon={({ color, size }) => (
          <FontAwesome name="gear" size={26} color="#fff" />
        )}
      />
    </DrawerContentScrollView>
  );
};
