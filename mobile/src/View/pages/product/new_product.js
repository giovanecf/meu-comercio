import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import * as Yup from "yup";

import { withFormik } from "formik";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FloatingLabelInput from "react-native-floating-label-input";

import ProductTypeController from "../../../Controller/ProductTypeController";
import ProductController from "../../../Controller/ProductController";
import Product from "../../../model/Product";
import ProductType from "../../../model/ProductType";

import IconOrImg from "../../components/IconOrImg";
import RootContainer from "../../components/RootContainer";
import BodyContainer from "../../components/BodyContainer";
import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import ModalSelectPhoto from "../../components/ModalSelectPhoto";
import ModalCamera from "../../components/ModalCamera";

import Colors from "../../constants/colors";

class NewProduct extends Component {
  state = {
    productType: {},
    image: null,
    isSelectingThumbnail: false,
    isCameraModal: false,
  };

  headerButton = (
    <TouchableOpacity onPress={this.props.handleSubmit}>
      <View style={styles.headerButtonView}>
        <Text style={styles.headerButton}>Salvar</Text>
      </View>
    </TouchableOpacity>
  );

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

  UNSAFE_componentWillMount() {
    this.isEditMode = this.props.route.params ? true : false;

    if (this.isEditMode) {
      this.headerTitle = "Editar Produto";
    } else {
      this.headerTitle = "Criar Produto";
    }
  }

  componentDidMount() {
    this.navigationListenerlist = [
      (this.navigationListener = this.props.navigation.addListener(
        "beforeRemove",
        (e) => {
          if (
            (!this.props.touched.description &&
              !this.props.touched.costPrice &&
              !this.props.touched.sellPrice &&
              !this.props.touched.stock &&
              !this.props.touched.discount) ||
            this.props.isSubmitting
          )
            return;

          //Prevent default behavior of leaving the screen
          e.preventDefault();

          // Prompt the user before leaving the screen
          Alert.alert("Decartar dados?", "As informações serão descartadas.", [
            { text: "Cancelar", style: "cancel", onPress: () => {} },
            {
              text: "Descartar",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => this.props.navigation.dispatch(e.data.action),
            },
          ]);
        }
      )),
    ];

    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        Alert.alert(
          "Desculpe, precissamos de premissão de acesso a câmera, para continuar!"
        );
      }
    }
  };

  _pickImage = async () => {
    this.setState({ isSelectingThumbnail: false });
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.props.setFieldValue("thumbnail", result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  onShotTookHandler = (uri) => {
    this.setState({ isCameraModal: false });
    this.props.setFieldValue("thumbnail", uri);
  };

  render() {
    this.props.navigation.setOptions({
      headerTitle: this.headerTitle,
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
              <View style={styles.addPhotoImgContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ isSelectingThumbnail: true })}
                >
                  <IconOrImg
                    styleImg={styles.addPhotoImg}
                    thumbnail={this.props.values.thumbnail}
                    iconName="camera"
                    size={80}
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
                  <FloatingLabelInput
                    containerStyles={styles.textInput}
                    multiline={true}
                    textAlignVertical="top"
                    inputStyles={{ paddingTop: 5 }}
                    label="Descrição"
                    value={this.props.values.description}
                    onChangeText={(text) =>
                      this.props.setFieldValue("description", text)
                    }
                    onBlur={() => this.props.setFieldTouched("description")}
                  />
                  {this.props.touched.description &&
                    this.props.errors.description && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {this.props.errors.description}
                      </Text>
                    )}
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
                  <FloatingLabelInput
                    containerStyles={styles.textInput}
                    label="Preço de custo (R$)"
                    keyboardType="decimal-pad"
                    value={this.props.values.costPrice}
                    onChangeText={(text) =>
                      this.props.setFieldValue("costPrice", text)
                    }
                    onBlur={() => this.props.setFieldTouched("costPrice")}
                  />
                  {this.props.touched.costPrice &&
                    this.props.errors.costPrice && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {this.props.errors.costPrice}
                      </Text>
                    )}
                </View>
              </View>

              <View style={styles.iconTextInputContainer}>
                <MaterialCommunityIcons
                  name="blank"
                  color={Colors.blankIcon}
                  size={32}
                />
                <View style={styles.textInputContainer}>
                  <FloatingLabelInput
                    containerStyles={styles.textInput}
                    label="Preço de venda (R$)"
                    keyboardType="decimal-pad"
                    value={this.props.values.sellPrice}
                    onChangeText={(text) =>
                      this.props.setFieldValue("sellPrice", text)
                    }
                    onBlur={() => this.props.setFieldTouched("sellPrice")}
                  />
                  {this.props.touched.sellPrice &&
                    this.props.errors.sellPrice && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {this.props.errors.sellPrice}
                      </Text>
                    )}
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
                  <FloatingLabelInput
                    containerStyles={styles.textInput}
                    label="Estoque (un.)"
                    keyboardType="number-pad"
                    value={this.props.values.stock}
                    onChangeText={(text) =>
                      this.props.setFieldValue("stock", text)
                    }
                    onBlur={() => this.props.setFieldTouched("stock")}
                  />
                  {this.props.touched.stock && this.props.errors.stock && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {this.props.errors.stock}
                    </Text>
                  )}
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
                  <FloatingLabelInput
                    containerStyles={styles.textInput}
                    label="Desconto (R$)"
                    keyboardType="decimal-pad"
                    value={this.props.values.discount}
                    onChangeText={(text) =>
                      this.props.setFieldValue("discount", text)
                    }
                    onBlur={() => this.props.setFieldTouched("discount")}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          {
            <ModalCamera
              visible={this.state.isCameraModal}
              tookShot={this.onShotTookHandler}
              onRequestClose={() => this.setState({ isCameraModal: false })}
              onCancelButtonPress={() =>
                this.setState({ isCameraModal: false })
              }
            />
          }
          {
            <ModalSelectPhoto
              visible={this.state.isSelectingThumbnail}
              onShotSelect={() =>
                this.setState({
                  isSelectingThumbnail: false,
                  isCameraModal: true,
                })
              }
              onPickSelect={this._pickImage}
              onCancel={() => this.setState({ isSelectingThumbnail: false })}
              onRequestClose={() =>
                this.setState({ isSelectingThumbnail: false })
              }
            />
          }
          {<ModalLoadingScreen visible={this.props.isSubmitting} />}
        </BodyContainer>
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButtonView: {
    margin: 12,
  },
  headerButton: {
    padding: 6,
    fontSize: 16,
    color: Colors.saveButton,
    borderWidth: 1,
    borderColor: Colors.saveButton,
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

  addPhotoImgContainer: {
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoImg: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  textInputContainerWithUnits: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },

  textInput: {
    height: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
    paddingLeft: 10,
    backgroundColor: Colors.background,
  },
});

