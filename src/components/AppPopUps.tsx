// react components
import React, { useEffect, useRef, useCallback } from "react";

// react native components
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedRef,
} from "react-native-reanimated";

// global store
import { globalState } from "src/store";

type Props = {};

const AppPopUps = (props: Props) => {
  const { popUpProps, setPopUpProps } = globalState();
  const translateY = useSharedValue(0);
  const popUpRef = useAnimatedRef<Animated.View>();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (popUpProps.visible) {
      translateY.value = withTiming(150, { duration: 700 });

      const timeoutId = setTimeout(() => {
        setPopUpProps({ ...popUpProps, visible: false });
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      translateY.value = withTiming(0, { duration: 700 });
    }
  }, [popUpProps.visible, setPopUpProps, translateY]);

  return (
    <Animated.View
      ref={popUpRef}
      style={[
        {
          position: "absolute",
          top: -100,
          width: "100%",
          alignItems: "center",
          zIndex: 10,
        },
        animatedStyle,
      ]}
    >
      <View className="h-auto w-80 flex-row bg-slate-100 rounded-md">
        <View
          style={{
            backgroundColor:
              popUpProps.typeMessage === "success"
                ? "#37c85f"
                : popUpProps.typeMessage === "error"
                ? "#ff0100"
                : "#2C91D3",
            height: "100%",
            width: 6,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          }}
        ></View>
        <View className="h-auto w-full justify-center space-y-1 px-6 py-2">
          <Text className=" text-sm font-bold">{popUpProps.title}</Text>
          <Text className="text-xs text-slate-500">{popUpProps.message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default AppPopUps;
