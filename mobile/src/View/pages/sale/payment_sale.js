import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SectionList,
  Alert,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ClientController from "../../../Controller/ClientController";

import ItemForFinishSale from "../../components/ItemForFinishSale";
import RootContainer from "../../components/RootContainer";
import BodyContainer from "../../components/BodyContainer";
import SearchPage from "../../components/SearchPage";
import Card from "../../components/Card";
import ItemForSearch from "../../components/ItemForSearch";
import PaymentMethodInput from "../../components/PaymentMethodInput";
import Colors from "../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";

export default class PaymentSale extends Component {
  state = {
    sale: this.props.route.params.sale,
    isSearchScreenVisible: false,
    clients: [],
    clientLabel: `Não obrigatório`,
    searchedArray: [],
    search: "",
    clearClientButton: this.clearClientButtonInvisibelView,
    paymentMethods: [],
    labelPaymentMethodsWarning: "",
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

  onChangeTextHandler = (search) => {
    if (search === "") {
      return;
    }

    this.setState({ isSearchScreenVisible: true });
    this.setState({ search });
    const arr = this.state.clients.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    this.setState({ searchedArray: arr });
  };

  onItemSelectHandler = ({ item }) => {
    this.setState({ isSearchScreenVisible: false });

    const newSale = this.state.sale;
    newSale.clientId = item.id;

    this.setState({
      sale: newSale,
      clientLabel: `- ${item.cpf}\n- ${item.name}`,
      clearClientButton: this.clearClientButtonVisibelView,
    });
  };

  clearClientID = () => {
    const newSale = this.state.sale;
    newSale.clientId = "";
    this.setState({
      clientLabel: "Não obrigatório",
      clearClientButton: this.clearClientButtonInvisibelView,
      sale: newSale,
    });
  };

  onValueOnMethodChangeHandler = (valueOnMethod, id) => {
    let totalInPaymentMethods = 0;
    const newPaymentMethods = this.state.paymentMethods;
    newPaymentMethods.map((item) => {
      if (item.id === id) item.value = valueOnMethod;
    });

    this.setState({ paymentMethods: newPaymentMethods });

    this.state.paymentMethods.forEach((element) => {
      totalInPaymentMethods += Number(element.value);
    });

    if (totalInPaymentMethods > this.state.sale.total) {
      this.setState({
        labelPaymentMethodsWarning: "ATENÇÃO! Soma MAIOR que TOTAL!",
      });
    } else if (totalInPaymentMethods < this.state.sale.total) {
      this.setState({
        labelPaymentMethodsWarning: "ATENÇÃO! Soma MENOR que TOTAL!",
      });
    } else {
      this.setState({ labelPaymentMethodsWarning: "" });
    }
  };

  addPaymentMethod = () => {
    const newPaymentMethods = this.state.paymentMethods;
    newPaymentMethods.push({
      id: String(Math.random() * (5000 - 0) + 0),
      method: "Dinheiro",
      value: 0,
      saleid: this.props.route.params.id,
    });

    this.setState({ paymentMethods: newPaymentMethods });
  };

  onDeletePaymentMethod = ({ id }) => {
    const newPaymentMethods = this.state.paymentMethods.filter(
      (item) => item.id !== id
    );

    this.setState({ paymentMethods: newPaymentMethods });
  };

  finishSale = () => {
    const { sale, paymentMethods } = this.state;
    console.log("O QUE TEM?");
    console.log(sale);
    console.log(paymentMethods);
    this.props.navigation.navigate("FinishSale", {
      sale,
      paymentMethods,
    });
  };

  renderItemSearch = ({ item }) => (
    <ItemForSearch
      key={item.id}
      style={{ ...styles.screenScrollView, ...styles.reverseItem }}
      onPress={this.onItemSelectHandler.bind(this, { item })}
      warning={false}
      itemType={"client"}
      imgSrc={item.thumbnail}
      primaryInfo={item.name}
      secondaryInfo={item.cpf}
    />
  );

  clearClientButtonVisibelView = (
    <TouchableOpacity onPress={this.clearClientID}>
      <Text
        style={{
          ...styles.headerButton,
          ...styles.clientCardClearButtonText,
        }}
      >
        Limpar
      </Text>
    </TouchableOpacity>
  );

  clearClientButtonInvisibelView = (<View></View>);

  headerButton = (
    <TouchableOpacity onPress={this.finishSale}>
      <View style={styles.headerButtonView}>
        <Text style={styles.headerButton}>Finalizar</Text>
      </View>
    </TouchableOpacity>
  );

  componentDidMount() {
    const newPaymentMethods = this.state.paymentMethods;
    newPaymentMethods.push({
      id: String(Math.random() * (5000 - 0) + 0),
      method: "Dinheiro",
      value: this.state.sale.total,
      saleid: this.state.sale.id,
    });

    this.setState({ paymentMethods: newPaymentMethods });

    this.props.navigation.addListener("focus", this.findAllClients);
  }

  render() {
    this.props.navigation.setOptions({
      headerTitle: `R$ ${Number(this.state.sale.total).toFixed(2)}`,
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.primaryLight,
      },
      headerRight: () => this.headerButton,
    });

    return (
      <RootContainer>
        <BodyContainer>
          <ScrollView style={styles.container}>
            <Card style={styles.rootCard}>
              <View style={styles.textTitleCardView}>
                <Text style={styles.textTitleCard}>Quem compra?</Text>
              </View>
              <View style={styles.cardBodyView}>
                <View style={styles.clientCardIDClientView}>
                  <Text style={styles.clientCardIDClientText}>
                    {this.state.clientLabel}
                  </Text>
                </View>
                <View style={styles.clientCardButtonsView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isSearchScreenVisible: true });
                    }}
                  >
                    <Text
                      style={{
                        ...styles.headerButton,
                        ...styles.clientCardSearchButtonText,
                      }}
                    >
                      Buscar Cliente
                    </Text>
                  </TouchableOpacity>
                  {this.state.clearClientButton}
                </View>
              </View>
            </Card>

            <Card style={styles.rootCard}>
              <View style={styles.textTitleCardView}>
                <Text style={styles.textTitleCard}>Como compra?</Text>
                <TouchableOpacity onPress={this.addPaymentMethod}>
                  <MaterialCommunityIcons
                    name="credit-card-plus-outline"
                    color={Colors.saveButton}
                    size={32}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={styles.cardBodyView}>
                  {this.state.paymentMethods.map((item, index) => (
                    <PaymentMethodInput
                      valueOnMethod={Number(item.value).toFixed(2)}
                      onValueChange={this.onValueOnMethodChangeHandler}
                      onDelete={this.onDeletePaymentMethod}
                      index={index}
                      id={item.id}
                      key={item.id}
                    />
                  ))}
                </View>
              </ScrollView>
              <View style={styles.cardBodyView}>
                <Text style={styles.labelPaymentMethodWarningText}>
                  {this.state.labelPaymentMethodsWarning}
                </Text>
              </View>
            </Card>

            <Card style={styles.rootCard}>
              <View style={styles.textTitleCardView}>
                <Text style={styles.textTitleCard}>O que compra?</Text>
              </View>
              <View style={styles.cardBodyView}>
                {this.state.sale.saleItens.map((item, index) => (
                  <ItemForFinishSale saleItem={item} key={index} />
                ))}
              </View>
            </Card>
          </ScrollView>
          <SearchPage
            visible={this.state.isSearchScreenVisible}
            onRequestClose={() => {
              this.setState({ isSearchScreenVisible: false });
            }}
            cancelButtonOnPress={() => {
              this.setState({ isSearchScreenVisible: false });
            }}
            searchedArray={this.state.searchedArray}
            onChangeText={this.onChangeTextHandler}
            textInputPlaceholder="Procure um cliente"
            renderItem={this.renderItemSearch}
          />
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerButtonView: {
    margin: 12,
  },
  headerButton: {
    padding: 6,
    fontSize: 16,
    color: Colors.secondaryDark,
    borderWidth: 1,
    borderColor: Colors.secondaryDark,
    borderRadius: 4,
  },
  // GLOBAIS
  rootCard: {
    padding: 6,
    flexDirection: "column",
  },
  textTitleCardView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 8,
  },
  textTitleCard: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardBodyView: {
    margin: 12,
  },
  // ESPECÌFICAS
  clientCardIDClientView: {
    marginVertical: 12,
  },
  clientCardIDClientText: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "italic",
    color: Colors.secondaryLight,
  },
  clientCardButtonsView: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  clientCardSearchButtonText: {
    color: Colors.thrid,
    borderColor: Colors.thrid,
  },
  clientCardClearButtonText: {
    color: Colors.secondaryLight,
    borderColor: Colors.secondaryLight,
    marginLeft: 12,
  },
  paymentMethodPlusButton: {},
  screenScrollView: {
    fontSize: 14,
    marginHorizontal: 24,
  },
  reverseItem: {
    transform: [{ scaleY: -1 }],
  },

  labelPaymentMethodWarningText: {
    fontSize: 12,
    color: Colors.cancelButton,
  },
});
