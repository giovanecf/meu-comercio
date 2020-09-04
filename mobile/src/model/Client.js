export default class Client {
  constructor(_id, cpf, name, phone, address, thumbnail, userId) {
    this._id = _id;
    this.cpf = cpf;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.thumbnail = thumbnail;
    this.userId = userId;
  }
}
