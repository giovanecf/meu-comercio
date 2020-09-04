import React, { Component } from "react";

import { View, Button, StyleSheet, Image } from "react-native";

import Modal from "react-native-modal";

import UserController from "../../../Controller/UserController";

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

  findAllUsers = () => {
    UserController.findAll().then((response) => {
      console.log("ARRAY: ");
      console.log(response._array);
      console.log(response._array.length);
    }),
      (error) => {
        Alert.alert("Erro!", error, [
          {
            text: "Ok",
            style: "destructive",
          },
        ]);
      };
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
          <Header title="Meu Comércio" />
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
