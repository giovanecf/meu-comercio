import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const RootContainer = (props) => {
  return (
    <View style={{ ...styles.rootView, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export default RootContainer;
