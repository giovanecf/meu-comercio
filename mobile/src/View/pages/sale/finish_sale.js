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
  SafeAreaView,
} from "react-native";

import ClientController from "../../../Controller/ClientController";
import SaleController from "../../../Controller/SaleController";
import SaleItemController from "../../../Controller/SaleItemController";
import PaymentMethodController from "../../../Controller/PaymentMethodController";
import ProductController from "../../../Controller/ProductController";
import ProductTypeController from "../../../Controller/ProductTypeController";

import Sale from "../../../model/Sale";
import SaleItem from "../../../model/SaleItem";
import Product from "../../../model/Product";
import ProductType from "../../../model/ProductType";
import PaymentMethod from "../../../model/PaymentMethod";

import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import RootContainer from "../../components/RootContainer";
import BodyContainer from "../../components/BodyContainer";
import Card from "../../components/Card";
import Colors from "../../constants/colors";

export default class FinishSale extends Component {
  state = {
    sale: this.props.route.params.sale,
    paymentMethods: this.props.route.params.paymentMethods,
    isLoading: false,
  };

  finishSale = async () => {
    // CREATING SAME VARIBLES
    let dbPromise = {};
    let insertSaleId = 0;
    //GETTING VARIABLES
    const { clientId, total, saleItens } = this.state.sale;
    // NOT A GOOD PRATICE... I KNOW.....
    const userId = 100;

    // CREATING SALE clientId, total, userId
    const sale = new Sale(total, userId, clientId);

    dbPromise = SaleController.addData(sale);
    await dbPromise.then((resolve) => {
      insertSaleId = resolve;
    });

    //SAVING ITENS SALE && UPDATING STOCK

    await saleItens.forEach((element) => {
      const { subTotal, quantity, productType } = element;
      let newStock = 0;
      //SAVING ITENS SALE

      const saleItem = new SaleItem(
        subTotal,
        quantity,
        productType.id,
        insertSaleId
      );

      SaleItemController.addData(saleItem);

      //UPDATING STOCK

      newStock =
        Number(productType.stock) > Number(quantity)
          ? Number(productType.stock - quantity)
          : 0;

      productType.stock = newStock;

      ProductTypeController.updateById(productType);

      ProductController.deleteAllByProductTypeId(productType.id);

      for (let i = 0; i < newStock; i++) {
        let product = new Product(
          String(Math.floor(Math.random() * 100000)),
          userId,
          productType.id
        );
        ProductController.addData(product);
      }
    });

    console.log("FOI SALEITENS && UPDATE STOCK");

    //SAVING PAYMENT METHODS

    await this.state.paymentMethods.forEach(async (element) => {
      const { method, value } = element;

      const paymentMethod = new PaymentMethod(method, value, insertSaleId);

      await PaymentMethodController.addData(paymentMethod);
    });

    console.log("FOI PAYMENTMETHODS");

    this.jumpToHome();
  };

  jumpToHome = () => {
    this.setState({ isLoading: false });
    setTimeout(
      () =>
        this.props.navigation.navigate("TabBottomRoutes", { screen: "Client" }),
      3000
    );
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.finishSale();
  }

  render() {
    this.props.navigation.setOptions({
      headerShown: false,
    });

    return (
      <RootContainer>
        <BodyContainer>
          <View style={styles.heroImageView}>
            {this.state.isLoading ? (
              <View></View>
            ) : (
              <Image
                style={styles.heroImage}
                source={require("../../../../assets/finish_sale.gif")}
              />
            )}
          </View>

          {<ModalLoadingScreen visible={this.state.isLoading} />}
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  heroImageView: {
    marginTop: 3,
    flex: 1,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
});
