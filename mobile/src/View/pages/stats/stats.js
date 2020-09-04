import React, { Component } from "react";

import { View, Text, Button, StyleSheet, Image, Modal } from "react-native";

import Header from "../../components/Header";
import TopBarGradient from "../../components/TopBarGradient";
import RootContainer from "../../components/RootContainer";
import HeaderContainer from "../../components/HeaderContainer";
import BodyContainer from "../../components/BodyContainer";
import Card from "../../components/Card";
import Colors from "../../constants/colors";
import FloatingLabelInput from "react-native-floating-label-input";

export default class Stats extends Component {
  state = {
    isModalVisible: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isModalVisible: false });
    }, 3000);
  }

  render() {
    return (
      <RootContainer>
        <HeaderContainer>
          <Header title="Stats" />
        </HeaderContainer>
        <BodyContainer>
          <Modal
            visible={this.state.isModalVisible}
            transparent={true}
            animationType={"none"}
          >
            <View style={styles.backgroundLoadingView}>
              <Card style={styles.cardLoading}>
                <Image
                  style={styles.imageLoading}
                  source={require("../../../../assets/loading.gif")}
                />
              </Card>
            </View>
          </Modal>

          <View style={styles.heroImageView}>
            <Image
              style={styles.heroImage}
              source={require("../../../../assets/no_stats.png")}
            />
          </View>
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  heroImageView: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: 128,
    height: 128,
  },
  backgroundLoadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000040",
  },
  cardLoading: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoading: { width: 50, height: 50 },
});
