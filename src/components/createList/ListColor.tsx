// react components
import React from "react";

// react native components
import { View, Text, TouchableOpacity } from "react-native";

// icons
import { AntDesign } from "@expo/vector-icons";

type Props = {
  listColor: string;
  setListColor: React.Dispatch<React.SetStateAction<string>>;
};

const ListColor = (props: Props) => {
  const listColors = [
    "#3498db",
    "#e6cc17",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#f44336",
  ];
  return (
    <View className="space-y-2 py-2 mt-8 -mb-2 border-b border-slate-300">
      <Text className="text-base text-white font-bold mb-1">
        Choose a Color for Your List
      </Text>

      <View className="flex-row items-center justify-between">
        {listColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              props.setListColor((prevColor) =>
                prevColor === color ? "" : color
              )
            }
            style={{ backgroundColor: color }}
            className="h-8 w-8 bg-slate-300 rounded-full"
          >
            {props.listColor === color && (
              <View className="absolute top-0 -right-1">
                <AntDesign name="checkcircle" size={16} color="white" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ListColor;
