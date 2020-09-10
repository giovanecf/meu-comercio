import React, { Component } from "react";

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import * as Yup from "yup";
import { withFormik } from "formik";
import FloatingLabelInput from "react-native-floating-label-input";

import UserController from "../../../Controller/UserController";
import UserApi from "../../../Controller/services/UserApi";
import Storage from "../../../Controller/services/Storage";

import IconOrImg from "../../components/IconOrImg";
import RootContainer from "../../components/RootContainer";
import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import ModalSelectPhoto from "../../components/ModalSelectPhoto";
import ModalCamera from "../../components/ModalCamera";
import Colors from "../../constants/colors";

class Singup extends Component {
  state = {
    thumbnail: "ICON",
    name: "",
    email: "",
    password: "",
    reTypedPassword: "",
    image: null,
    isSelectingThumbnail: false,
    isCameraModal: false,
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

      //console.log(result);
    } catch (E) {
      //console.log(E);
    }
  };

  onShotTookHandler = (uri) => {
    this.setState({ isCameraModal: false });
    this.props.setFieldValue("thumbnail", uri);
  };

  headerButton = (
    <TouchableOpacity onPress={this.props.handleSubmit}>
      <View style={styles.headerButtonView}>
        <Text style={styles.headerButton}>Continuar</Text>
      </View>
    </TouchableOpacity>
  );

  componentDidMount() {}

  render() {
    this.props.navigation.setOptions({
      headerTitle: "Sing up",
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.background,
        elevation: 0,
      },
      headerTintColor: "black",
      headerRight: () => this.headerButton,
    });

    return (
      <RootContainer>
        <View
          style={{
            ...StyleSheet.absoluteFill,
          }}
        >
          <Image
            style={{ flex: 1, height: null, width: null }}
            source={require("../../../../assets/simple_login_background.png")}
          />
        </View>

        <View style={styles.typeContainer}>
          <View style={styles.addPhotoImgContainer}>
            <Image
              style={{ width: 92, height: 48 }}
              source={require("../../../../assets/signed_icon.png")}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                lineHeight: 20,
              }}
            >
              Vamos criar uma nova conta!
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                lineHeight: 20,
                color: Colors.secondaryLight,
              }}
            >
              Insira seus dados
            </Text>
          </View>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.typeContainer}>
            <View style={{ ...styles.addPhotoImgContainer, marginTop: 12 }}>
              <TouchableOpacity
                onPress={() => this.setState({ isSelectingThumbnail: true })}
              >
                <IconOrImg
                  styleImg={styles.addPhotoImg}
                  iconName="camera"
                  thumbnail={this.props.values.thumbnail}
                  size={80}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.typeContainer}>
            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Nome"
              textContentType="name"
              returnKeyType="next"
              autoCapitalize="words"
              onEndEditing={() => console.log("NEXT")}
              value={this.props.values.name}
              onChangeText={(text) => this.props.setFieldValue("name", text)}
              onBlur={() => {
                this.props.setFieldTouched("name");
              }}
            />
            {this.props.touched.name && this.props.errors.name && (
              <Text style={styles.alertTextInput}>
                {this.props.errors.name}
              </Text>
            )}

            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Email"
              textContentType="emailAddress"
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
              onEndEditing={() => console.log("NEXT")}
              value={this.props.values.email}
              onChangeText={(text) => this.props.setFieldValue("email", text)}
              onBlur={() => {
                this.props.setFieldTouched("email");
              }}
            />
            {this.props.touched.email && this.props.errors.email && (
              <Text style={styles.alertTextInput}>
                {this.props.errors.email}
              </Text>
            )}

            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Senha"
              textContentType="newPassword"
              returnKeyType="next"
              autoCorrect={false}
              customShowPasswordImage={require("../../../../assets/eye-outline.png")}
              isPassword={true}
              onEndEditing={() => console.log("NEXT")}
              value={this.props.values.password}
              onChangeText={(text) =>
                this.props.setFieldValue("password", text)
              }
              onBlur={() => {
                this.props.setFieldTouched("password");
              }}
            />
            {this.props.touched.password && this.props.errors.password && (
              <Text style={styles.alertTextInput}>
                {this.props.errors.password}
              </Text>
            )}

            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Confirme a senha"
              textContentType="newPassword"
              returnKeyType="done"
              autoCorrect={false}
              customShowPasswordImage={require("../../../../assets/eye-outline.png")}
              isPassword={true}
              onEndEditing={() => console.log("OKAAAY")}
              value={this.props.values.reTypedPassword}
              onChangeText={(text) =>
                this.props.setFieldValue("reTypedPassword", text)
              }
              onBlur={() => {
                this.props.setFieldTouched("reTypedPassword");
              }}
            />
            {this.props.touched.reTypedPassword &&
              this.props.errors.reTypedPassword && (
                <Text style={styles.alertTextInput}>
                  {this.props.errors.reTypedPassword}
                </Text>
              )}
          </View>
        </ScrollView>

        {
          <ModalCamera
            visible={this.state.isCameraModal}
            tookShot={this.onShotTookHandler}
            onRequestClose={() => this.setState({ isCameraModal: false })}
            onCancelButtonPress={() => this.setState({ isCameraModal: false })}
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
  textInput: {
    height: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
    marginHorizontal: 20,
    marginVertical: 5,
    paddingLeft: 10,
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.background,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
  },
  alertTextInput: {
    marginHorizontal: 20,
    fontSize: 10,
    color: "red",
  },
});

