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

import IconOrImg from "../../components/IconOrImg";
import RootContainer from "../../components/RootContainer";
import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import ModalSelectPhoto from "../../components/ModalSelectPhoto";
import ModalCamera from "../../components/ModalCamera";
import Colors from "../../constants/colors";

class ForgotPassword extends Component {
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
          <View
            style={{
              marginBottom: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 92, height: 48 }}
              source={require("../../../../assets/signed_icon.png")}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                lineHeight: 20,
              }}
            >
              Vamos recuperar sua conta!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                lineHeight: 20,
                color: Colors.secondaryLight,
              }}
            >
              Insira seu e-mail vinculado à conta para recuperação.
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Email de recuperação"
              autoCapitalize="none"
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
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Ajuda",
                "\n1 - Informe o email que cadastrou no campo de texto a cima.\n2 - Enviaremos um email para o endereço informado\n3 - Verifique sua caixa de entrada\nou de spam. \n4 - 😆😝🤓😎",
                [{ text: "Ok", style: "destructive" }]
              );
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: 180,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "cornflowerblue",
                  fontWeight: "bold",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              >
                Ajuda
              </Text>
            </View>
          </TouchableOpacity>
        </View>

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
    height: 60,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
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
      email: "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email inválido")
      .required("Preencha o campo Email"),
  }),

  handleSubmit: async (values, { props, setSubmitting }) => {
    const userApi = new UserApi();

    if (false) {
      props.navigation.navigate("TabBottomRoutes", { screen: "Sales" });
    }
  },
})(ForgotPassword);
