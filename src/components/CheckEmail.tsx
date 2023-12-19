// react components
import React from "react";

// react native components
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// expo components
import { router } from "expo-router";

// icons
import { Ionicons } from "@expo/vector-icons";

// constants
import Colors from "../constants/colors";

type Props = {
  checkEmailModal: boolean;
  setCheckEmailModal: (value: boolean) => void;
  email: string;
};

const CheckEmail = (props: Props) => {
  return (
    <Modal
      animationType="fade"
      visible={props.checkEmailModal}
      onRequestClose={() => props.setCheckEmailModal(false)}
    >
      <View
        style={{ backgroundColor: Colors.primary }}
        className="flex-1 items-center justify-between"
      >
        <TouchableOpacity
          onPress={() => {
            router.push("/signIn");
            props.setCheckEmailModal(false);
          }}
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
            shadowColor: "rgba(0,0,0,1.8)",
            shadowOpacity: 0.3,
            elevation: 12,
          }}
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View className="h-2/6 w-full md:w-4/6 items-center justify-center mt-8">
          <Image
            source={require("../../assets/images/email.png")}
            resizeMode="cover"
            className="h-40 w-40 sm:h-48 sm:w-48 my-4"
          />
        </View>
        <Animated.View
          entering={FadeIn.delay(300).springify()}
          className="h-full w-full md:w-4/6 items-center space-y-10 p-6"
        >
          <View className="h-auto w-full items-center space-y-8 py-2">
            <Text className="text-4xl md:text-4xl text-white font-bold">
              Check your email
            </Text>
            <Text className="text-sm md:text-base text-[#eee] font-bold leading-6">
              Please enter the email address linked with your account. An email
              will be sent with instructions to reset your password.
            </Text>
          </View>
          <View className="h-auto w-full items-center space-y-6">
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("mailto:");
                props.setCheckEmailModal(false);
              }}
              style={{
                backgroundColor: Colors.secondary,
              }}
              className="h-14 w-60 items-center justify-center bg-white rounded-md"
            >
              <Text
                style={{ color: Colors.primary }}
                className="text-lg font-extrabold tracking-tight"
              >
                Open email app
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.setCheckEmailModal(false);
                router.push("/signIn");
              }}
            >
              <Text className="text-lg text-[#ccc] font-bold">
                Skip, I'll confirm later
              </Text>
            </TouchableOpacity>
          </View>
          <View className="h-20 w-full items-center justify-end">
            <Text className="text-sm text-[#ccc] font-medium">
              Did not recieve the email? Check your spam folder, or
              <Text className="text-[#ffc362] font-bold">
                &nbsp; start the forget password process again.
              </Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CheckEmail;
