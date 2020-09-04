export default class ProductType {
  constructor(
    id,
    description,
    costPrice,
    sellPrice,
    stock,
    discount,
    thumbnail,
    userId
  ) {
    this.id = id;
    this.description = description;
    this.costPrice = costPrice;
    this.sellPrice = sellPrice;
    this.stock = stock;
    this.discount = discount;
    this.thumbnail = thumbnail;
    this.userId = userId;
  }
}
