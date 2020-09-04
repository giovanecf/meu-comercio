import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

import { FAB } from "react-native-paper";

function FloatingButton(props) {
  return (
    <View style={styles.fabView}>
      <FAB style={styles.fab} icon={props.icon} onPress={props.onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  fabView: {},
  fab: {
    position: "absolute",
    margin: 12,
    right: 5,
    bottom: 5,
    backgroundColor: Colors.primaryLight,
    color: Colors.primaryDark,
    borderRadius: 50,
  },
});

export default FloatingButton;
