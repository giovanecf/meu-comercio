import React, { Component } from "react";
import { View, StyleSheet, FlatList, Alert, Image } from "react-native";

import ProductTypeController from "../../../Controller/ProductTypeController";

import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import RootContainer from "../../components/RootContainer";
import HeaderContainer from "../../components/HeaderContainer";
import BodyContainer from "../../components/BodyContainer";
import ItemProductList from "../../components/ItemProductList";
import Colors from "../../constants/colors";

export default class Product extends Component {
  state = {
    productTypes: [],
  };

  findAllProductsTypes = () => {
    ProductTypeController.findAll().then((response) => {
      this.setState({
        productTypes: response._array,
      });
      //console.log("PRODUCTS");
      //console.log(this.state.productTypes);
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

  searchProductType = (search) => {
    if (search === "") {
      this.findAllProductsTypes();
      return;
    }

    ProductTypeController.findByDescription(search).then((response) => {
      this.setState({
        productTypes: response._array,
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
    <ItemProductList
      item={item}
      onPress={() => {
        this.props.navigation.navigate("ProductDetails", {
          item,
        });
      }}
    />
  );

  componentDidMount() {
    this.props.navigation.addListener("focus", this.findAllProductsTypes);
  }

  render() {
    return (
      <RootContainer>
        <HeaderContainer>
          <Header
            withSearch={true}
            placeholder="Pesquisar produtos..."
            onChangeText={this.searchProductType}
          />
        </HeaderContainer>
        <BodyContainer>
          {this.state.productTypes.length > 0 ? (
            <FlatList
              keyboardShouldPersistTaps={"handled"}
              contentContainerStyle={styles.list}
              data={this.state.productTypes}
              keyExtractor={(item) => String(item.id)}
              renderItem={this.renderItem}
              ListFooterComponent={<View style={styles.footer}></View>}
            />
          ) : (
            <View style={styles.heroImageView}>
              <Image
                style={styles.heroImage}
                source={require("../../../../assets/no_product.png")}
              />
            </View>
          )}

          <FloatingButton
            icon={"plus"}
            onPress={() => {
              this.props.navigation.navigate("NewProduct");
            }}
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
    paddingVertical: 50,
  },
});
