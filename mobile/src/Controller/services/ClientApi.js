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

  setData(data, addDataComplete) {
    const { id, cpf, name, phone, address, thumbnail } = data;
    firebase
      .firestore()
      .collection(this.collectionName)
      .add({
        id,
        cpf,
        name,
        phone,
        address,
        thumbnail,
      })
      .then((data) => addDataComplete(data))
      .catch((error) => console.log("ERROR:" + error));
  }

  async getData(dataReceived) {
    var dataList = [];
    var snapshot = await firebase
      .firestore()
      .collection(this.collectionName)
      .orderBy("name")
      .get();

    snapshot.forEach((doc) => dataList.push(doc.data()));

    dataReceived(dataList);
  }
}
