// react components
import React, { useState } from "react";

// react native components
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
  Image,
  useWindowDimensions,
} from "react-native";

// expo component
import { router } from "expo-router";

// global state
import { globalState } from "src/store";

// custom components

// constants
import Colors from "src/constants/colors";

// icons
import { Entypo, Ionicons } from "@expo/vector-icons";
import AddItem from "src/components/createItem/AddItem";

const categories = [
  { label: "All" },
  { label: "Food" },
  { label: "Fruits" },
  { label: "Vegetables" },
  { label: "Dairy" },
  { label: "Snacks" },
  { label: "Beverages" },
  { label: "Meat and Poultry" },
  { label: "Seafood" },
  { label: "Bakery" },
  { label: "Canned Goods" },
  { label: "Frozen Foods" },
  { label: "Condiments and Sauces" },
  { label: "Grains and Pasta" },
  { label: "Deli" },
  { label: "Baby Products" },
  { label: "Personal Care" },
  { label: "Health and Wellness" },
  { label: "Cleaning Supplies" },
  { label: "Pet Supplies" },
  { label: "Electronics" },
  // Add more categories as needed
];

interface ItemList {
  default: boolean;
  priority: string;
  shoppingDate: string;
}

const ListItem = () => {
  const { setAddItemVisible } = globalState();
  const [searchItems, setSearchItems] = useState("");
  const [itemList, setItemList] = useState<ItemList[]>([]);
  const { height } = useWindowDimensions();

  const openAddItem = () => {
    setAddItemVisible(true);
  };

  return (
    <View className="flex-1 justify-center items-center space-y-8 bg-[#cb4834] p-6">
      <View className="h-fit w-full flex-row items-center justify-between mt-28">
        <TouchableOpacity
          onPress={() => router.replace("/(drawer)/(auth)/home")}
          className="h-fit w-1/12 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <View className="h-10 w-10/12  justify-center border border-slate-200">
          {/* <Text className="text-2xl text-white font-bold">{listName}</Text> */}
        </View>
      </View>
      <View className="h-full w-full space-y-6">
        <View className="h-14 flex-row items-center space-x-4 bg-[#9f3c2dfd] p-2 rounded-md">
          <Entypo name="magnifying-glass" size={36} color="white" />
          <TextInput
            placeholder="Search List"
            placeholderTextColor="#fff"
            value={searchItems}
            onChangeText={(text) => setSearchItems(text)}
            className="h-full w-full text-base text-white"
          />
        </View>
        <View className="w-full justify-center space-y-4 py-2">
          <Text className="text-lg text-white font-bold">Category</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="space-x-6"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className="h-10 w-fit items-center justify-center bg-[#f1f1f1] px-5 rounded-full"
              >
                <Text
                  style={{
                    color: Colors.primary,
                  }}
                  className="text-base font-bold"
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {itemList.length === 0 ? (
          <View className="h-96 w-full items-center justify-center space-y-10">
            <View>
              <Image
                source={require("../../../../assets/images/emptyCart.png")}
                resizeMode="contain"
                style={{
                  height: height <= 800 ? 180 : 250,
                  width: height <= 800 ? 180 : 250,
                }}
              />
              <TouchableOpacity
                onPress={openAddItem}
                className="h-10 w-10 absolute top-10 -right-2 bg-[#cb4834] pl-1 rounded-full"
              >
                <Ionicons name="add-circle" size={36} color="white" />
              </TouchableOpacity>
            </View>
            <View className="w-full">
              <Text className="w-full text-center text-4xl text-white font-bold">
                Your List is Empty
              </Text>
              <Text className="h-20 w-5/6 md:w-full text-base text-white md:text-center font-bold mt-4 mx-8">
                Create an item and add it to your trolley so you can Shop@Ease.
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text className="text-lg text-white font-bold">Items</Text>
          </View>
        )}
      </View>
      <AddItem />
    </View>
  );
};

export default ListItem;

{
  /* Optional: Clear or Cancel Button */
}
{
  /* Optional: Notes/Comments Section */
}
{
  /* Optional: Recent Items or Favorites Section */
}
{
  /* Optional: Visual Feedback for Successful Addition */
}
{
  /* Optional: Error Handling Messages */
}
