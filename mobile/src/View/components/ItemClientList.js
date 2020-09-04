import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

import IconOrImg from "./IconOrImg";
import Colors from "../constants/colors";

function ItemClientList(props) {
  const { thumbnail, name } = props;

  return (
    <TouchableOpacity style={styles.productButton} onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.imageItemView}>
          <IconOrImg styleImg={styles.imageItem} thumbnail={thumbnail} />
        </View>
        <View style={styles.nameItemView}>
          <Text numberOfLines={1} style={styles.nameItem}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  imageItemView: {
    flex: 0.4,
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 6,
  },
  imageItem: {
    height: 42,
    width: 42,
    borderRadius: 24,
    borderWidth: 1,
  },

  nameItemView: { flex: 1, alignItems: "flex-start", justifyContent: "center" },
  nameItem: {
    marginHorizontal: 12,
    color: Colors.secondary,
    fontSize: 16,
  },
});

export default ItemClientList;
