// react components
import React from "react";

// react native components
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// expo components
import { router } from "expo-router";

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

const ActiveLists = (props: Props) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      className="space-x-4"
    >
      {props.shoppingList.map((list) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/(drawer)/(auth)/listItems`,
              params: { listTitle: list.title, listShoppingDate: list.shoppingDate },
            })
          }
          key={list.id}
          style={{ backgroundColor: list.listColor }}
          className="h-fit w-80 justify-between bg-slate-500 px-6 py-4 m-auto rounded-xl"
        >
          <Text className="text-lg text-white font-bold">{list.title}</Text>
          <View className="h-16 w-5/6 flex-row items-end space-x-4">
            <View className="h-fit w-1/2">
              <Text className="text-sm text-slate-200">Due Date</Text>
              <Text className="text-sm text-white font-semibold">
                {list.shoppingDate}
              </Text>
            </View>
            <View className="h-fit w-1/2">
              <Text className="text-sm text-slate-200">Total Cost</Text>
              <Text className="text-sm text-white font-semibold">$1280.50</Text>
            </View>
          </View>
          <View className="h-16 w-full justify-end">
            <View className="h-10 w-10 bg-slate-400 rounded-full"></View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ActiveLists;
