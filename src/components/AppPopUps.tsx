// react components
import React, { useEffect, useRef, useCallback } from "react";

// react native components
import { View, Text } from "react-native";
import * as Animatable from "react-native-animatable";

// global store
import { usePopUpStore } from "src/store";

type Props = {};

const AppPopUps = (props: Props) => {
  const { popUpProps, setPopUpProps } = usePopUpStore();
  const popUpRef = useRef<Animatable.View | null>(null);

  const PopUpVisible = {
    0: { translateY: -150 },
    1: { translateY: 0 },
  };

  const PopUpInVisible = {
    0: { translateY: 0 },
    1: { translateY: -150 },
  };

  const hidePopUp = useCallback(() => {
    setPopUpProps({ visible: false, title: "", message: "", typeMessage: "" });
  }, [setPopUpProps]);

  useEffect(() => {
    if (popUpProps.visible) {
      popUpRef.current?.animate(PopUpVisible);

      // Use clearTimeout to clear the timeout when the component unmounts or pop-up becomes invisible
      const timeoutId = setTimeout(() => {
        hidePopUp();
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      popUpRef.current?.animate(PopUpInVisible);
    }
  }, [popUpProps.visible, hidePopUp]);

  // If pop-up is not visible, return null to render nothing
  if (!popUpProps.visible) {
    return null;
  }

  return (
    <Animatable.View
      ref={popUpRef}
      className="absolute top-10 w-full items-center z-50"
    >
      <View className="h-auto w-80 flex-row bg-slate-100 rounded-md z-50">
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
    </Animatable.View>
  );
};

export default AppPopUps;
