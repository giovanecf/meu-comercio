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

import ProductTypeController from "../../../Controller/ProductTypeController";
import ProductController from "../../../Controller/ProductController";

import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import ImageViewer from "../../components/ImageViewer";
import FloatingButton from "../../components/FloatingButton";
import RootContainer from "../../components/RootContainer";
import BodyContainer from "../../components/BodyContainer";
import IconOrImg from "../../components/IconOrImg";
import Colors from "../../constants/colors";

export default class ProductDetails extends Component {
  state = {
    productType: this.props.route.params.item,
    isLoading: false,
    isImageViewerShowing: false,
  };

  onDeleteHandler = () => {
    Alert.alert(
      "Excluir esse cliente?",
      "O seguinte cliente será excluido premanemtemente: " +
        this.state.productType.description,
      [
        {
          text: "Cancelar",
          style: "destructive",
        },

        {
          text: "Excluir",
          style: "default",
          onPress: this.deleteProduct,
        },
      ]
    );
  };

  deleteProduct = async () => {
    this.setState({ isLoading: true });
    await ProductController.deleteAllByProductTypeId(this.state.productType.id);
    await ProductTypeController.deleteById(this.state.productType.id);

    this.props.navigation.navigate("TabBottomRoutes", { screen: "Product" });
  };

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

    return (
      <RootContainer>
        <BodyContainer>
          <ScrollView style={styles.container} onScroll={this.onScrollHandler}>
            <View style={styles.typeContainer}>
              <View style={styles.photoImgContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.state.productType.thumbnail !== "ICON"
                      ? this.setState({ isImageViewerShowing: true })
                      : this.setState({ isImageViewerShowing: false });
                  }}
                >
                  <IconOrImg
                    styleImg={styles.photoImg}
                    thumbnail={this.state.productType.thumbnail}
                    size={120}
                    iconName="package-variant-closed"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="cube"
                  color={Colors.formIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text
                    style={{ ...styles.textInput, ...styles.nameInputText }}
                  >
                    {this.state.productType.description}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="currency-usd"
                  color={Colors.formIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>
                    R$ {this.state.productType.costPrice}
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
                  <Text style={styles.textInput}>
                    R$ {this.state.productType.sellPrice}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="sale"
                  color={Colors.discountIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>
                    R$ {this.state.productType.discount}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.typeContainer}>
              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="inbox-multiple-outline"
                  color={Colors.formIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <Text style={styles.textInput}>
                    {this.state.productType.stock}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomView}></View>
          </ScrollView>
          <FloatingButton
            icon={"pencil-outline"}
            onPress={() => {
              this.props.navigation.navigate("NewProduct", {
                item: this.state.productType,
              });
            }}
          />
          {
            <ImageViewer
              visible={this.state.isImageViewerShowing}
              thumbnail={this.state.productType.thumbnail}
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
    borderRadius: 5,
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
  nameInputText: {
    fontSize: 18,
  },
  bottomView: {
    paddingTop: 300,
  },
});
