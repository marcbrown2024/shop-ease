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
import Spinner from "react-native-loading-spinner-overlay";

// expo components
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

// clerk components
import { useSignUp } from "@clerk/clerk-expo";

// custom components

// constants
import Colors from "../../constants/colors";

// icons
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type Props = {};

const SignUp = (props: Props) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [isFormValid, setFormValid] = useState(false);
  const keyboardTranslate = useRef<Animatable.View | null>(null);
  const { height, width } = useWindowDimensions();

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

    setFormValid(isEmailValid && isPasswordValid && isChecked);
  };

  // useEffect to check form validity whenever email, password, or isChecked changes
  useEffect(() => {
    checkFormValidity();
  }, [email, password, isChecked]);

  const handleEmailSignUp = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        email,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = () => {};

  const handleTwitterSignUp = () => {};

  const handleGoogleSignUp = () => {};

  const handleAppleSignUp = () => {};

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync(Colors.primary);
  }

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
            source={require("../../../assets/images/signUpPhoto.png")}
            resizeMode="cover"
            className="h-64 w-64 mb-8"
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("HomeScreen")}
            className="absolute top-2 left-4"
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <StatusBar style="light" />
        <View className="h-3/5 w-full space-y-6 px-6 mb-8">
          <Animated.View
            entering={FadeInDown.delay(500).springify()}
            className="space-y-1 my-2"
          >
            <Text className="text-4xl text-white font-bold">
              Create Account
            </Text>
            <Text className="text-lg text-white">
              Start Shopping Better - Join Us
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            className="space-y-8 my-2"
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
            className="space-y-6"
          >
            <View className="flex-row items-center space-x-4">
              <Checkbox
                disabled={!email || !password}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#f1461c" : undefined}
              />
              <Text className="text-base text-white ">
                I Agree to the Terms and Conditions
              </Text>
            </View>
            <TouchableOpacity
              disabled={!isFormValid}
              onPress={handleEmailSignUp}
              style={{
                backgroundColor: Colors.secondary,
              }}
              className="h-12 w-full items-center justify-center bg-white rounded-md"
            >
              <Text className="text-lg text-black font-bold tracking-wide">
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1100).springify()}
            className="w-full space-y-2"
          >
            <View className="w-full flex-row items-center justify-center space-x-2 px-2">
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
                Already have an account?
              </Text>
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text className="text-base text-white font-bold">Login</Text>
                </TouchableOpacity>
              </Link>
            </Animated.View>
          </Animated.View>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default SignUp;
