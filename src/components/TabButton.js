// react components
import React, { useEffect, useRef } from "react";

// react native components
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

// components

// icons
import Icon from "../constants/icons";

const TabButton = (props) => {
  const animate1 = {
    0: { scale: 0.5, translateY: 12 },
    1: { scale: 1.2, translateY: -12 },
  };
  const animate2 = {
    0: { scale: 1.2, translateY: -12 },
    1: { scale: 1, translateY: 12 },
  };

  const circle1 = {
    0: { scale: 0.7 },
    1: { scale: 1 },
  };
  
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={300} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={item.type}
            name={item.icon}
            color={"#fff"}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "transparent",
    backgroundColor: "#cb4834",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
});
