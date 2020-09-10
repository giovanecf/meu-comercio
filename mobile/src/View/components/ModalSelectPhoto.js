import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

import Card from "./Card";

import Colors from "../constants/colors";

function ModalSelectPhoto(props) {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="fade"
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.backgroundLoadingView}>
        <Card>
          <View style={styles.container}>
            <View style={styles.titleTextView}>
              <Text style={styles.titleText}>Selecionar foto</Text>
            </View>
            <View style={styles.optionsTextView}>
              <TouchableOpacity onPress={props.onShotSelect}>
                <Text style={styles.optionsText}>Tirar foto</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onPickSelect}>
                <Text style={styles.optionsText}>Escolher foto</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelTextView}>
              <TouchableOpacity onPress={props.onCancel}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  container: {
    paddingTop: 18,
    paddingLeft: 24,
  },
  titleTextView: {
    paddingBottom: 12,
    paddingRight: 24,
  },
  optionsTextView: {
    paddingRight: 24,
  },
  cancelTextView: {
    paddingTop: 12,
    marginHorizontal: 24,
    marginVertical: 6,
    alignItems: "flex-end",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingRight: 64,
  },
  optionsText: {
    fontSize: 16,
    margin: 0,
    paddingVertical: 12,
    paddingRight: 64,
    color: Colors.secondaryLight,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.cancelButton,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
});

export default ModalSelectPhoto;
