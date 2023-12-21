// react components
import React, { useEffect, useState } from "react";

// react native components
import {
  Animated,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// expo components
import * as NavigationBar from "expo-navigation-bar";

// firebase components
import { FIREBASE_DB } from "config/Firebase";
import { collection, onSnapshot, Unsubscribe } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// global store
import { globalState } from "src/store";

// custom components
import AddList from "../../../components/createList/AddList";
import ActiveLists from "src/components/Lists/ActiveLists";
import RecentList from "src/components/Lists/RecentList";

// icons
import { Entypo, MaterialIcons } from "@expo/vector-icons";

// constants
import Colors from "src/constants/colors";
import { StatusBar } from "expo-status-bar";

type Props = {};

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

const Home = (props: Props) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { setAddListVisible } = globalState();
  const [animation] = useState(new Animated.Value(0));
  const [iconColor, setIconColor] = useState("#cb4834");
  const [showInput, setShowInput] = useState(false);
  const [searchItems, setSearchItems] = useState("");
  const [search, setSearch] = useState(true);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const { height } = useWindowDimensions();

  const handleSearchPress = () => {
    setSearch((prevSearch) => !prevSearch);

    Animated.timing(animation, {
      toValue: search ? 1 : 0,
      duration: 700,
      useNativeDriver: false,
    }).start();

    const colorDelay = search ? 0 : 500;
    const inpuDelay = search ? 200 : 400;

    // Delay the color change
    setTimeout(() => {
      setIconColor(search ? "white" : "#cb4834");
    }, colorDelay);

    // Delay the input
    setTimeout(() => {
      setShowInput(search ? true : false);
    }, inpuDelay);
  };

  const openCreateList = () => {
    setAddListVisible(true);
  };

  const fetchShoppingList = async () => {
    if (user) {
      // User is signed in
      const userId = user.uid;
      const shoppingListRef = collection(
        FIREBASE_DB,
        "users",
        userId,
        "ShoppingLists"
      );

      const unsubscribe = onSnapshot(shoppingListRef, (querySnapshot) => {
        const documents: ShoppingListItem[] = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id } as ShoppingListItem);
        });
        setShoppingList(documents);
      });

      return unsubscribe;
    }
  };

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    const fetchData = async () => {
      unsubscribe = await fetchShoppingList();
    };

    fetchData();

    return () => {
      // Check if unsubscribe is defined before calling it
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#cb4834");
  }

  return (
    <View className="flex-1 px-1 py-3">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center space-y-3">
        {/* header */}
        <View className="w-full flex-row items-center justify-between pr-4">
          <View className="relative">
            {/* search bar */}
            <View className="h-14 w-72 md:w-80 flex-row items-center rounded-md z-10">
              <TouchableOpacity
                onPress={handleSearchPress}
                className="h-full w-3/12 md:w-2/12 items-center justify-center"
              >
                <Entypo name="magnifying-glass" size={36} color={iconColor} />
              </TouchableOpacity>
              {showInput && (
                <TextInput
                  placeholder="Search List"
                  placeholderTextColor="#ddd8d8"
                  value={searchItems}
                  onChangeText={(text) => setSearchItems(text)}
                  className="h-full w-9/12 md:w-10/12 text-base md:text-lg text-white"
                />
              )}
            </View>
            {/* Animated background */}
            <Animated.View
              style={{
                position: "absolute",
                height: "100%",
                width: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: Colors.primary,
                borderRadius: 6,
                zIndex: 0,
              }}
            />
          </View>
          {/* PopUp menu */}
          <TouchableOpacity
            onPress={openCreateList}
            style={{
              height: 45,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary,
              borderRadius: 50,
              padding: 8,
              shadowColor: "rgba(208, 31, 4, 0.79)",
              shadowOpacity: 0.2,
              shadowOffset: { width: 2, height: 2 },
              elevation: 20,
            }}
          >
            <MaterialIcons name="apps" size={28} color="#eee" />
          </TouchableOpacity>
        </View>
        <View className="h-5/6 w-full space-y-3 px-4 py-2">
          {shoppingList.length === 0 ? (
            <View className="h-full w-full items-center justify-center space-y-12">
              <Image
                source={require("../../../../assets/images/emptylist.png")}
                resizeMode="cover"
                style={{
                  height: height <= 800 ? 250 : 300,
                  width: height <= 800 ? 250 : 300,
                }}
              />
              <View className="w-full">
                <Text className="w-full text-center text-4xl text-[#cb4834] font-bold">
                  Your List is Empty
                </Text>
                <Text className="h-20 w-5/6 md:w-full text-base text-[#cb4834] md:text-center font-bold mt-4 mx-8">
                  Create a list and add items to your trolley so you can shop at
                  ease.
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <View className="h-1/2 w-full justify-center">
                <View className="h-14 w-full justify-center -mb-4">
                  <Text
                    className="text-2xl md:text-4xl font-bold"
                    style={{ color: Colors.primary }}
                  >
                    My Active Lists
                  </Text>
                </View>
                <ActiveLists shoppingList={shoppingList} />
              </View>
              <View className="h-1/2 w-full justify-center">
                <View className="h-14 w-full justify-center mb-4">
                  <Text
                    className="text-2xl md:text-4xl font-bold"
                    style={{ color: Colors.primary }}
                  >
                    Recent List
                  </Text>
                </View>
                <RecentList shoppingList={shoppingList} />
              </View>
            </View>
          )}
        </View>
      </View>
      <AddList />
    </View>
  );
};

export default Home;
