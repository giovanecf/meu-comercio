import React, { Component, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  BackHandler,
} from "react-native";

import ProductTypeController from "../../../Controller/ProductTypeController";

import Header from "../../components/Header";
import RootContainer from "../../components/RootContainer";
import HeaderContainer from "../../components/HeaderContainer";
import BodyContainer from "../../components/BodyContainer";
import ItemForSale from "../../components/ItemForSale";
import FloatingButton from "../../components/FloatingButton";
import SearchPage from "../../components/SearchPage";
import Colors from "../../constants/colors";

import ItemForSearch from "../../components/ItemForSearch";

export default class NewSale extends Component {
  state = {
    isListing: false,
    typeProducts: [],
    quantitySelected: 1,
    searchedArray: [],
    search: "",
    isSearchScreenVisible: false,
    sale: {
      saleItens: [],
      clientId: "",
      total: 0,
      createAt: 1,
      userId: 100,
    },
  };

  navigationListener = {};

  findAllProductTypes = () => {
    ProductTypeController.findAll().then((response) => {
      this.setState({
        typeProducts: response._array,
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
    const arr = this.state.typeProducts.filter((item) =>
      item.description.toLowerCase().includes(search.toLowerCase())
    );
    this.setState({ searchedArray: arr });
  };

  onItemSelectHandler = ({ item }) => {
    this.setState({ isSearchScreenVisible: false });
    let HAS_ALREADY = false;
    //GETTING OLD DATA
    const newSaleItensArray = this.state.sale.saleItens;
    const newQuantity = Number(this.state.quantitySelected);
    let newSubTotal = (item.sellPrice - item.discount) * newQuantity;
    const newTotal = newSubTotal + this.state.sale.total;

    newSaleItensArray.map((element) => {
      if (item.id === element.productType.id) {
        Number((element.quantity += newQuantity));
        element.subTotal += newSubTotal;
        HAS_ALREADY = true;
      }
    });

    if (!HAS_ALREADY) {
      const newSaleItem = {
        id: String(Math.random() * (5000 - 0) + 0),
        productType: item,
        subTotal: newSubTotal,
        quantity: this.state.quantitySelected,
      };

      newSaleItensArray.push(newSaleItem);
    }

    const newSale = {
      saleItens: newSaleItensArray,
      clientId: "",
      total: newTotal,
    };
    this.setState({ sale: newSale });
  };

  onQuantitySelectedHandler = ({ itemValue }) => {
    this.setState({ quantitySelected: itemValue });
  };

  onDeleteItemHandler = ({ item }) => {
    Alert.alert("Deletar", "Deseja continuar?", [
      {
        text: "Sim",
        style: "destructive",
        onPress: () => {
          this.deleteItem(item);
        },
      },
      { text: "Não", style: "cancel" },
    ]);
  };

  deleteItem = (item) => {
    const newSale = this.state.sale;
    const saleItens = newSale.saleItens.filter(
      (element) => element.id !== item.id
    );
    let newTotal =
      newSale.total -
      (item.productType.sellPrice - item.productType.discount) * item.quantity;

    //Just some precation for beasts like -0.00 or less... : /
    newTotal = newTotal <= 0 ? 0 : newTotal;

    newSale.saleItens = saleItens;
    newSale.total = newTotal;

    this.setState({ sale: newSale });
  };

  renderItem = ({ item }) => (
    <View>
      <ItemForSale
        onPressToDelete={this.onDeleteItemHandler.bind(this, { item })}
        imgSrc={item.productType.thumbnail}
        discount={item.productType.discount}
        description={item.productType.description}
        sellPrice={item.productType.sellPrice - item.productType.discount}
        quantity={item.quantity}
        stock={item.productType.stock}
      />
    </View>
  );

  renderItemSearch = ({ item }) => {
    return (
      <ItemForSearch
        key={item.id}
        style={{ ...styles.screenScrollView, ...styles.reverseItem }}
        onPress={this.onItemSelectHandler.bind(this, { item })}
        warning={item.discount > 0 ? true : false}
        itemType={"product"}
        imgSrc={item.thumbnail}
        primaryInfo={item.description}
        secondaryInfo={item.sellPrice - item.discount}
        stock={item.stock}
      />
    );
  };

  enabledHeaderButton = (
    <TouchableOpacity
      onPress={() => {
        this.inNewSale = false;
        this.props.navigation.navigate("PaymentSale", {
          sale: this.state.sale,
        });
      }}
    >
      <View style={styles.headerButtonView}>
        <Text style={styles.headerButton}>Continuar</Text>
      </View>
    </TouchableOpacity>
  );

  disabledHeaderButton = (
    <View style={styles.headerButtonView}>
      <Text style={styles.headerButton}>Continuar</Text>
    </View>
  );

  componentDidMount() {
    this.navigationListenerlist = [
      (this.navigationListener = this.props.navigation.addListener(
        "beforeRemove",
        (e) => {
          if (this.state.sale.saleItens.length < 1 || !this.inNewSale) return;

          //Prevent default behavior of leaving the screen
          e.preventDefault();

          // Prompt the user before leaving the screen
          Alert.alert("Encerrar venda", "Deseja encerrar a venda?", [
            { text: "Cancelar", style: "cancel", onPress: () => {} },
            {
              text: "Encerrar",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => this.props.navigation.dispatch(e.data.action),
            },
          ]);
        }
      )),
      this.props.navigation.addListener("focus", () => (this.inNewSale = true)),
    ];

    this.findAllProductTypes();
  }

  render() {
    this.state.isListing = this.state.sale.saleItens.length > 0 ? true : false;

    this.props.navigation.setOptions({
      headerTitle: `R$ ${Number(this.state.sale.total).toFixed(2)}`,
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.primaryLight,
      },
      headerRight: () =>
        this.state.isListing
          ? this.enabledHeaderButton
          : this.disabledHeaderButton,
    });

    return (
      <RootContainer>
        <BodyContainer>
          {this.state.isListing ? (
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.sale.saleItens}
              keyExtractor={(item) => item.id}
              renderItem={this.renderItem}
            />
          ) : (
            <View style={styles.headerContainer}>
              <Image
                source={require("../../../../assets/new_sale_hero.png")}
                style={styles.heroImage}
              />
            </View>
          )}

          <FloatingButton
            icon={"cart-arrow-down"}
            onPress={() => {
              this.setState({ isSearchScreenVisible: true });
            }}
          />

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
            quantityNeeded={true}
            onQuantitySelected={this.onQuantitySelectedHandler}
            textInputPlaceholder="Procure um produto"
            renderItem={this.renderItemSearch}
          />
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: 128,
    height: 128,
  },
  list: { padding: 0 },
  headerButtonView: {
    margin: 12,
  },
  headerButton: {
    padding: 6,
    fontSize: 16,
    color: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 4,
  },
  screenScrollView: {
    fontSize: 14,
    marginHorizontal: 24,
  },
  reverseItem: {
    transform: [{ scaleY: -1 }],
  },
});
