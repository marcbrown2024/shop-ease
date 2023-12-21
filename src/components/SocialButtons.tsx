// react components
import React from "react";

// react native components
import { TouchableOpacity } from "react-native";

// icons
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type SocialButtonProps = {
  backgroundColor: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const socialButtonData = [
  {
    backgroundColor: "#306fc1",
    icon: <FontAwesome name="facebook-f" size={24} color="white" />,
    onPress: () => {
      // Handle Facebook button press
    },
  },
  {
    backgroundColor: "#1DA1F2",
    icon: <AntDesign name="twitter" size={24} color="white" />,
    onPress: () => {
      // Handle Twitter button press
    },
  },
  {
    backgroundColor: "#e4483a",
    icon: <AntDesign name="google" size={24} color="white" />,
    onPress: () => {
      // Handle Google button press
    },
  },
  {
    backgroundColor: "black",
    icon: <AntDesign name="apple1" size={30} color="white" />,
    onPress: () => {
      // Handle Apple button press
    },
  },
];

const SocialButton: React.FC<SocialButtonProps> = ({
  backgroundColor,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        borderRadius: 50,
        shadowColor: "rgba(0, 0, 0, 0.2 )",
        shadowOpacity: 0.5,
        elevation: 15,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 20 },
      }}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

export const SocialButtons = () => {
  return (
    <>
      {socialButtonData.map((button, index) => (
        <SocialButton key={index} {...button} />
      ))}
    </>
  );
};
