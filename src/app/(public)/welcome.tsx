// react components
import React, { useEffect, useState } from "react";

// react native components
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// expo components
import * as NavigationBar from "expo-navigation-bar";
import { Link } from "expo-router";

// custom components
import AnimatedText from "../../components/AnimatedText";

// constants
import Colors from "../../constants/colors";

type Props = {};

const welcomeText = [
  "Transform your shopping routine into a breeze, creating your list has never been easier!",
  "Craft your ideal shopping list effortlessly with our user-friendly design, simplifying the experience like never before!",
  "Let us help you start shopping smarter so you can shop@ease!",
];

const WelcomePage = (props: Props) => {
  const [text, setText] = useState(welcomeText[0]);

  useEffect(() => {
    let index = 0;
    const textRef = setInterval(() => {
      setText(welcomeText[index]);
      index = (index + 1) % welcomeText.length;
    }, 4000);

    return () => clearInterval(textRef);
  }, []);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(Colors.primary);
  }

  return (
    <View
      style={{ backgroundColor: Colors.primary }}
      className="flex-1 items-center justify-end"
    >
      <Animated.Image
        entering={FadeIn.delay(300).springify()}
        source={require("../../../assets/images/icon.png")}
        resizeMode="cover"
        className="absolute top-0 h-80 w-80 mt-10"
      />
      <View className="h-3/5 w-full space-y-20 px-6">
        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          className="h-52 w-full space-y-10 mt-20"
        >
          <View className="h-1/2 w-full space-y-2">
            <Text className="text-5xl text-white font-bold tracking-widest">
              Create Your
            </Text>
            <Text className="text-5xl text-white font-bold tracking-widest">
              Shopping Lists
            </Text>
          </View>
          <View className="h-1/2 w-full">
            <AnimatedText
              welcomeText={welcomeText}
              text={text}
              style={{
                fontSize: 18,
                color: "#e9e9e9",
                fontWeight: "400",
                lineHeight: 30,
              }}
            />
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          className="w-full items-center justify-center space-y-8"
        >
          <Link href="/signUp" asChild>
            <TouchableOpacity className="h-14 w-full items-center justify-center bg-white rounded-md">
              <Text style={{color: Colors.primary}} className="text-xl font-bold tracking-wide">
                Join Now
              </Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
};

export default WelcomePage;
