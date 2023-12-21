// react components
import React, { useState } from "react";

// react native components
import {
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
import { Ionicons } from "@expo/vector-icons";

interface Item {
  name: string;
  category: string;
  quantity: number;
  notes: string;
}

type Props = {};

const AddItem = (props: Props) => {
  const { isAddItemVisible, setPopUpProps, setAddItemVisible } = globalState();
  const [itemName, setItemName] = useState<string>("");
  const [category, setCategory] = useState<string>("Produce"); // Default category
  const [quantity, setQuantity] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");
  const [recentItems, setRecentItems] = useState<Item[]>([]);

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
      visible={isAddItemVisible}
      onRequestClose={handleCancel}
    >
      <View style={{ backgroundColor: Colors.primary }} className="flex-1">
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
      <ScrollView className="mt-24 px-6">
        <View>
          <Text>Item Name:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
            }}
            value={itemName}
            onChangeText={(text) => setItemName(text)}
          />
        </View>

        <View>
          <Text>Category:</Text>
          {/* <Picker
          selectedValue={category}
          onValueChange={(value: string) => setCategory(value)}
          style={{ height: 50, width: 200 }}
        >
          <Picker.Item label="Produce" value="Produce" />
          <Picker.Item label="Dairy" value="Dairy" />
          <Picker.Item label="Household" value="Household" />
        </Picker> */}
        </View>

        <View>
          <Text>Quantity:</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
            }}
            value={quantity}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(text)}
          />
        </View>

        <View>
          <Text>Notes/Comments:</Text>
          <TextInput
            style={{
              height: 80,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
            }}
            value={notes}
            multiline
            onChangeText={(text) => setNotes(text)}
          />
        </View>

        <TouchableOpacity onPress={handleAddToList}>
          <Text>Add to List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel}>
          <Text>Clear</Text>
        </TouchableOpacity>

        {/* Optional: Display recent items or favorites */}
        {recentItems.length > 0 && (
          <View>
            <Text>Recent Items</Text>
            <ScrollView>
              {recentItems.map((item, index) => (
                <Text key={index}>{item.name}</Text>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      </View>
    </Modal>
  );
};

export default AddItem;
