// react components
import React, { useState } from "react";

// react native components
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";

// expo components
import { StatusBar } from "expo-status-bar";
import CheckBox from "expo-checkbox";

// firebase components
import { FIREBASE_DB } from "config/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// global state
import { shoppingListState, usePopUpStore } from "src/store";

// custom components
import GradientButton from "./GradientButton";
// import Collaborators from "../Collaborators";

// icons
import { Ionicons } from "@expo/vector-icons";

const AddList = () => {
  const { isAddListVisible, setAddListVisible, setCollaboratorsVisible } =
    shoppingListState();
  const { setPopUpProps } = usePopUpStore();
  const auth = getAuth();
  const user = auth.currentUser;
  const [listName, setListName] = useState("");
  const [shoppingdate, setShoppingdate] = useState("");
  const [listPriority, setListPriority] = useState("");
  const [isChecked, setChecked] = useState(false);

  const buttonConfigurations = [
    {
      colors: ["#3BB273", "#3CB893"],
      onPress: () => setListPriority("Low"),
      text: "Low",
    },
    {
      colors: ["#FDE74C", "#FDCB35"],
      onPress: () => setListPriority("Medium"),
      text: "Medium",
    },
    {
      colors: ["#FF5656", "#C16868"],
      onPress: () => setListPriority("High"),
      text: "High",
    },
  ];

  const handleClearList = () => {
    // Reset the form after clearing list
    setListName("");
    setShoppingdate("");
    setListPriority("");
    setChecked(false);
  };

  const handleCloseList = () => {
    // Reset the form after closing form
    setAddListVisible(false);
    setListName("");
    setShoppingdate("");
    setListPriority("");
    setChecked(false);
  };

  const handleAddList = async () => {
    if (user) {
      // User is signed in
      const userId = user.uid;

      // Construct the path for the collection with the user's ID
      const shoppingListsCollection = collection(
        FIREBASE_DB,
        "users",
        userId,
        "ShoppingLists"
      );

      // Add a new document to the user's ShoppingLists collection
      const doc = await addDoc(shoppingListsCollection, {
        title: listName,
        ShoppingDate: shoppingdate,
        Priority: listPriority,
        Default: isChecked,
      });
      setPopUpProps({
        visible: true,
        typeMessage: "success",
        title: "Sucess",
        message: "Your list was successfully created.",
      });
      // Reset the form after adding list
      setListName("");
      setShoppingdate("");
      setListPriority("");
      setChecked(false);
    } else {
      setPopUpProps({
        visible: true,
        typeMessage: "error",
        title: "Unsuccessful",
        message: "Your list was not created. Try again.",
      });
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isAddListVisible}
      onRequestClose={handleCloseList}
    >
      <StatusBar style="light" backgroundColor="#cb4834" />
      <View className="h-full w-full justify-center items-center bg-[#cb4834] px-6">
        <TouchableOpacity
          onPress={handleCloseList}
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
        <View className="h-full w-full md:w-5/6 space-y-6 px-4">
          <View className="h-10 w-full justify-center mt-20">
            <Text className="text-2xl text-white font-bold">{listName}</Text>
          </View>
          <View className="space-y-8">
            {/* List Name Input */}
            <View className="space-y-2 border-b border-slate-300">
              <Text className="text-base text-white font-bold">
                Enter List Name
              </Text>
              <TextInput
                placeholder="Eg. Weekly Essentials (up to 25 characters)"
                placeholderTextColor="#fff"
                value={listName}
                onChangeText={(text) => {
                  if (text.length <= 25) {
                    setListName(text);
                  }
                }}
                maxLength={25}
                className="text-sm text-white"
              />
            </View>
            {/* Shopping date Input */}
            <View className="space-y-2 border-b border-slate-300">
              <Text className="text-base text-white font-bold">
                Shopping Date
              </Text>
              <TextInput
                placeholder="Enter Date"
                placeholderTextColor="#fff"
                value={shoppingdate}
                onChangeText={(text) => setShoppingdate(text)}
                className="text-sm text-white"
              />
            </View>
            {/* Collaborators Input */}
            <View className="space-y-2">
              <Text className="text-base text-white font-bold">
                Add Collaborators
              </Text>
              <View className="border-b border-slate-300">
                <TouchableOpacity
                  // onPress={() => setCollaboratorsVisible(true)}
                  className="flex-row justify-between"
                >
                  <Text className="text-sm text-white">
                    Select from collaborators list
                  </Text>
                  <Ionicons name="people" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            {/* List Priority*/}
            <View className="space-y-2">
              <Text className="text-base text-white font-bold">
                Set Priority
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {buttonConfigurations.map((config, index) => (
                  <GradientButton key={index} {...config} />
                ))}
              </View>
            </View>
            {/* Make list default list */}
            <View className="flex-row items-center space-x-2 mb-2">
              <CheckBox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#ff583f" : undefined}
                className="bg-white border border-white"
              />
              <Text className="text-sm text-white font-bold">
                Make it default
              </Text>
              <TouchableOpacity />
            </View>
            {/* Add to List or Clear List Buttons*/}
            <View className="h-28 w-full space-y-4">
              <TouchableOpacity
                style={{
                  backgroundColor: "#e3513a",
                  shadowColor: "rgba(0,0,0,0.5)",
                  shadowOpacity: 0.3,
                  elevation: 12,
                }}
                className="h-14 w-full items-center justify-center rounded-full"
                onPress={handleAddList}
              >
                <Text className="text-base text-white font-bold">
                  Create List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="h-12 w-full items-center justify-center rounded-full"
                onPress={handleClearList}
              >
                <Text className="text-base text-white font-bold">
                  Clear List
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* <Collaborators /> */}
    </Modal>
  );
};

export default AddList;
