// react components
import React, { useEffect, useRef, useState } from "react";

// react native components
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  SafeAreaView,
  Platform,
  useWindowDimensions,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";

// expo components
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Link } from "expo-router";

// custom components

// constants
import Colors from "../../constants/colors";

// icons
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type Props = {};

const SignIn = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setFormValid] = useState(false);
  const keyboardTranslate = useRef<Animatable.View | null>(null);

  const { height, width } = useWindowDimensions();

  console.log(height);
  console.log(width);

  const PushUp = {
    0: { translateY: 0 },
    1: { translateY: width > 400 && height < 800 ? -275 : -140 },
  };

  const PushDown = {
    0: { translateY: width > 400 && height < 800 ? -275 : -140 },
    1: { translateY: 0 },
  };

  // Function to check if the form is valid
  const checkFormValidity = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email); // email validation
    const isPasswordValid =
      password.length >= 8 && // Minimum length of 8 characters
      /[a-z]/.test(password) && // At least one lowercase letter
      /[A-Z]/.test(password) && // At least one uppercase letter
      /\d/.test(password) && // At least one digit
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password); // At least one special character

    setFormValid(isEmailValid && isPasswordValid);
  };

  // useEffect to check form validity whenever email, password, or isChecked changes
  useEffect(() => {
    checkFormValidity();
  }, [email, password]);

  const handleEmailSignIn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleFacebookSignIn = () => {};

  const handleTwitterSignIn = () => {};

  const handleGoogleSignIn = () => {};

  const handleAppleSignIn = () => {};

  useEffect(() => {
    // Function to handle keyboard opening
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        keyboardTranslate.current!.animate(PushUp);
      }
    );

    // Function to handle keyboard closing
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        keyboardTranslate.current!.animate(PushDown);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(Colors.primary);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.primary,
      }}
      className="flex-1 md:items-center"
    >
      <Animatable.View
        duration={500}
        ref={keyboardTranslate}
        className="flex-1 md:w-5/6 items-center justify-end"
      >
        <Animated.View
          entering={FadeIn.delay(300).springify()}
          className="relative h-60 w-full items-center justify-center"
        >
          <Image
            source={require("../../../assets/images/loginPhoto.png")}
            resizeMode="cover"
            className="h-72 w-72"
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("HomeScreen")}
            className="absolute top-2 left-4"
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <StatusBar style="light" />
        <View className="h-3/5 w-full space-y-8 px-6 mb-10">
          <Animated.View
            entering={FadeInDown.delay(500).springify()}
            className="w-full items-center space-y-1 my-2"
          >
            <Text className="text-4xl text-white font-bold">Welcome Back</Text>
            <Text className="text-lg text-white">Log In to Shop@Ease</Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            className="w-full space-y-8 -mb-4"
          >
            <TextInput
              placeholder="Email"
              placeholderTextColor="#eee"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="text-lg text-white border-b border-slate-200"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#eee"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              className="text-lg text-white border-b border-slate-200"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(900).springify()}
            className="w-full items-end space-y-8"
          >
            <Text className="text-base text-[#eee]">Forgot Password?</Text>
            <TouchableOpacity
              disabled={!isFormValid}
              onPress={handleEmailSignIn}
              style={{
                backgroundColor: Colors.secondary,
              }}
              className="h-12 w-full items-center justify-center bg-white rounded-md"
            >
              <Text className="text-lg text-black font-bold tracking-wide">
                Sign In
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1100).springify()}
            className="w-full space-y-2"
          >
            <View className="w-full flex-row items-center justify-center space-x-2">
              <View className="h-[1.5px] w-1/3 bg-[#ac4434]"></View>
              <View className="w-1/3 items-center">
                <Text className="text-base text-white">Or Sign In With</Text>
              </View>
              <View className="h-[1.5px] w-1/3 bg-[#ac4434]"></View>
            </View>
            <View className="h-16 w-full flex-row items-center justify-between mb-2">
              <TouchableOpacity
                style={{
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                  shadowOpacity: 0.5,
                  elevation: 15,
                  shadowRadius: 15,
                  shadowOffset: { width: 1, height: 20 },
                }}
                className="h-[52px] w-[52px] items-center justify-center p-1 bg-[#306fc1] rounded-full"
              >
                <FontAwesome name="facebook-f" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                  shadowOpacity: 0.5,
                  elevation: 15,
                  shadowRadius: 15,
                  shadowOffset: { width: 1, height: 20 },
                }}
                className="h-[52px] w-[52px] items-center justify-center p-1 bg-[#1DA1F2] rounded-full"
              >
                <AntDesign name="twitter" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                  shadowOpacity: 0.5,
                  elevation: 15,
                  shadowRadius: 15,
                  shadowOffset: { width: 1, height: 20 },
                }}
                className="h-[52px] w-[52px] items-center justify-center p-1 bg-[#e4483a] rounded-full"
              >
                <AntDesign name="google" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                  shadowOpacity: 0.5,
                  elevation: 15,
                  shadowRadius: 15,
                  shadowOffset: { width: 1, height: 20 },
                }}
                className="h-[52px] w-[52px] items-center justify-center p-1 bg-black rounded-full"
              >
                <AntDesign name="apple1" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <Animated.View
              entering={FadeInDown.delay(1300).springify()}
              className="w-full flex-row items-center justify-center space-x-2"
            >
              <Text className="text-base text-[#eee]">
                Don't have an account?
              </Text>
              <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-base text-white font-bold">Sign Up</Text>
              </TouchableOpacity>
              </Link>
            </Animated.View>
          </Animated.View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SignIn;
