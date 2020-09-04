import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Routes from "./routes";

import DatabaseInit from "../Controller/database/database_init";

import Colors from "./constants/colors";
import "./config/StatusBarConfig";

export default class Index extends Component {
  databaseInit = new DatabaseInit();

  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});
