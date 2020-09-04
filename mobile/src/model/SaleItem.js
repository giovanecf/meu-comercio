export default class Client {
  constructor(subTotal, quantify, productTypeId, saleId) {
    this.subTotal = subTotal;
    this.quantify = quantify;
    this.productTypeId = productTypeId;
    //cause market does that way
    this.saleId = saleId;
  }
}
