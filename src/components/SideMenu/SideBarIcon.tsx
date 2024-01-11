// react components
import React from "react";

// react native components
import { View, Text } from "react-native";

// constants
import Colors from "src/constants/colors";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <View className="absolute h-full w-1 justify-center z-50">
      <View
        style={{ backgroundColor: Colors.primary }}
        className="h-28 w-[3px] rounded-r"
      ></View>
    </View>
  );
};

export default SideBar;
