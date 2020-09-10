import React, { Component } from "react";

import { View, StyleSheet, FlatList, Alert, Image } from "react-native";

import ClientController from "../../../Controller/ClientController";
import ClientApi from "../../../Controller/services/ClientApi";

import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import RootContainer from "../../components/RootContainer";
import HeaderContainer from "../../components/HeaderContainer";
import BodyContainer from "../../components/BodyContainer";
import ItemClientList from "../../components/ItemClientList";
import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import Colors from "../../constants/colors";

export default class Clients extends Component {
  state = {
    clients: [],
    isLoading: true,
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

  getDataFromApi = () => {
    let clientApi = new ClientApi();

    clientApi.getData((dataList) => {
      console.log(dataList);
      this.setState((prevState) => ({
        clients: (prevState.clients = dataList),
      }));
    });
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
    //this.props.navigation.addListener("focus", this.findAllClients);
    this.props.navigation.addListener("focus", this.getDataFromApi);
    this.setState({ isLoading: false });
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
              keyboardShouldPersistTaps={"handled"}
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
          {<ModalLoadingScreen visible={this.state.isLoading} />}
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
