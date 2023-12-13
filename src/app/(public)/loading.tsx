// react components
import React, { useEffect } from "react";

// react native components
import { ActivityIndicator, Image, Platform, SafeAreaView, Text, View } from "react-native";

// expo components
import * as NavigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";

// custom components
import Colors from "../../constants/colors";

type Props = {};

const Loading = (props: Props) => {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the login page after 3 seconds
      router.replace("/welcome")
    }, 3000);

    // Clear the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, [router]);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(Colors.primary);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
      }}
      className="flex-1 items-center justify-center space-y-6"
    >
      <Image
        source={require("../../../assets/images/applogo.png")}
        resizeMode="contain"
        className="h-3/6 w-full"
      />
      <View className="w-full items-center justify-center space-y-2 px-2 my-8">
        <Text className="text-3xl text-white font-bold">
          List, Click, Shop@Ease
        </Text>
        <Text className="text-base text-[#e2e2e2] font-medium">
          Grocery Shopping Made Effortless
        </Text>
      </View>
      <ActivityIndicator size="large" color={Colors.secondary}/>
    </SafeAreaView>
  );
};

export default Loading;
