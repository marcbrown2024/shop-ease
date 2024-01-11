// react components
import React, { useState } from "react";

// react native components
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// global state
import { globalState } from "src/store";

// constants
import Colors from "src/constants/colors";

// icons
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

interface Item {
  name: string;
  category: string;
  quantity: number;
  notes: string;
}

const categories = [
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

type Props = {};

const AddItem = (props: Props) => {
  const { isAddItemVisible, setPopUpProps, setAddItemVisible } = globalState();
  const [itemName, setItemName] = useState<string>("");
  const [category, setCategory] = useState<string>("Produce"); // Default category
  const [quantity, setQuantity] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<boolean>(true);

  const handleAddToList = () => {
    // Validate input if needed
    // Add the item to the shopping list or perform necessary actions
    const newItem: Item = {
      name: itemName,
      category,
      quantity: parseInt(quantity, 10),
      notes,
    };

    // Update the recentItems state
    setRecentItems([newItem, ...recentItems]);

    // Reset input fields
    setItemName("");
    setCategory("Produce");
    setQuantity("1");
    setNotes("");
    setAddItemVisible(false);
  };

  const handleCancel = () => {
    // Reset input fields
    setItemName("");
    setCategory("Produce");
    setQuantity("1");
    setNotes("");
    setAddItemVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isAddItemVisible}
      onRequestClose={handleCancel}
    >
      <View className="flex-1 bg-black/30">
        <View
          style={{
            backgroundColor: Colors.primary,
            borderRadius: allItems ? 25 : 0,
          }}
          className="absolute bottom-0 h-4/6 w-full px-6"
        >
          <TouchableOpacity
            onPress={handleCancel}
            style={{
              height: 45,
              width: 45,
              position: "absolute",
              top: Platform.OS === "ios" ? 40 : 20,
              right: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#d75541",
              borderRadius: 50,
              padding: 8,
              shadowColor: "rgba(0,0,0,1)",
              shadowOpacity: 0.1,
              elevation: 15,
            }}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <View className="space-y-8">
            <View className="w-full justify-center space-y-4 mt-24">
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
            <View className="w-full flex-row space-x-2">
              <TouchableOpacity className="h-60 w-1/2 md:w-48 p-2 bg-white rounded-xl">
                <Text
                  style={{ color: Colors.primary }}
                  className="text-xl text-white font-bold"
                >
                  Pineapple
                </Text>
                <Image
                  source={{
                    uri: "https://www.dole.com/-/media/project/dole/produce-images/fruit/pineapple_cut_web.png?rev=7b07a669415341b486c4d98d1d0e3fef&hash=947A67FA0B6FA57B38F0744DE9F2E29F",
                  }}
                  resizeMode="contain"
                  className="h-40 w-full"
                ></Image>
                <View className="h-8 w-full flex-row items-end justify-between">
                  <TouchableOpacity>
                    <AntDesign name="heart" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity className="">
                    <FontAwesome
                      name="cart-plus"
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="h-60 w-1/2 md:w-48 p-2 bg-white rounded-xl">
                <Text
                  style={{ color: Colors.primary }}
                  className="text-xl text-white font-bold"
                >
                  Grapes
                </Text>
                <Image
                  source={{
                    uri: "https://binksberryhollow.com/wp-content/uploads/2021/12/purple-grape-1030x1030.png",
                  }}
                  resizeMode="contain"
                  className="h-40 w-full"
                ></Image>
                <View className="h-8 w-full flex-row items-end justify-between">
                  <TouchableOpacity>
                    <AntDesign name="heart" size={24} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <FontAwesome
                      name="cart-plus"
                      size={28}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddItem;

// <ScrollView className="mt-24 px-6">
//           <View>
//             <Text>Category:</Text>
//             {/* <Picker
//           selectedValue={category}
//           onValueChange={(value: string) => setCategory(value)}
//           style={{ height: 50, width: 200 }}
//         >
//           <Picker.Item label="Produce" value="Produce" />
//           <Picker.Item label="Dairy" value="Dairy" />
//           <Picker.Item label="Household" value="Household" />
//         </Picker> */}
//           </View>

//           <View>
//             <Text>Quantity:</Text>
//             <TextInput
//               style={{
//                 height: 40,
//                 borderColor: "gray",
//                 borderWidth: 1,
//                 marginBottom: 10,
//               }}
//               value={quantity}
//               keyboardType="numeric"
//               onChangeText={(text) => setQuantity(text)}
//             />
//           </View>

//           <View>
//             <Text>Notes/Comments:</Text>
//             <TextInput
//               style={{
//                 height: 80,
//                 borderColor: "gray",
//                 borderWidth: 1,
//                 marginBottom: 10,
//               }}
//               value={notes}
//               multiline
//               onChangeText={(text) => setNotes(text)}
//             />
//           </View>

//           <TouchableOpacity onPress={handleAddToList}>
//             <Text>Add to List</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleCancel}>
//             <Text>Clear</Text>
//           </TouchableOpacity>

//           {/* Optional: Display recent items or favorites */}
//           {recentItems.length > 0 && (
//             <View>
//               <Text>Recent Items</Text>
//               <ScrollView>
//                 {recentItems.map((item, index) => (
//                   <Text key={index}>{item.name}</Text>
//                 ))}
//               </ScrollView>
//             </View>
//           )}
//         </ScrollView>
