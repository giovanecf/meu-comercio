import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

import IconOrImg from "./IconOrImg";
import Colors from "../constants/colors";
import Card from "./Card";

function ItemProductList(props) {
  const {
    thumbnail,
    description,
    sellPrice,
    costPrice,
    discount,
    stock,
  } = props.item;

  const discountIconView =
    discount > 0 ? (
      <IconOrImg
        thumbnail="ICON"
        color={Colors.discountIcon}
        size={16}
        iconName="sale"
      />
    ) : (
      <View></View>
    );

  const sellPriceStyle =
    discount > 0
      ? { ...styles.infoText, ...styles.sellPriceTextWithDiscount }
      : styles.infoText;

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.card}>
        <View style={styles.firstColumnView}>
          <IconOrImg
            styleImg={styles.itemThumbnail}
            styleIcon={styles.itemThumbnail}
            thumbnail={thumbnail}
            size={80}
            iconName="package-variant-closed"
          />
        </View>

        <View style={styles.secondColumnView}>
          <View style={styles.infoTextView}>
            <Text
              numberOfLines={3}
              style={{ ...styles.infoText, ...styles.descriptionText }}
            >
              {description}
            </Text>
          </View>
          <View style={{ ...styles.infoTextView, ...styles.priceView }}>
            <IconOrImg
              thumbnail="ICON"
              color={Colors.costLabel}
              size={18}
              iconName="arrow-right-circle-outline"
            />
            <Text style={styles.infoText}>{Number(costPrice).toFixed(2)}</Text>
          </View>
          <View style={{ ...styles.infoTextView, ...styles.priceView }}>
            <IconOrImg
              thumbnail="ICON"
              color={Colors.sellLabel}
              size={18}
              iconName="arrow-left-circle-outline"
            />
            <Text style={sellPriceStyle}>
              {Number(sellPrice - discount).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.thirdColumnView}>
          <View style={styles.infoTextView}>{discountIconView}</View>
          <View style={{ ...styles.infoTextView, ...styles.stockView }}>
            <Text style={styles.infoText} numberOfLines={1}>
              x{stock}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textInPrimary,
    padding: 3,
  },
  firstColumnView: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  secondColumnView: {
    flex: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  thirdColumnView: {
    flex: 2,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 6,
  },

  infoTextView: {
    margin: 6,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 14,
    color: Colors.secondaryLight,
    marginLeft: 3,
  },
  stockView: {},
  priceView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionTextView: {},
  descriptionText: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.secondary,
  },
  costPriceTextView: {},
  costPriceText: {},
  sellPriceTextView: {
    borderBottomColor: Colors.discountIcon,
    borderBottomWidth: 1,
  },
  sellPriceText: {},
  sellPriceTextWithDiscount: {
    color: Colors.discountIcon,
  },

  itemThumbnail: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ItemProductList;
