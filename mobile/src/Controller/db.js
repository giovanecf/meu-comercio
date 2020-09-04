const users = [
  {
    _id: "0001",
    login: "apple537",
    pass: "apple537",
    thumbnail: require("./../../assets/perfil.jpg"),
    name: "Apple",
  },
];

const clients = [
  {
    _id: "0001",
    cpf: "167.304.647-10",
    name: "Iolanda Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0002",
    cpf: "167.304.647-12",
    name: "Iure Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0007",
    cpf: "167.304.647-11",
    name: "Cat Figueiredo",
    thumbnail: "ICON",
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0003",
    cpf: "167.304.647-22",
    name: "Francisca Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },
  {
    _id: "0006",
    cpf: "167.304.647-13",
    name: "Melzinha Figueiredo",
    thumbnail: "ICON",
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0004",
    cpf: "167.304.647-21",
    name: "Marcelo Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0005",
    cpf: "167.304.647-31",
    name: "Luanda Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0008",
    cpf: "167.304.647-23",
    name: "Geovani Figueiredo",
    thumbnail: "ICON",
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0009",
    cpf: "000.000.000-01",
    name:
      "Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Rafael Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon",
    thumbnail: require("./../../assets/pedro_I.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0010",
    cpf: "167.304.647-10",
    name: "Iolanda Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0011",
    cpf: "167.304.647-12",
    name: "Iure Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0012",
    cpf: "167.304.647-11",
    name: "Cat Figueiredo",
    thumbnail: "ICON",
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0013",
    cpf: "167.304.647-22",
    name: "Francisca Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },
  {
    _id: "0014",
    cpf: "167.304.647-13",
    name: "Melzinha Figueiredo",
    thumbnail: "ICON",
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0015",
    cpf: "167.304.647-21",
    name: "Marcelo Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "00016",
    cpf: "167.304.647-31",
    name: "Luanda Figueiredo",
    thumbnail: require("./../../assets/perfil.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0017",
    cpf: "167.304.647-23",
    name: "Geovani Figueiredo",
    thumbnail: "ICON",
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },

  {
    _id: "0018",
    cpf: "000.000.000-01",
    name:
      "Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Rafael Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon",
    thumbnail: require("./../../assets/pedro_I.jpg"),
    phone: "21 986130119",
    address: "Rua Rosa Cristina Rulfs Vargas, 78|Jardim Imperial|Itaboraí",
  },
];

const productTypes = [
  {
    _id: "0001",
    description: 'Macbook Pro 15" 2015',
    costPrice: 1000.9,
    sellPrice: 22102.9,
    stock: 12,
    discount: 0,
    thumbnail: require("./../../assets/macbook.jpg"),
  },

  {
    _id: "0002",
    description: 'Macbook Pro 15" 2015',
    costPrice: 1000.9,
    sellPrice: 22102.9,
    stock: 12,
    discount: 0,
    thumbnail: require("./../../assets/macbook.jpg"),
  },

  {
    _id: "0003",
    description: 'Macbook Pro 15" 2015',
    costPrice: 1000.9,
    sellPrice: 22102.9,
    stock: 12,
    discount: 0,
    thumbnail: "ICON",
  },

  {
    _id: "0004",
    description: 'Macbook Pro 15" 2015',
    costPrice: 1000.9,
    sellPrice: 22102.9,
    stock: 12,
    discount: 15.9,
    thumbnail: require("./../../assets/macbook.jpg"),
  },

  {
    _id: "0005",
    description: "Lata de CocaCola 510ml",
    costPrice: 2.5,
    sellPrice: 6.9,
    stock: 5,
    discount: 0,
    thumbnail: "ICON",
  },

  {
    _id: "0006",
    description: "Lata de CocaCola 510ml",
    costPrice: 2.5,
    sellPrice: 6.9,
    stock: 10,
    discount: 1.2,
    thumbnail: require("./../../assets/cocacola.jpg"),
  },

  {
    _id: "0007",
    description: "Lata de CocaCola 510ml",
    costPrice: 2.5,
    sellPrice: 10.9,
    stock: 14,
    discount: 2.2,
    thumbnail: require("./../../assets/cocacola.jpg"),
  },

  {
    _id: "0008",
    description: "Fone JBL T500BT c/ mic",
    costPrice: 40.9,
    sellPrice: 120.9,
    stock: 12,
    discount: 20,
    thumbnail: "ICON",
  },

  {
    _id: "0009",
    description: "Fone JBL T501BT c/ mic",
    costPrice: 80.9,
    sellPrice: 120.9,
    stock: 6,
    discount: 0,
    thumbnail: require("./../../assets/fone_jbl.jpg"),
  },

  {
    _id: "0010",
    description: "Fone JBL T400BT c/ mic",
    costPrice: 60.9,
    sellPrice: 180.9,
    stock: 3,
    discount: 50,
    thumbnail: require("./../../assets/fone_jbl.jpg"),
  },
  {
    _id: "0011",
    description: 'Macbook Pro i7 SSD 512GB 32GB RAM 15" 2015',
    costPrice: 1000.9,
    sellPrice: 22102.9,
    stock: 12,
    discount: 0,
    thumbnail: "ICON",
  },
];

module.exports = {
  users,
  clients,
  productTypes,
};
