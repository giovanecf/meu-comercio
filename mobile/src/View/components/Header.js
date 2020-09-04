import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import IconorImg from "./IconOrImg";
import Colors from "../constants/colors";
import Card from "./Card";

const Header = (props) => {
  return (
    <Card style={styles.barra}>
      <View style={styles.logoView}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.logoImage}
            source={require("../../../assets/icon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleView}>
        {props.withSearch ? (
          <TextInput
            style={styles.inputSearch}
            placeholder={props.placeholder}
            onChangeText={(value) =>
              props.onChangeText.call(this, value !== "" ? value : "")
            }
          />
        ) : (
          <Text style={styles.text}>{props.title}</Text>
        )}
      </View>
      <View style={styles.userView}>
        <TouchableOpacity onPress={() => {}}>
          <IconorImg
            styleIcon={styles.userImage}
            styleImg={styles.userImage}
            thumbnail="ICON"
            iconName="account-outline"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  barra: {
    backgroundColor: "#fff",
    marginTop: 30,
    marginBottom: 6,
    marginHorizontal: 18,
    height: 48,
  },

  logoView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  middleView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    textShadowColor: Colors.secondary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  userView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },

  userImage: {
    margin: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  inputSearch: {
    fontSize: 18,
  },
});

export default Header;
