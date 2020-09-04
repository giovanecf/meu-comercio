import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconOrImg from "./IconOrImg";
import Colors from "../constants/colors";

export default class ItemForSale extends Component {
  render() {
    const noStockWarning =
      this.props.stock < this.props.quantity
        ? "ATENÇÃO! Estoque ABAIXO do solicidado!!!"
        : "";

    return (
      <View style={styles.container}>
        <View style={styles.thumbnailView}>
          <IconOrImg
            styleImg={styles.thumbnail}
            thumbnail={this.props.imgSrc}
            iconName="package-variant-closed"
          />
        </View>
        <View style={styles.textInfoContainer}>
          <Text numberOfLines={3} style={styles.descriptionText}>
            {this.props.description}
          </Text>
          {this.props.discount > 0 ? (
            <Text
              style={{ ...styles.priceText, ...styles.priceTextWithDiscount }}
            >
              R${Number(this.props.sellPrice).toFixed(2)}
            </Text>
          ) : (
            <Text style={styles.priceText}>
              R${Number(this.props.sellPrice).toFixed(2)}
            </Text>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.quantityText}>x {this.props.quantity}</Text>
            <Text style={styles.warningQuantityText}>{noStockWarning}</Text>
          </View>
          <Text style={styles.subTotalPriceText}>
            R$ {Number(this.props.sellPrice * this.props.quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.deleteButtonView}>
          <TouchableOpacity onPress={this.props.onPressToDelete}>
            <MaterialCommunityIcons
              name="delete-outline"
              color={Colors.deleteButton}
              size={36}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textInPrimary,
  },
  thumbnailView: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  thumbnail: { width: 50, height: 50 },
  textInfoContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  descriptionText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 13,
    marginBottom: 6,
  },
  priceText: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 11,
    marginBottom: 6,
  },
  priceTextWithDiscount: {
    color: Colors.discountIcon,
    textDecorationLine: "underline",
    textDecorationColor: Colors.discountIcon,
    marginBottom: 6,
  },
  quantityText: {
    fontSize: 8,
    fontWeight: "200",
    lineHeight: 9,
    marginBottom: 6,
  },
  warningQuantityText: {
    fontSize: 8,
    fontWeight: "200",
    lineHeight: 9,
    marginBottom: 6,
    marginHorizontal: 6,
    color: Colors.cancelButton,
  },
  subTotalPriceText: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 11,
  },
  deleteButtonView: {
    flex: 0.5,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