export default withFormik({
  mapPropsToValues: (props) => {
    return {
      thumbnail: props.route.params
        ? props.route.params.item.thumbnail
        : "ICON",
      description: props.route.params
        ? props.route.params.item.description
        : "",
      sellPrice: props.route.params
        ? String(props.route.params.item.sellPrice)
        : "",
      costPrice: props.route.params
        ? String(props.route.params.item.costPrice)
        : "",
      discount: props.route.params
        ? String(props.route.params.item.discount)
        : "",
      stock: props.route.params ? String(props.route.params.item.stock) : "",
    };
  },

  validationSchema: Yup.object().shape({
    description: Yup.string().required("Preencha o campo Descrição"),
    costPrice: Yup.string().required("Preencha o campo Preço de Venda"),
    sellPrice: Yup.string().required("Preencha o campo Preço de Custo"),
    discount: Yup.string(),
    stock: Yup.string().required("Preencha o campo Estoque"),
  }),

  handleSubmit: async (values, { props }) => {
    let errorMsg = "";
    let dbPromise = {};
    let insertId = 0;
    // ADD UM TIPO DE PRODUTO
    let productType = new ProductType();
    productType.description = values.description;
    productType.costPrice = Number(values.costPrice);
    productType.sellPrice = Number(values.sellPrice);
    productType.discount = Number(values.discount);
    productType.stock = Number(values.stock);
    productType.thumbnail = values.thumbnail || "ICON";

    //GLOBALID USER. I know, it's not a good pratice at all, but....
    productType.userId = 100;

    // EDIT MODE?
    if (props.route.params) {
      console.log("EDITAR");
      productType.id = props.route.params.item.id;
      dbPromise = ProductTypeController.updateById(productType);
      errorMsg =
        "Não foi possivel editar o tipo de produto... :/ Por favor, tente reiniciar o aplicativo.";
    } else {
      console.log("CRIAR");

      dbPromise = ProductTypeController.addData(productType);
      errorMsg =
        "Não foi possivel incluir um novo tipo produto... :/ Por favor, tente reiniciar o aplicativo.";
    }

    if (dbPromise == null || dbPromise == undefined) {
      Alert.alert("Erro!", errorMsg, [
        {
          text: "Ok",
          style: "destructive",
        },
      ]);

      console.log("PASSOU4 ");

      return;
    }

    if (props.route.params) {
      console.log("EDITAR");
      insertId = props.route.params.item.id;
      await ProductController.deleteAllByProductTypeId(insertId);
    } else {
      console.log("CRIAR");
      await dbPromise.then((response) => {
        insertId = response;
      });
    }

    errorMsg =
      "Não foi possivel incluir produtos... :/ Por favor, tente reiniciar o aplicativo.";

    for (let i = 0; i < Number(values.stock); i++) {
      let product = new Product();
      product.barCode = String(Math.floor(Math.random() * 100000));
      product.productTypeId = Number(insertId);

      //GLOBALID USER. I know, it's not a good pratice at all, but....
      product.userId = 100;

      //console.log("OBJETO");
      //console.log(product);
      //console.log((i * 100) / Number(values.stock) + "%");

      let inserted = await ProductController.addData(product);

      if (inserted == null || inserted == undefined) {
        Alert.alert("Erro!", errorMsg, [
          {
            text: "Ok",
            style: "destructive",
          },
        ]);

        return;
      }
    }

    props.navigation.navigate("TabBottomRoutes", { screen: "Product" });
  },
})(NewProduct);
