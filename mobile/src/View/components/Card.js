import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,

    backgroundColor: "white",

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    borderRadius: 3,

    flexDirection: "row",
  },
});

export default Card;
