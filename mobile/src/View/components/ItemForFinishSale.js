import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

import Colors from "../constants/colors";

function ItemForFinishSale(props) {
  const { id, productType, subTotal, quantity } = props.saleItem;
  const { description, sellPrice, discount } = productType;
  const productTypeId = productType.id;

  return (
    <View style={{ ...styles.itemTextView, ...props.style }}>
      <Text
        style={styles.itemText}
      >{`${id} | ${productTypeId} | ${description} | R$${sellPrice} | R$${discount} | x${quantity} | R$${subTotal}`}</Text>
    </View>
  );
}

//{`${_id} | ${product_id} | ${description} | R$${sellPrice} | R$${discount} | x${quantity} | R$${sub_total}`}

const styles = StyleSheet.create({
  itemTextView: {
    maxWidth: "90%",
    borderBottomColor: Colors.secondaryLight,
    borderBottomWidth: 0.5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    color: Colors.secondaryLight,
  },
});

export default ItemForFinishSale;
