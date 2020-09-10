import React, { Component } from "react";

import { View, Button, StyleSheet, Image, AsyncStorage } from "react-native";

import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import RootContainer from "../../components/RootContainer";
import HeaderContainer from "../../components/HeaderContainer";
import BodyContainer from "../../components/BodyContainer";
import Colors from "../../constants/colors";

export default class Sales extends Component {
  state = {
    isModalVisible: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isModalVisible: false });
    }, 2000);
  }

  render() {
    return (
      <RootContainer>
        <HeaderContainer>
          <Header title="Meu Comércio" navigation={this.props.navigation} />
        </HeaderContainer>
        <BodyContainer>
          <View style={styles.heroImageView}>
            <Image
              style={styles.heroImage}
              source={require("../../../../assets/free_terminal.png")}
            />
          </View>
          <FloatingButton
            icon={"point-of-sale"}
            onPress={() => {
              this.props.navigation.navigate("NewSale", { context: "NewSale" });
            }}
          />
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  loadingImageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: 128,
    height: 128,
  },
});
