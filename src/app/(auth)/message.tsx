import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
// global store
import { useAuthStore } from "src/store";

type Props = {};

const Message = (props: Props) => {
  const { appSignOut } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-black text-xl">Messages</Text>
      <View>
        <TouchableOpacity
          onPress={async () => {
            try {
              await appSignOut();
            } catch (error) {
              console.error(error);
              // Handle any error if needed
            }
          }}
        >
          <Text className="text-lg">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Message;
