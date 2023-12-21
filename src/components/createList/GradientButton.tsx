// react components
import React from "react";

// react native components
import { TouchableOpacity, Text, View } from "react-native";

// expo components
import { LinearGradient } from "expo-linear-gradient";

// icons
import { AntDesign } from "@expo/vector-icons";

interface GradientButtonProps {
  colors: string[];
  onPress: () => void;
  text: string;
  check: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  colors,
  onPress,
  text,
  check,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors}
        style={{
          height: 60,
          width: 60,
          backgroundColor: "white",
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "rgba(0,0,0,0.2)",
          shadowOpacity: 0.5,
          elevation: 12,
          margin: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
          {text}
        </Text>
      </LinearGradient>
      {check === text && (
        <View className="absolute top-2 right-0">
          <AntDesign name="checkcircle" size={20} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GradientButton;
