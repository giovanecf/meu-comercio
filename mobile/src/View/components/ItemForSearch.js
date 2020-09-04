import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import IconOrImg from "./IconOrImg";

import Colors from "../constants/colors";

function ItemForSearch(props) {
  let secondaryInfoText = props.secondaryInfo;

  let thumbnailImage = (
    <IconOrImg
      styleImg={styles.itemImg}
      styleIcon={styles.itemImg}
      thumbnail={props.imgSrc}
      iconName="account-circle-outline"
      size={40}
    />
  );

  if (props.itemType === "product") {
    secondaryInfoText = `R$ ${Number(props.secondaryInfo).toFixed(2)}   -   x${
      props.stock
    }`;
    thumbnailImage = (
      <IconOrImg
        styleImg={{ ...styles.itemImg, ...styles.productItemImg }}
        styleIcon={{ ...styles.itemImg, ...styles.productItemImg }}
        thumbnail={props.imgSrc}
        iconName="package-variant-closed"
        size={40}
      />
    );
  }

  let secondaryInfoTag = (
    <Text style={{ ...styles.itemText, ...styles.itemPriceText }}>
      {secondaryInfoText}
    </Text>
  );

  if (props.warning) {
    secondaryInfoTag = (
      <Text
        style={{
          ...styles.itemText,
          ...styles.itemPriceTextWithDiscount,
        }}
      >
        {secondaryInfoText}
      </Text>
    );
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.itemView, ...props.style }}>
        {thumbnailImage}
        <View style={styles.itemTextView}>
          <Text numberOfLines={2} style={styles.itemText}>
            {props.primaryInfo}
          </Text>
          {secondaryInfoTag}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textInPrimary,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginHorizontal: 12,
  },
  productItemImg: {
    borderRadius: 4,
  },
  itemTextView: {
    maxWidth: "90%",
    flexDirection: "column",
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    color: Colors.secondaryLight,
  },
  itemPriceText: { fontSize: 10 },
  itemPriceTextWithDiscount: {
    fontSize: 10,
    color: Colors.discountIcon,
  },
});

export default ItemForSearch;
