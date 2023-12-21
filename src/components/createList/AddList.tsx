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

// firebase components
import { FIREBASE_DB } from "config/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// global state
import { globalState } from "src/store";

// custom components
import GradientButton from "./GradientButton";
import ListColor from "./ListColor";
// import Collaborators from "../Collaborators";

// icons
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface collaboratorsList {
  email: string;
  image: string;
}

const AddList = () => {
  const { isAddListVisible, setPopUpProps, setAddListVisible, setCollaboratorsVisible } =
  globalState();
  const auth = getAuth();
  const user = auth.currentUser;
  const [listName, setListName] = useState("");
  const [shoppingdate, setShoppingdate] = useState("");
  const [collaborators, setCollaborators] = useState<collaboratorsList[]>([]);
  const [listColor, setListColor] = useState("");
  const [listPriority, setListPriority] = useState("");
  const [isChecked, setChecked] = useState(false);

  const buttonConfigurations = [
    {
      colors: ["#3BB273", "#3CB893"],
      onPress: () =>
        setListPriority((prevPriority) =>
          prevPriority === "Low" ? "" : "Low"
        ),
      text: "Low",
      check: listPriority,
    },
    {
      colors: ["#e6cc17", "#FDCB35"],
      onPress: () =>
        setListPriority((prevPriority) =>
          prevPriority === "Medium" ? "" : "Medium"
        ),
      text: "Medium",
      check: listPriority,
    },
    {
      colors: ["#FF5656", "#C16868"],
      onPress: () =>
        setListPriority((prevPriority) =>
          prevPriority === "High" ? "" : "High"
        ),
      text: "High",
      check: listPriority,
    },
  ];

  const handleClearList = () => {
    // Reset the form after clearing list
    setListName("");
    setShoppingdate("");
    setListPriority("");
    setCollaborators([]);
    setListColor("");
    setChecked(false);
  };

  const handleCloseList = () => {
    // Reset the form after closing form
    setAddListVisible(false);
    setListName("");
    setShoppingdate("");
    setListPriority("");
    setCollaborators([]);
    setListColor("");
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
        shoppingDate: shoppingdate,
        priority: listPriority,
        collaborators: collaborators,
        listColor: listColor,
        default: isChecked,
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
      setCollaborators([]);
      setListColor("");
      setChecked(false);
      setAddListVisible(false);
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
      animationType="slide"
      visible={isAddListVisible}
      onRequestClose={handleCloseList}
    >
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
        <View className="h-full w-full md:w-5/6 space-y-4 px-4">
          <View className="h-10 w-full justify-center mt-16">
            <Text className="text-2xl text-white font-bold">{listName}</Text>
          </View>
          <View className="space-y-8">
            {/* List Name Input */}
            <View className="space-y-2 border-b border-slate-300">
              <Text className="text-base text-white font-bold">
                Enter List Name
              </Text>
              <TextInput
                placeholder="Eg. Weekly Essentials (up to 20 characters)"
                placeholderTextColor="#fff"
                value={listName}
                onChangeText={(text) => {
                  if (text.length <= 20) {
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
                Select Collaborators
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
            <View className="space-y-1 -mb-5">
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
            {/* Choose color for list*/}
            <ListColor listColor={listColor} setListColor={setListColor} />
            {/* Make list default list */}
            <View className="flex-row items-center justify-between -mb-2">
              <Text className="text-base text-white font-bold">
                Make it default
              </Text>
              <TouchableOpacity
                onPress={() => setChecked(!isChecked)}
                style={{ backgroundColor: isChecked ? "#ff583f" : "#ccc" }}
                className="h-7 w-7 items-center justify-center rounded-full"
              >
                <FontAwesome
                  name="check"
                  size={18}
                  color={isChecked ? "white" : "#eee"}
                />
              </TouchableOpacity>
            </View>
            {/* Add to List or Clear List Buttons*/}
            <View className="w-full space-y-5">
              <TouchableOpacity
                style={{
                  backgroundColor: "#e3513a",
                  shadowColor: "rgba(0,0,0,0.5)",
                  shadowOpacity: 0.3,
                  elevation: 12,
                }}
                className="h-12 w-full items-center justify-center rounded-full"
                onPress={handleAddList}
              >
                <Text className="text-base text-white font-bold">
                  Create List
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-full items-center justify-center rounded-full"
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
