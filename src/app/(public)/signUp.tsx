// react components
import React, { useEffect, useRef, useState } from "react";

// react native components
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";

// expo components
import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

// global store
import { useAuthStore, globalState } from "src/store";

// custom components
import { SocialButtons } from "src/components/SocialButtons";
import TermsConditions from "src/components/termsCondition";

// constants
import Colors from "../../constants/colors";

// icons
import { FontAwesome } from "@expo/vector-icons";

const SignUp = () => {
  const { appSignUp } = useAuthStore();
  const { isChecked, setChecked, setIsTermsVisble, setPopUpProps } =
    globalState();
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const SignkeyboardTranslateRef = useRef<Animatable.View | null>(null);
  const SignImageOpacityRef = useRef<Animatable.View | null>(null);

  const SignPushUp = {
    0: { translateY: 0 },
    1: { translateY: height <= 750 ? -height * 0.2 : -height * 0.3 },
  };

  const SignPushDown = {
    0: { translateY: height <= 750 ? -height * 0.2 : -height * 0.3 },
    1: { translateY: 0 },
  };

  const SignImageInvisible = {
    0: { opacity: 1 },
    1: { opacity: 0 },
  };

  const SignImageVisible = {
    0: { opacity: 0 },
    1: { opacity: 1 },
  };

  useEffect(() => {
    if (isChecked && email === "") {
      setChecked(false);
    }
  }, [isChecked, email]);

  useEffect(() => {
    // Function to handle keyboard opening
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        SignkeyboardTranslateRef.current!.animate(SignPushUp);
        SignImageOpacityRef.current!.animate(SignImageInvisible);
      }
    );

    // Function to handle keyboard closing
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        SignkeyboardTranslateRef.current!.animate(SignPushDown);
        SignImageOpacityRef.current!.animate(SignImageVisible);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Function to check if the form is valid and render a pop up
  const checkFormValidity = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email); // email validation

    const isPasswordValid =
      password.length >= 8 && // Minimum length of 8 characters
      /[a-z]/.test(password) && // At least one lowercase letter
      /[A-Z]/.test(password) && // At least one uppercase letter
      /\d/.test(password) && // At least one digit
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password); // At least one special character

    if (!isEmailValid) {
      setPopUpProps({
        visible: true,
        typeMessage: "error",
        title: "Check Email",
        message: "Please enter a valid email.",
      });
    } else if (!isPasswordValid) {
      setPopUpProps({
        visible: true,
        typeMessage: "error",
        title: "Check Password",
        message:
          "Password must be at least 8 characters long, one uppercase letter, one lowercase letter, one special character and one digit.",
      });
    } else if (!isChecked) {
      setPopUpProps({
        visible: true,
        typeMessage: "error",
        title: "Terms and Conditions",
        message: "Please agree to the terms and conditions",
      });
    } else {
      appSignUp(email, password);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.primary }} className="flex-1">
      <StatusBar style="light" />
      <Animatable.View
        ref={SignkeyboardTranslateRef}
        className="flex-1 items-center justify-center"
      >
        <Animatable.View
          ref={SignImageOpacityRef}
          className="w-full sm:w-4/6 items-center justify-center"
        >
          <Animated.Image
            entering={FadeIn.delay(300).springify()}
            source={require("../../../assets/images/signUpPhoto.png")}
            resizeMode="cover"
            style={{
              height: height <= 750 ? 170 : 220,
              width: height <= 750 ? 170 : 220,
            }}
          />
        </Animatable.View>
        <View className="h-auto w-full sm:w-4/6 justify-center space-y-6 px-6 md:px-0">
          <Animated.View
            entering={FadeInDown.delay(500).springify()}
            className="w-full space-y-1 mb-3"
          >
            <Text className="text-4xl text-white font-bold">
              Create Account
            </Text>
            <Text className="text-lg text-white">
              Start Shopping Better Now
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(700).springify()}
            className="w-full space-y-8"
          >
            <View className="w-full flex-row items-center border-b border-slate-200">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#eee"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="flex-1 text-lg text-white"
              />
            </View>
            <View className="w-full flex-row  items-center border-b border-slate-200">
              <TextInput
                placeholder="Password"
                placeholderTextColor="#eee"
                secureTextEntry={showPassword ? false : true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="flex-1 text-lg text-white"
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FontAwesome name="eye-slash" size={20} color="#ddd" />
                ) : (
                  <FontAwesome name="eye" size={20} color="#ddd" />
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(900).springify()}
            className="w-full space-y-6"
          >
            <View className="flex-row items-center space-x-4 mb-4">
              <Checkbox
                value={isChecked}
                color={isChecked ? "#f1461c" : undefined}
              />
              <View className="flex-row items-center">
                <Text className="text-base text-white ">
                  I Agree to the&nbsp;
                </Text>
                <TouchableOpacity
                  onPress={() => setIsTermsVisble(true)}
                  disabled={!email || !password}
                >
                  <Text className="text-base text-[#ffd53e] font-bold">
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={checkFormValidity}
              style={{
                backgroundColor: Colors.secondary,
              }}
              className="h-12 w-full items-center justify-center bg-white rounded-md"
            >
              <Text
                style={{ color: Colors.primary }}
                className="text-lg font-bold tracking-wide"
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(900).springify()}
            className="w-full items-center space-y-1"
          >
            <View className="w-full flex-row items-center">
              <View className="h-[1px] w-[30%] sm:w-[40%] items-center bg-[#ac4434] " />
              <View className="w-[40%] sm:w-[20%] items-center">
                <Text className="text-base text-white">Or Sign In With</Text>
              </View>
              <View className="h-[1px] w-[30%] sm:w-[40%] items-center bg-[#ac4434] " />
            </View>
            {/* social icons */}
            <View className="h-16 w-full flex-row items-center justify-between px-1">
              <SocialButtons />
            </View>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1100).springify()}
            className="w-full flex-row items-center justify-center space-x-2"
          >
            <Text className="text-base text-[#eee]">
              Already have an account?
            </Text>
            <Link href="/signIn" asChild>
              <TouchableOpacity>
                <Text className="text-base text-white font-bold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </Animatable.View>
      <TermsConditions />
    </View>
  );
};

export default SignUp;
