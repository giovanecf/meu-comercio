import React, { Component } from "react";

import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from "react-native";

import UserApi from "../../../Controller/services/UserApi";

import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

import FloatingLabelInput from "react-native-floating-label-input";

import Storage from "../../../Controller/services/Storage";

import ModalLoadingScreen from "../../components/ModalLoadingScreen";
import RootContainer from "../../components/RootContainer";
import Colors from "../../constants/colors";

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}
export default class Login extends Component {
  state = {
    isReady: false,
    email: "",
    password: "",
    isSubmitting: false,
  };

  onSubmiting() {
    const userApi = new UserApi();
    const { email, password } = this.state;

    this.setState({ isSubmitting: true });

    userApi.login(
      { email, password },
      (value) => {
        console.log("\n\n\nVALUEEEEE");
        console.log(value);
        Storage.setItem("LOGGEDIN", true);
        this.setState({ isSubmitting: true });
        //this.props.navigation.navigate("TabBottomRoutes", { screen: "Sales" });
      },
      (error) => {
        console.log("\n\n\nERROR");
        console.log(error.code);
        this.setState({ isSubmitting: false });
        if (
          error.code == "auth/invalid-email" ||
          error.code == "auth/wrong-password"
        ) {
          Alert.alert(
            "Senha e/ou Email incorreto(s)",
            "Por favor, verifique o email e senha informado.",
            [{ text: "Ok", style: "destructive" }]
          );
        } else if (error.code == "auth/user-disabled") {
          Alert.alert(
            "Usuário desabilitado",
            "Por favor, entre em contato com o administrador.",
            [{ text: "Ok", style: "destructive" }]
          );
        } else if (error.code == "auth/user-not-found") {
          Alert.alert(
            "Conta não encontrada",
            "Por favor, informe uma conta existente.",
            [{ text: "Ok", style: "destructive" }]
          );
        } else if (error.code == "auth/too-many-requests") {
          Alert.alert(
            "Multiplas tentativas",
            "Foi detectado multiplas tentativas de login sem sucesso. Por favor, tente novamente em alguns segundos.",
            [{ text: "Ok", style: "destructive" }]
          );
        } else {
          Alert.alert("Error desconhecido", error.message, [
            { text: "Ok", style: "destructive" },
          ]);
        }
      }
    );
  }

  constructor() {
    super();

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [height / 2, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.backgroundY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 2, 0],

      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],

      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, height / 2],

      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],

      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],

      extrapolate: Extrapolate.CLAMP,
    });
  }

  render() {
    return (
      <RootContainer
        style={{
          justifyContent: "flex-end",
          backgroundColor: Colors.background,
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.backgroundY }],
          }}
        >
          <Image
            style={{ flex: 1, height: null, width: null }}
            source={require("../../../../assets/login_page_background.png")}
          />
        </Animated.View>
        <View style={{ height: height / 2, justifyContent: "center" }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: Colors.thrid,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={{ ...styles.buttonText, color: "white" }}>
                Login
              </Text>
            </Animated.View>
          </TapGestureHandler>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Singup");
            }}
          >
            <Animated.View
              style={{
                ...styles.button,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={{ ...styles.buttonText, color: Colors.thrid }}>
                Sing Up
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#ea4335",
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text style={{ ...styles.buttonText, color: "white" }}>
              Continuar com o Google
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#2E71DC",
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text style={{ ...styles.buttonText, color: "white" }}>
              Continuar com o Facebook
            </Text>
          </Animated.View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TabBottomRoutes", {
                screen: "Sale",
              })
            }
          >
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: "white",
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text
                style={{ ...styles.buttonText, color: Colors.secondaryLight }}
              >
                Continuar sem conta
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
              height: height / 2,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: "center",
            }}
          >
            <Animated.View
              style={{
                ...StyleSheet.absoluteFill,
              }}
            >
              <Image
                style={{ flex: 1, height: null, width: null }}
                source={require("../../../../assets/simple_login_background.png")}
              />
            </Animated.View>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, "deg") }],
                  }}
                >
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Email"
              textContentType="emailAddress"
              returnKeyType="next"
              autoCorrect={false}
              autoCapitalize="none"
              onEndEditing={() => console.log("NEXT")}
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <FloatingLabelInput
              containerStyles={styles.textInput}
              label="Senha"
              textContentType="newPassword"
              returnKeyType="next"
              autoCorrect={false}
              customShowPasswordImage={require("../../../../assets/eye-outline.png")}
              isPassword={true}
              onEndEditing={() => console.log("NEXT")}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginHorizontal: 25,
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  color: Colors.secondary,
                  fontSize: 12,
                  lineHeight: 20,
                  marginRight: 2,
                }}
              >
                Ao continuar, você aceitará os
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Termos de uso",
                    "1 - Tudo que é seu é meu, e tudo que é meu... é meu mesmo. \n2 - 1",
                    [{ text: "Ok", style: "destructive" }]
                  );
                }}
              >
                <Text
                  style={{
                    color: "cornflowerblue",

                    fontSize: 12,
                    lineHeight: 20,
                  }}
                >
                  Termos de Uso
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "flex-end",

                marginHorizontal: 25,
                marginBottom: 5,
              }}
              onPress={() => {
                this.props.navigation.navigate("ForgotPassword");
              }}
            >
              <Text
                style={{
                  color: "cornflowerblue",
                  fontWeight: "bold",
                  fontSize: 12,
                  lineHeight: 24,
                }}
              >
                {"Esqueceu a senha?"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.onSubmiting();
              }}
            >
              <Animated.View style={styles.button}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: Colors.secondary,
                  }}
                >
                  Login
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {<ModalLoadingScreen visible={this.state.isSubmitting} />}
      </RootContainer>
    );
  }
}

const styles = StyleSheet.create({
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
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
});
