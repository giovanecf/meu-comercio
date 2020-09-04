import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/colors";

const HeaderContainer = (props) => {
  return (
    <View style={{ ...styles.headerView, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    minHeight: 42,
    backgroundColor: Colors.background,
  },
});

export default HeaderContainer;
