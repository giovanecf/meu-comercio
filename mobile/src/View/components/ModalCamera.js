import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import { Camera } from "expo-camera";

import IconOrImg from "./IconOrImg";
import ModalLoadingScreen from "./ModalLoadingScreen";

function ModalCamera(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [ref, setRef] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.auto);
  const [iconFlash, setIconFlash] = useState("flash-auto");
  const [onShot, setOnShot] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <Text>
        SEM ACESSO a câmera. Por favor, re-abra a tela e conceda premissão.
      </Text>
    );
  }
  return (
    <Modal
      style={{ flex: 1 }}
      visible={props.visible}
      animationType="slide"
      onRequestClose={props.onRequestClose}
    >
      <Camera
        style={{ flex: 1 }}
        flashMode={flash}
        type={type}
        ref={(ref) => {
          setRef(ref);
        }}
      >
        <View style={styles.iconCloseView}>
          <TouchableOpacity onPress={props.onCancelButtonPress}>
            <IconOrImg
              size={32}
              style={styles.closeIcon}
              iconName="window-close"
              thumbnail="ICON"
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <IconOrImg
                size={32}
                style={styles.shotIcon}
                iconName="cached"
                thumbnail="ICON"
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={async () => {
                if (ref) {
                  setOnShot(true);
                  const options = { quality: 0.5, base64: true };
                  const data = await ref.takePictureAsync(options);
                  setOnShot(false);
                  //console.log(data.uri);
                  props.tookShot.call(this, data.uri);
                }
              }}
            >
              {onShot ? (
                <Image
                  style={styles.shotLoadingIcon}
                  source={require("../../../assets/loading.gif")}
                />
              ) : (
                <IconOrImg
                  style={styles.shotIcon}
                  iconName="camera"
                  thumbnail="ICON"
                  color="#fff"
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.iconsView}>
            <TouchableOpacity
              onPress={() => {
                if (flash === Camera.Constants.FlashMode.auto) {
                  setFlash(Camera.Constants.FlashMode.on);
                  setIconFlash("flash");
                } else if (flash === Camera.Constants.FlashMode.on) {
                  setFlash(Camera.Constants.FlashMode.off);
                  setIconFlash("flash-off");
                } else {
                  setFlash(Camera.Constants.FlashMode.auto);
                  setIconFlash("flash-auto");
                }
              }}
            >
              <IconOrImg
                size={32}
                style={styles.shotIcon}
                iconName={iconFlash}
                thumbnail="ICON"
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {<ModalLoadingScreen visible={false} />}
      </Camera>
    </Modal>
  );
}

const styles = StyleSheet.create({
  shotIcon: {
    flex: 1,
    margin: 10,
  },
  iconsView: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    margin: 24,
  },
  iconCloseView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 22,
  },
  flashIcon: {},
  shotIcon: {},
  shotLoadingIcon: {
    width: 52,
    height: 52,
  },
});

export default ModalCamera;
