import React, { Component } from "react";

import { View, StyleSheet, FlatList, Alert, Image } from "react-native";

import ClientController from "../../../Controller/ClientController";

import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import RootContainer from "../../components/RootContainer";
import HeaderContainer from "../../components/HeaderContainer";
import BodyContainer from "../../components/BodyContainer";
import ItemClientList from "../../components/ItemClientList";
import Colors from "../../constants/colors";

export default class Clients extends Component {
  state = {
    clients: [],
  };

  findAllClients = () => {
    ClientController.findAll().then((response) => {
      this.setState({
        clients: response._array,
      });
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

  searchClients = (search) => {
    if (search === "") {
      this.findAllClients();
      return;
    }

    ClientController.findByName(search).then((response) => {
      this.setState({
        clients: response._array,
      });
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

  renderItem = ({ item }) => (
    <ItemClientList
      name={item.name}
      thumbnail={item.thumbnail}
      onPress={() => {
        this.props.navigation.navigate("ClientDetails", {
          item,
        });
      }}
    />
  );

  componentDidMount() {
    this.props.navigation.addListener("focus", this.findAllClients);
  }

  render() {
    return (
      <RootContainer>
        <HeaderContainer>
          <Header
            withSearch={true}
            placeholder="Pesquisar clientes..."
            onChangeText={this.searchClients}
          />
        </HeaderContainer>
        <BodyContainer>
          {this.state.clients.length > 0 ? (
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.clients}
              keyExtractor={(item) => String(item.id)}
              renderItem={this.renderItem}
              ListFooterComponent={<View style={styles.footer}></View>}
            />
          ) : (
            <View style={styles.heroImageView}>
              <Image
                style={styles.heroImage}
                source={require("../../../../assets/no_client.png")}
              />
            </View>
          )}

          <FloatingButton
            icon={"plus"}
            onPress={() => this.props.navigation.navigate("NewClient")}
          />
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 0,
  },
  heroImageView: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: 128,
    height: 128,
  },
  footer: {
    paddingVertical: 30,
  },
});
