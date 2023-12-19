// react components
import React, { useEffect, useRef, useState } from "react";

// react native components
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import Spinner from "react-native-loading-spinner-overlay";

// expo components
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

// firebase components
import { FIREBASE_AUTH } from "config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// global store
import { usePopUpStore, useLoadingStore } from "src/store";

// icons
import { Ionicons } from "@expo/vector-icons";

// constants
import Colors from "../../constants/colors";
import CheckEmail from "src/components/CheckEmail";

type Props = {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
};

if (Platform.OS === "android") {
  NavigationBar.setBackgroundColorAsync(Colors.primary);
}

const ForgetPassword = (props: Props) => {
  const { setPopUpProps } = usePopUpStore()
  const { loading, setLoading } = useLoadingStore();
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [checkEmailModal, setCheckEmailModal] = useState(false);
  const auth = FIREBASE_AUTH;

  const ForgetkeyboardTranslateRef = useRef<Animatable.View | null>(null);
  const ForgetImageOpacityRef = useRef<Animatable.View | null>(null);

  const handleSignUp = async () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    if (isEmailValid) {
      setLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setPopUpProps({
          visible: true,
          typeMessage: "success",
          title: "Success",
          message: "Password reset email sent",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setCheckEmailModal(true);
      }
    } else {
      setPopUpProps({
        visible: true,
        typeMessage: "error",
        title: "Check Email",
        message: "Please enter a valid email.",
      });
    }
  };

  const ForgetPushUp = {
    0: { translateY: 0 },
    1: { translateY: height <= 800 ? -height * 0.15 : -height * 0.33 },
  };

  const ForgetPushDown = {
    0: { translateY: height <= 800 ? -height * 0.15 : -height * 0.33 },
    1: { translateY: 0 },
  };

  const ForgetImageInvisible = {
    0: { opacity: 1 },
    1: { opacity: 0 },
  };

  const ForgetImageVisible = {
    0: { opacity: 0 },
    1: { opacity: 1 },
  };

  useEffect(() => {
    // Function to handle keyboard opening
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        ForgetkeyboardTranslateRef.current!.animate(ForgetPushUp);
        ForgetImageOpacityRef.current!.animate(ForgetImageInvisible);
      }
    );

    // Function to handle keyboard closing
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        ForgetkeyboardTranslateRef.current!.animate(ForgetPushDown);
        ForgetImageOpacityRef.current!.animate(ForgetImageVisible);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <Spinner visible={loading} />
      <View
        style={{ backgroundColor: Colors.primary }}
        className="relative flex-1"
      >
        <Animatable.View
          ref={ForgetkeyboardTranslateRef}
          style={{ backgroundColor: Colors.primary }}
          className="flex-1 items-center justify-center p-6"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-10 left-6 z-50 bg-[#e3533d] p-1 rounded-full"
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Animatable.View
            ref={ForgetImageOpacityRef}
            className="w-full sm:w-4/6 items-center justify-center"
          >
            <Animated.Image
              entering={FadeIn.delay(500).springify()}
              source={require("../../../assets/images/forgetPassImg.png")}
              resizeMode="cover"
              className="h-64 w-96 sm:h-72 sm:w-96 my-4"
            />
          </Animatable.View>
          <View className="h-3/6 w-full md:w-5/6 justify-end space-y-8">
            <Animated.View
              entering={FadeInUp.delay(700).springify()}
              className="space-y-3"
            >
              <Text className="text-3xl md:text-4xl text-white font-bold">
                Forget Password?
              </Text>
              <Text className="text-sm md:text-base text-[#ddd] font-bold">
                Please enter the email address linked with your account. An
                email will be sent with instructions to reset your password.
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInUp.delay(900).springify()}
              className="space-y-3 mb-2"
            >
              <Text className="text-lg text-white font-medium">Email</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor="#eee"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="text-lg text-white bg-[#af3f2d] px-6 py-3 rounded-full"
              />
            </Animated.View>
            <Animated.View
              entering={FadeInUp.delay(900).springify()}
              className="w-full"
            >
              <TouchableOpacity
                onPress={handleSignUp}
                style={{
                  backgroundColor: Colors.secondary,
                }}
                className="h-14 w-full items-center justify-center bg-white rounded-full"
              >
                <Text
                  style={{ color: Colors.primary }}
                  className="text-lg font-extrabold tracking-wide"
                >
                  Send Instructions
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animatable.View>
      </View>
      <CheckEmail
        checkEmailModal={checkEmailModal}
        setCheckEmailModal={setCheckEmailModal}
        email={email}
      />
    </View>
  );
};

export default ForgetPassword;
