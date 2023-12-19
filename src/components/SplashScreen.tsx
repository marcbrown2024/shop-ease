// react components
import React from "react";

// react native components
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";

// expo components
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

// custom components
import Colors from "../constants/colors";

type Props = {};

const SplashScreen = (props: Props) => {

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(Colors.primary);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
      }}
      className="flex-1 items-center justify-center space-y-10"
    >
      <StatusBar style="light" backgroundColor={Colors.primary}/>
      <Image
        source={require("../../assets/images/icon.png")}
        resizeMode="contain"
        className="h-3/6 w-full"
      />
      <View className="w-full items-center justify-center space-y-4 px-2 my-8">
        <Text className="text-3xl text-white font-bold">
          List, Click, Shop@Ease
        </Text>
        <Text className="text-base text-[#e9e9e9] font-medium">
          Grocery Shopping Made Effortless
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
