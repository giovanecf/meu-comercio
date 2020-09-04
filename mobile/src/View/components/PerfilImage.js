import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function PerfilImage(props) {
  return (
    <View style={styles.imageView}>
      <Image style={styles.image} source={props.src} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
});

export default PerfilImage;
