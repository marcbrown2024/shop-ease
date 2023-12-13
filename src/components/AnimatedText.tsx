// react components
import React, { useEffect, useRef, useState } from "react";

// react native components
import { Animated, Easing, Text, TextProps, TextStyle } from "react-native";

type Props = {
  welcomeText: string[];
  text: string;
  style: TextStyle;
} & TextProps;

const AnimatedText = (props: Props) => {
  const [innerText, setInnerText] = useState(props.welcomeText[0]);
  const textAnimation = useRef(new Animated.Value(1));

  useEffect(() => {
    // first moment of animation
    Animated.timing(textAnimation.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
      easing: Easing.sin,
    }).start();

    setTimeout(() => {
      setInnerText(props.text);

      Animated.timing(textAnimation.current, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
        easing: Easing.sin,
      }).start();
    }, 301);
  }, [props.text]);

  return (
    <Animated.Text {...props} style={[ props.style, { opacity: textAnimation.current }]}>
      {innerText}
    </Animated.Text>
  );
};

export default AnimatedText;
