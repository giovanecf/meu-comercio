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

import ClientController from "../../../Controller/ClientController";
import Client from "../../../model/Client";

import IconOrImg from "../../components/IconOrImg";
import RootContainer from "../../components/RootContainer";
import BodyContainer from "../../components/BodyContainer";
import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import ModalSelectPhoto from "../../components/ModalSelectPhoto";
import ModalCamera from "../../components/ModalCamera";

import Colors from "../../constants/colors";

class NewClient extends Component {
  state = {
    client: {},
    image: null,
    isSelectingThumbnail: false,
    isCameraModal: false,
    isCpfAlreadyExists: false,
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

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  onShotTookHandler = (uri) => {
    this.setState({ isCameraModal: false });
    this.props.setFieldValue("thumbnail", uri);
  };

  checkCPF = async () => {
    let HAS_ALREADY = false;
    await ClientController.findByCPF(this.props.values.cpf).then((resolve) => {
      HAS_ALREADY = resolve.length > 0 ? true : false;
    });
    this.setState({ isCpfAlreadyExists: HAS_ALREADY });
  };

  UNSAFE_componentWillMount() {
    this.isEditMode = this.props.route.params ? true : false;

    if (this.isEditMode) {
      this.headerTitle = "Editar Cliente";
    } else {
      this.headerTitle = "Criar Cliente";
    }
  }

  componentDidMount() {
    this.navigationListenerlist = [
      (this.navigationListener = this.props.navigation.addListener(
        "beforeRemove",
        (e) => {
          if (
            (!this.props.touched.cpf &&
              !this.props.touched.name &&
              !this.props.touched.phone &&
              !this.props.touched.street &&
              !this.props.touched.district &&
              !this.props.touched.city) ||
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
                  name="account-outline"
                  color={Colors.formIcon}
                  size={32}
                />

                <View style={styles.textInputContainer}>
                  <FloatingLabelInput
                    label="CPF"
                    keyboardType="number-pad"
                    value={this.props.values.cpf}
                    onChangeText={(text) =>
                      this.props.setFieldValue("cpf", text)
                    }
                    onBlur={() => {
                      this.checkCPF();
                      this.props.setFieldTouched("cpf");
                    }}
                  />
                  {this.props.touched.cpf && this.props.errors.cpf && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {this.props.errors.cpf}
                    </Text>
                  )}
                  {this.props.touched.cpf && this.state.isCpfAlreadyExists && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      CPF já existente na base de dados
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
                    autoCapitalize="words"
                    label="Nome"
                    value={this.props.values.name}
                    onChangeText={(text) =>
                      this.props.setFieldValue("name", text)
                    }
                    multiline={true}
                    textAlignVertical="top"
                    inputStyles={styles.textInput}
                    onBlur={() => this.props.setFieldTouched("name")}
                  />
                  {this.props.touched.name && this.props.errors.name && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {this.props.errors.name}
                    </Text>
                  )}
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
                  <FloatingLabelInput
                    label="Telefone"
                    keyboardType="number-pad"
                    value={this.props.values.phone}
                    onChangeText={(text) =>
                      this.props.setFieldValue("phone", text)
                    }
                    onBlur={() => this.props.setFieldTouched("phone")}
                  />
                  {this.props.touched.phone && this.props.errors.phone && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {this.props.errors.phone}
                    </Text>
                  )}
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
                  <FloatingLabelInput
                    autoCapitalize="words"
                    label="Logradouro"
                    value={this.props.values.street}
                    onChangeText={(text) =>
                      this.props.setFieldValue("street", text)
                    }
                    multiline={true}
                    textAlignVertical="top"
                    inputStyles={styles.textInput}
                    onBlur={() => this.props.setFieldTouched("street")}
                  />
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
                    autoCapitalize="words"
                    label="Bairro"
                    value={this.props.values.district}
                    onChangeText={(text) =>
                      this.props.setFieldValue("district", text)
                    }
                    onBlur={() => this.props.setFieldTouched("district")}
                  />
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
                    autoCapitalize="words"
                    label="Cidade"
                    value={this.props.values.city}
                    onChangeText={(text) =>
                      this.props.setFieldValue("city", text)
                    }
                    onBlur={() => this.props.setFieldTouched("city")}
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
    marginVertical: 4,
  },
  iconTextInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    marginHorizontal: 12,
  },
  textInputContainer: {
    marginVertical: 3,
    marginHorizontal: 12,
    flex: 1,
  },

  addPhotoImgContainer: {
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.formBorder,
  },
  textInputContainerWithUnits: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },
  textInput: {
    paddingTop: 5,
  },
});

export default withFormik({
  mapPropsToValues: (props) => {
    //Dealing with iteration of the address
    //const street = props.route.params.item.address.split(/\|/)[0] !== "-/-|" ? props.route.params.item.address.split(/\|/)[0]: "";
    //const district = values.district !== "" ? values.district + "|" : "-/-|";
    //const city = values.city !== "" ? values.city : "-/-";
    return {
      thumbnail: props.route.params
        ? props.route.params.item.thumbnail
        : "ICON",
      cpf: props.route.params ? props.route.params.item.cpf : "",
      name: props.route.params ? props.route.params.item.name : "",
      phone: props.route.params ? props.route.params.item.phone : "",
      street:
        props.route.params && props.route.params.item.address.split(/\|/)[0]
          ? props.route.params.item.address.split(/\|/)[0]
          : "",
      district:
        props.route.params && props.route.params.item.address.split(/\|/)[1]
          ? props.route.params.item.address.split(/\|/)[1]
          : "",
      city:
        props.route.params && props.route.params.item.address.split(/\|/)[2]
          ? props.route.params.item.address.split(/\|/)[2]
          : "",
    };
  },

  validationSchema: Yup.object().shape({
    cpf: Yup.string().required("Preencha o campo CPF"),
    name: Yup.string().required("Preencha o campo Nome"),
    phone: Yup.string().required("Preencha o campo Telefone"),
    street: Yup.string(),
    district: Yup.string(),
    city: Yup.string(),
  }),

  handleSubmit: (values, { props }) => {
    let file = new Client();
    file.cpf = values.cpf;
    file.name = values.name;
    file.phone = values.phone;
    file.thumbnail = values.thumbnail || "ICON";

    //Dealing with iteration of the address
    const street = values.street !== "" ? values.street + "|" : "";
    const district = values.district !== "" ? values.district + "|" : "";
    const city = values.city !== "" ? values.city : "";

    file.address = `${street}${district}${city}`;

    //GLOBALID USER. I know, it's not a good pratice at all, but....
    file.user_id = 100;

    let insertId = "";
    let errorMsg = "";

    if (props.route.params) {
      file.id = props.route.params.item.id;
      insertId = ClientController.updateById(file);
      errorMsg =
        "Não foi possivel editar o cliente... :/ Por favor, tente reiniciar o aplicativo.";
    } else {
      insertId = ClientController.addData(file);
      errorMsg =
        "Não foi possivel incluir um novo cliente... :/ Por favor, tente reiniciar o aplicativo.";
    }

    if (insertId == null || insertId == undefined) {
      Alert.alert("Erro!", errorMsg, [
        {
          text: "Ok",
          style: "destructive",
        },
      ]);
    } else {
      console.log("ID");
      //console.log(insertId);
      setTimeout(() => {
        props.navigation.navigate("TabBottomRoutes", { screen: "Client" });
      }, 250);
    }
  },
})(NewClient);
