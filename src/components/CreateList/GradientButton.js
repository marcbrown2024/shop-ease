// GradientButton.js
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButton = ({ colors, onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={{
          height: 80,
          width: 80,
          backgroundColor: "white",
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "rgba(0,0,0,0.4)",
          shadowOpacity: 0.8,
          elevation: 12,
          margin: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
