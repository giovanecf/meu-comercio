import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";

import Card from "./Card";
import IconOrImg from "./IconOrImg";
import Colors from "../constants/colors";

function ModalLoadingScreen(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="fade"
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.backgroundLoadingView}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={props.onCancelButtonPress}>
            <IconOrImg
              styleIcon={styles.closeIcon}
              thumbnail="ICON"
              size={32}
              iconName="window-close"
              color={Colors.cancelButton}
            />
          </TouchableOpacity>
        </View>
        <Card style={styles.cardLoading}>
          <IconOrImg
            styleImg={styles.image}
            thumbnail={props.thumbnail}
            size={120}
            iconName="package-variant-closed"
          />
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backgroundLoadingView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  headerView: {
    width: "100%",
    height: 60,
  },
  cardLoading: {
    paddingBottom: 0,
    width: "100%",
    height: "80%",
    alignSelf: "center",
  },
  closeIcon: { padding: 12 },
  image: { width: "100%", height: "100%" },
});

export default ModalLoadingScreen;
