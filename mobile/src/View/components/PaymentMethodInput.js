import React, { Component } from "react";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-community/picker";

import Colors from "../constants/colors";

export default class PaymentMethodInput extends Component {
  state = {
    methodSelected: "",
    valueOnMethod: this.props.valueOnMethod,
    iconIndex: 0,
    iconArr: [
      "cash",
      "credit-card-outline",
      "credit-card-multiple-outline",
      "note-outline",
      "note-multiple-outline",
      "dots-horizontal",
    ],
  };

  deleteIcon =
    this.props.index === 0 ? (
      <MaterialCommunityIcons
        style={styles.icon}
        name="blank"
        color={Colors.blankIcon}
        size={32}
      />
    ) : (
      <TouchableOpacity
        onPress={this.props.onDelete.bind(this, { id: this.props.id })}
      >
        <MaterialCommunityIcons
          style={styles.icon}
          name="delete-outline"
          color={Colors.deleteButton}
          size={32}
        />
      </TouchableOpacity>
    );

  onChangeTextHandler = (value) => {
    this.setState({ valueOnMethod: value });
    this.props.onValueChange.call(this, value, this.props.id);
  };

  render() {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          style={styles.icon}
          name={this.state.iconArr[this.state.iconIndex]}
          size={28}
          color={Colors.money}
        />
        <Text style={styles.unitCashText}>R$</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.valueOnMethodTextInput}
          value={this.state.valueOnMethod}
          onChangeText={this.onChangeTextHandler}
        />
        <Picker
          style={styles.valueOnMethodPicker}
          prompt="Qual?"
          selectedValue={this.state.methodSelected}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ methodSelected: itemValue, iconIndex: itemIndex });
          }}
        >
          <Picker.Item label="Dinheiro" value="Dinheiro" />
          <Picker.Item label="Cartão Crédito" value="Cartão Crédito" />
          <Picker.Item label="Cartão Débito" value="Cartão Débito" />
          <Picker.Item label="Boleto" value="Boleto" />
          <Picker.Item label="Crediário" value="Crediário" />
          <Picker.Item label="Outro" value="Outro" />
        </Picker>
        {this.deleteIcon}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  icon: { flex: 0.3 },
  unitCashText: {
    marginHorizontal: 1,
  },
  valueOnMethodTextInput: {
    fontSize: 16,
    color: Colors.textBase,
    flex: 0.6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondaryLight,
    paddingLeft: 3,
  },
  valueOnMethodPicker: {
    flex: 1,
    height: 50,
    width: 100,
  },
});
