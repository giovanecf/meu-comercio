import { DatabaseConnection } from "./database/database_connection";

const table = "sale_item";
const db = DatabaseConnection.getConnection();

export default class SaleItemController {
  static addData(saleItem) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `insert into ${table} (subTotal, quantity, productTypeId, saleId) 
                values (?, ?, ?, ?)`,
            [
              saleItem.subTotal,
              saleItem.quantity,
              saleItem.productTypeId,
              saleItem.saleId,
            ],
            (_, { insertId, rows }) => {
              console.log("_id insert: " + insertId);
              resolve(insertId);
            }
          ),
            (sqlError) => {
              console.log(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
        }
      )
    );
  }

  static updateById(saleItem) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `update ${table} set subTotal=?, quantity=?, productTypeId=?, saleId=? where id=?;`,
            [
              saleItem.subTotal,
              saleItem.quantity,
              saleItem.productTypeId,
              saleItem.saleId,
              saleItem.id,
            ],
            () => {}
          ),
            (sqlError) => {
              console.log(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
        }
      )
    );
  }

  static deleteById(id) {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `delete from ${table} where id=?;`,
          [id],
          (_, { rows }) => {}
        ),
          (sqlError) => {
            console.log(sqlError);
          };
      },
      (txError) => {
        console.log(txError);
      }
    );
  }

  static findBySaleId(id) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `select * from ${table} where saleId=?`,
            [id],
            (_, { rows }) => {
              resolve(rows);
            }
          ),
            (sqlError) => {
              console.log(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
        }
      )
    );
  }

  static findAll() {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
            resolve(rows);
          }),
            (sqlError) => {
              console.log(sqlError);
            };
        },
        (txError) => {
          console.log(txError);
        }
      )
    );
  }
}