export default withFormik({
  mapPropsToValues: (props) => {
    //Dealing with iteration of the address
    //const street = props.route.params.item.address.split(/\|/)[0] !== "-/-|" ? props.route.params.item.address.split(/\|/)[0]: "";
    //const district = values.district !== "" ? values.district + "|" : "-/-|";
    //const city = values.city !== "" ? values.city : "-/-";
    return {
      thumbnail: "ICON",
      name: "",
      email: "",
      password: "",
      reTypedPassword: "",
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Preencha o campo Nome"),
    email: Yup.string()
      .email("Email inválido")
      .required("Preencha o campo Email"),
    password: Yup.string()
      .min(8, "Mínimo de caracteres: 8")
      .required("Preencha o campo Senha"),
    reTypedPassword: Yup.string()
      .min(8, "Mínimo de caracteres: 8")
      .required("Confirme a senha")
      .oneOf([Yup.ref("password"), null], "Senhas devem ser iguais"),
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    const userApi = new UserApi();
    let user;
    const { thumbnail, name, email, password, reTypedPassword } = values;
    await userApi.singup(
      {
        email,
        password,
        name,
        thumbnail,
      },
      (error) => {
        Alert.alert("", "Erro ao adicionar um novo usuário\n" + error, [
          { text: "Ok", style: "destructive" },
        ]);
        setSubmitting(false);
      }
    );

    await userApi.subscribeToAuthChanges((obj) => {
      user = obj;
    });

    if (user) {
      //console.log("\n\n\nUUUUUUUSER");
      //console.log(user.photoURL);
      //console.log(user.displayName);
      setSubmitting(false);
      //debugger;
      await Storage.getItem("LOGGEDIN").then((data) => {
        console.log("STORAGE BEFORE: ");
        console.log(data);
        console.log(typeof data);
      });
      Storage.setItem("LOGGEDIN", true);
      await Storage.getItem("LOGGEDIN").then((data) => {
        console.log("STORAGE AFTER: ");
        console.log(data);
        console.log(typeof data);
      });
      props.navigation.navigate("TabBottomRoutes", { screen: "Sales" });
    } else {
      Alert.alert("", "USER NOT LOGGED IN", [
        { text: "Ok", style: "destructive" },
      ]);
    }
  },
})(Singup);
