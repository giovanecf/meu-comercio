import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const TopBarGradient = (props) => {
  return (
    <View style={styles.statusBar}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[Colors.primaryDark, Colors.primary, Colors.primaryLight]}
      >
        <View style={styles.gradient}></View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    flex: 1,
    width: "100%",
    height: "50%",
  },
  gradient: {
    padding: "10%",
    height: "50%",
  },
  header: {
    alignItems: "center",
    height: "50%",
  },
});

export default TopBarGradient;
