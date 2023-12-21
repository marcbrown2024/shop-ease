// react components
import React from "react";

// react native components
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

// constants
import Colors from "src/constants/colors";

// icons
import { MaterialIcons } from "@expo/vector-icons";

interface collaboratorsList {
  email: string;
  image: string;
}

interface ShoppingListItem {
  default: boolean;
  priority: string;
  shoppingDate: string;
  id: string;
  title: string;
  collaborators: collaboratorsList[];
  listColor: string;
}

// Your component props
interface Props {
  shoppingList: ShoppingListItem[];
}

const RecentList = (props: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={true} className="space-y-4">
      {props.shoppingList.map((list) => (
        <TouchableOpacity
          key={list.id}
          className="h-14 w-full md:w-3/6 flex-row items-center space-x-5"
        >
          <View className="h-full w-fit items-center justify-center">
            <Image
              source={require("../../../assets/images/favicon.png")}
              resizeMode="contain"
            />
          </View>
          <View className="w-96 space-y-1">
            <Text
              style={{ color: Colors.primary }}
              className="text-base font-bold"
            >
              {list.title}
            </Text>
            <Text className="text-slate-500">{list.shoppingDate}</Text>
          </View>
          <MaterialIcons
            name="arrow-forward-ios"
            size={28}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RecentList;
