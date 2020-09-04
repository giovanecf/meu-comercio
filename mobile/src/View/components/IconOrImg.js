import React from "react";
import { Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import getRandomColor from "../components/colorGenerator";

function ItemForSearch(props) {
  const { thumbnail, iconName, styleImg, styleIcon, size, color } = props;

  return thumbnail === "ICON" ? (
    <MaterialCommunityIcons
      style={styleIcon}
      name={iconName ? iconName : "account-circle-outline"}
      color={color ? color : getRandomColor()}
      size={size ? size : 42}
    />
  ) : (
    <Image style={styleImg} source={{ uri: thumbnail }} />
  );
}

export default ItemForSearch;
