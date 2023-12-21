import React from "react";

import {
  AntDesign,
  FontAwesome,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
} from "@expo/vector-icons";

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
};

const Icon = ({ type, name, color, size = 30, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

export default Icon;
