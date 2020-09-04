import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ClientController from "../../../Controller/ClientController";

import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import ImageViewer from "../../components/ImageViewer";
import FloatingButton from "../../components/FloatingButton";
import RootContainer from "../../components/RootContainer";
import BodyContainer from "../../components/BodyContainer";
import IconOrImg from "../../components/IconOrImg";
import Colors from "../../constants/colors";

export default class ClientDetails extends Component {
  state = {
    client: this.props.route.params.item,
    isLoading: true,
    isImageViewerShowing: false,
  };

  onDeleteHandler = () => {
    Alert.alert(
      "Excluir esse cliente?",
      "O seguinte cliente será excluido premanemtemente: " +
        this.state.client.name,
      [
        {
          text: "Cancelar",
          style: "destructive",
        },
        {
          text: "Excluir",
          style: "default",
          onPress: this.deleteClient,
        },
      ]
    );
  };

  deleteClient = () => {
    this.setState({ isLoading: true });
    ClientController.deleteById(this.state.client.id);

    this.props.navigation.navigate("TabBottomRoutes", { screen: "Client" });
  };

  componentWillUnmount() {
    console.log("Tá fazendo sentido.");
  }

  onScrollHandler = (event) => {
    if (event.nativeEvent.contentOffset.y > 0) {
      this.props.navigation.setOptions({
        headerStyle: {
          backgroundColor: Colors.background,
        },
      });
    } else {
      this.props.navigation.setOptions({
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
        },
      });
    }
  };

  headerButton = (
    <TouchableOpacity onPress={this.onDeleteHandler}>
      <View style={styles.headerButtonView}>
        <Text style={styles.headerButton}>Excluir</Text>
      </View>
    </TouchableOpacity>
  );

  UNSAFE_componentWillMount() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    this.props.navigation.setOptions({
      headerTitle: "",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
        elevation: 0,
      },
      headerTintColor: Colors.secondaryLight,
      headerRight: () => this.headerButton,
    });

    //Diff aprotion
    //const address = this.state.client.address.replace(/\|/g, ", ");

    let address = this.props.route.params.item.address.split(/\|/);

    address[0] = address[0] !== "" && address[0] ? address[0] + ", " : "-/-, ";
    address[1] = address[1] !== "" && address[1] ? address[1] + ", " : "-/-, ";
    address[2] = address[2] !== "" && address[2] ? address[2] + ", " : "-/-";

    return (
      <RootContainer>
        <BodyContainer>
          <ScrollView style={styles.container} onScroll={this.onScrollHandler}>
            <View style={styles.typeContainer}>
              <View style={styles.photoImgContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.state.client.thumbnail !== "ICON"
                      ? this.setState({ isImageViewerShowing: true })
                      : this.setState({ isImageViewerShowing: false });
                  }}
                >
                  <IconOrImg
                    styleImg={styles.photoImg}
                    thumbnail={this.state.client.thumbnail}
                    size={120}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="account-outline"
                  color={Colors.formIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={{ ...styles.textInput, ...styles.nameText }}>
                    {this.state.client.name}
                  </Text>
                </View>
              </View>

              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="blank"
                  color={Colors.blankIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>{this.state.client.cpf}</Text>
                </View>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  color={Colors.formIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>
                    {this.state.client.phone}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="home-city-outline"
                  color={Colors.formIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>{address}</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomView}></View>
          </ScrollView>

          <FloatingButton
            icon={"pencil-outline"}
            onPress={() => {
              this.props.navigation.navigate("NewClient", {
                item: this.state.client,
              });
            }}
          />

          {
            <ImageViewer
              visible={this.state.isImageViewerShowing}
              thumbnail={this.state.client.thumbnail}
              onRequestClose={() =>
                this.setState({ isImageViewerShowing: false })
              }
              onCancelButtonPress={() =>
                this.setState({ isImageViewerShowing: false })
              }
            />
          }
          {<ModalLoadingScreen visible={this.state.isLoading} />}
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerButtonView: {
    margin: 12,
  },
  headerButton: {
    padding: 6,
    fontSize: 16,
    color: Colors.deleteButton,
    borderWidth: 1,
    borderColor: Colors.deleteButton,
    borderRadius: 4,
  },
  headerWithElevation: {
    backgroundColor: Colors.background,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 4,
    borderRadius: 3,
  },
  headerWithoutElevation: {
    backgroundColor: Colors.background,
  },
  typeContainer: {
    marginVertical: 12,
  },
  iconTextInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    marginHorizontal: 12,
  },
  textInputContainer: {
    marginHorizontal: 12,
    flex: 1,
  },

  photoImgContainer: {
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  photoImg: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Colors.formBorder,
  },
  textInput: {
    borderBottomWidth: 1,
    borderRadius: 4,
    borderColor: Colors.formBorder,
    color: Colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  nameText: {
    fontSize: 18,
  },

  bottomView: {
    paddingTop: 300,
  },
});
