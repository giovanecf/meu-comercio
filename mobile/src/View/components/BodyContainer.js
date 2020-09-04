import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const BodyContainer = (props) => {
  return (
    <View style={{ ...styles.bodyView, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default BodyContainer;
