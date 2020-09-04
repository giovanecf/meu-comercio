import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-community/picker";

import Colors from "../constants/colors";

export default class SearchPage extends Component {
  state = {
    quantitySelected: 1,
    listOptionsPicker: [],
    textInputPlaceholder: this.props.textInputPlaceholder || "...",
    quantityNeeded: this.props.quantityNeeded || false,
    searchedArray: this.props.searchedArray,
  };

  render() {
    let quantityView = <View></View>;
    if (this.state.quantityNeeded) {
      this.state.listOptionsPicker.length = 0;
      for (let i = 1; i <= 100; i++) {
        this.state.listOptionsPicker.push(
          <Picker.Item label={`${i}`} value={`${i}`} key={i} />
        );
      }

      quantityView = (
        <View style={styles.pickerNumberView}>
          <Picker
            style={{ height: 50, width: 100 }}
            prompt="Quantos?"
            selectedValue={this.state.quantitySelected}
            onValueChange={(itemValue, itemIndex) => {
              this.props.onQuantitySelected.call(this, { itemValue });
              this.setState({ quantitySelected: itemValue });
            }}
          >
            {this.state.listOptionsPicker}
          </Picker>
        </View>
      );
    }

    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <TouchableOpacity
          style={styles.buttonBottom}
          onPress={this.props.cancelButtonOnPress}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Colors.primaryDark}
          />
        </TouchableOpacity>
        <View style={styles.screenScrollViewContainer}>
          <FlatList
            keyboardShouldPersistTaps={"handled"}
            renderItem={this.props.renderItem}
            data={this.props.searchedArray}
            keyExtractor={(item) => String(item.id)}
            style={styles.reverseItem}
          />
        </View>
        <View style={styles.inputBottomContainer}>
          <TextInput
            style={styles.inputBottom}
            placeholder={this.state.textInputPlaceholder}
            onChangeText={this.props.onChangeText}
          />
          {quantityView}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  screenScrollViewContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  inputBottomContainer: {
    flexDirection: "row",
  },
  pickerNumberView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
  },
  inputBottom: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 6,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: Colors.background,
    color: Colors.secondary,
    fontSize: 16,
  },
  buttonBottom: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: Colors.background,
    backgroundColor: Colors.background,
  },
  reverseItem: {
    transform: [{ scaleY: -1 }],
  },
});
