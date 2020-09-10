import { DatabaseConnection } from "./database_connection";

export default class DatabaseInit {
  constructor() {
    this.db = DatabaseConnection.getConnection();
    this.db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("Foreign keys turned on")
    );

    this.initDB();
  }

  // TEXT
  // NUMERIC
  // INTEGER
  // REAL
  // BLOB

  initDB() {
    var sql = [
      `DROP TABLE IF EXISTS user;`,
      `DROP TABLE IF EXISTS product;`,
      `DROP TABLE IF EXISTS product_type;`,
      `DROP TABLE IF EXISTS client;`,
      `DROP TABLE IF EXISTS sale;`,
      `DROP TABLE IF EXISTS sale_item;`,
      `DROP TABLE IF EXISTS payment_method;`,

      `create table if not exists user (
        id integer primary key,
        login text,
        password text,
        name text,
        thumbnail text 
        );`,

      `create table if not exists client (
        id integer primary key autoincrement,
        cpf text,
        name text,
        phone text,
        address text,
        thumbnail text,
        userId integer,
        foreign key (userId) references user (id)
        );`,

      `create table if not exists product_type (
          id integer primary key autoincrement,
          description text,
          costPrice real,
          sellPrice real,
          stock integer,
          discount real,
          thumbnail text,
          userId integer,
          foreign key (userId) references user (id)
      );`,

      `create table if not exists product (
          id integer primary key autoincrement,
          barCode text,
          userId integer,
          productTypeId integer,
          foreign key (userId) references user (id),
          foreign key (productTypeId) references product_type (id)
      );`,

      `create table if not exists sale (
          id integer primary key autoincrement,
          total real,
          createAt datetime dafault current_timestamp,
          userId integer,
          clientId integer,
          foreign key (userId) references user (id),
          foreign key (clientId) references client (id)
      );`,

      `create table if not exists sale_item (
        id integer primary key autoincrement,
        subTotal real,
        quantity integer,
        productTypeId integer,
        saleId integer,
        foreign key (productTypeId) references product_type (id),
        foreign key (saleId) references sale (id)
    );`,

      `create table if not exists payment_method (
      id integer primary key autoincrement,
      method text,
      value real,
      saleId integer,
      foreign key (saleId) references sale (id)
  );`,

      `insert into user(id, login, password, name, thumbnail) values(100, 'admin', 'admin123', 'administrador', 'ICON');`,
    ];

    this.db.transaction(
      (tx) => {
        for (var i = 0; i < sql.length; i++) {
          //console.log("execute sql : " + sql[i]);
          tx.executeSql(sql[i]);
        }
      },
      (error) => {
        //console.log("error call back : " + JSON.stringify(error));
        //console.log(error);
      },
      () => {
        //console.log("transaction complete call back ");
      }
    );
  }
}
