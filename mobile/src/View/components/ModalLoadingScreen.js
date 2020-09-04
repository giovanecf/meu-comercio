import React from "react";
import { View, Modal, Image, StyleSheet } from "react-native";

import Card from "./Card";

function ModalLoadingScreen(props) {
  return (
    <Modal visible={props.visible} transparent={true} animationType="slide">
      <View style={styles.backgroundLoadingView}>
        <Card style={styles.cardLoading}>
          <Image
            style={styles.imageLoading}
            source={require("../../../assets/loading.gif")}
          />
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backgroundLoadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000040",
  },
  cardLoading: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoading: { width: 50, height: 50 },
});

export default ModalLoadingScreen;
