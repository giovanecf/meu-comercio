import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";

import Storage from "../../Controller/services/Storage";
import UserApi from "../../Controller/services/UserApi";

import IconOrImg from "./IconOrImg";
import Colors from "../constants/colors";
import Card from "./Card";

const Header = (props) => {
  const [user, setUser] = useState({});
  const [thumbnail, setThumbnail] = useState("ICON");
  const [modalShowing, isModalShowing] = useState(false);

  const userApi = new UserApi();

  useEffect(() => {
    async function subscribeToAuthChanges() {
      await userApi.subscribeToAuthChanges((user) => {
        if (user) {
          setUser(user);
          setThumbnail(user.photoURL);
        }
      });
    }
    subscribeToAuthChanges();
  }, []);

  const onLogoutHandler = async () => {
    await userApi.logout(() => {
      isModalShowing(false);
      Storage.setItem("LOGGEDIN", false);
    });
  };

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
        <TouchableOpacity
          onPress={() => {
            isModalShowing(true);
          }}
        >
          <IconOrImg
            styleIcon={styles.userImage}
            styleImg={styles.userImage}
            thumbnail={thumbnail}
            iconName="account-outline"
            size={30}
          />
        </TouchableOpacity>
      </View>
      {
        <Modal
          transparent={true}
          visible={modalShowing}
          animationType="slide"
          onRequestClose={() => isModalShowing(false)}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00000040",
            }}
          >
            <Card
              style={{
                height: "90%",
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    padding: 12,
                    flexDirection: "row",
                    borderBottomWidth: 0.2,
                    borderBottomRadius: 3,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginVertical: 10 }}
                    onPress={() => isModalShowing(false)}
                  >
                    <IconOrImg
                      size={24}
                      iconName="window-close"
                      thumbnail="ICON"
                      color="gray"
                    />
                  </TouchableOpacity>
                  <View style={{ marginVertical: 10, marginHorizontal: 18 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        lineHeight: 22,
                        fontWeight: "bold",
                        color: Colors.secondary,
                        padding: 2,
                      }}
                    >
                      Conta
                    </Text>
                  </View>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    style={{ width: 92, height: 48 }}
                    source={require("../../../assets/signed_icon.png")}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  <View style={{ flexDirection: "row", margin: 12 }}>
                    <IconOrImg
                      styleIcon={{ width: 60, height: 60, borderRadius: 60 }}
                      styleImg={{ width: 60, height: 60, borderRadius: 60 }}
                      thumbnail={thumbnail}
                      iconName="account-outline"
                      size={120}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        marginLeft: 6,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.secondary,
                          lineHeight: 20,
                          margin: 6,
                        }}
                      >
                        {user.displayName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.secondary,
                          lineHeight: 20,
                          margin: 6,
                        }}
                      >
                        {user.email}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.materialBackground,
                      marginHorizontal: 12,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      margin: 24,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: "red",
                      }}
                      onPress={() => onLogoutHandler()}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: Colors.secondary,
                          lineHeight: 20,
                          margin: 12,
                          color: "red",
                        }}
                      >
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </Modal>
      }
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
