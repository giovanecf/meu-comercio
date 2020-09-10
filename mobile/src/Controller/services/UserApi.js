import * as firebase from "firebase";
import "firebase/firestore";

import ApiKeys from "../constants/ApiKeys";

export default class ClientApi {
  constructor() {
    this.collectionName = "ClientCollection";
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  async login({ email, password }, onLoggedin, onError) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((value) => onLoggedin(value))
      .catch((error) => onError(error));
  }

  async singup({ email, password, name, thumbnail }, onError) {
    let snapshot;
    //console.log("NOME:" + name + "\nTHUMBNAIL: " + thumbnail);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((obj) => {
        console.log("\n\n\nUSER CREATED");
        snapshot = obj;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          console.log("The password is too weak.");
        } else if (errorCode == "auth/invalid-email") {
          console.log("Email invalid.");
        } else if (errorCode == "auth/operation-not-allowed") {
          console.log("Operation not allowed.");
        } else if (errorCode == "auth/email-already-in-use") {
          console.log("Email already created.");
        } else {
          console.log(errorMessage);
        }
        onError(errorMessage);
      });

    console.log("\nSNAP");
    //console.log(snapshot);

    console.log("\nUSER");
    //console.log(snapshot.user);

    if (snapshot)
      await snapshot.user
        .updateProfile({
          displayName: name,
          photoURL: thumbnail,
        })
        .catch((error) => {
          onError(error);
        });

    console.log("\nUSER FIM");
    //console.log(snapshot.user);
  }

  async subscribeToAuthChanges(authStateChanges) {
    await firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      authStateChanges(user);
    });
  }

  logout(onSingedOut) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("LOGED OUT");
        onSingedOut();
      });
  }
}
