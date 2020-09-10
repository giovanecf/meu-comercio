import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import Routes from "./routes";

import Storage from "../Controller/services/Storage";

import DatabaseInit from "../Controller/database/database_init";

import Colors from "./constants/colors";
import "./config/StatusBarConfig";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class Index extends Component {
  databaseInit = new DatabaseInit();
  state = {
    isReady: false,
    LOGGEDIN: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("../../assets/login_page_background.png"),
    ]);

    await Promise.all([...imageAssets]);
  }

  async _isLoggedIn() {
    let LOGGEDIN = false;

    await Storage.getItem("LOGGEDIN").then((data) => {
      console.log(data);
      console.log(typeof data);
      LOGGEDIN = data ? true : false;
    });

    console.log(LOGGEDIN);

    this.setState({ LOGGEDIN });
  }

  UNSAFE_componentWillMount() {
    this._isLoggedIn();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Routes loggedin={this.state.LOGGEDIN} />
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
