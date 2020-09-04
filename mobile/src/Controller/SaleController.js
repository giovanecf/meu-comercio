import { DatabaseConnection } from "./database/database_connection";

const table = "sale";
const db = DatabaseConnection.getConnection();

export default class SaleController {
  static addData(sale) {
    let params = [sale.total, sale.userId, sale.clientId];
    let query = `insert into ${table} (total, userId, clientId) 
    values (?, ?, ?)`;
    if (sale.clientId === "") {
      params = [sale.total, sale.userId];
      query = `insert into ${table} (total, userId) 
      values (?, ?)`;
    }
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(query, [...params], (_, { insertId, rows }) => {
            console.log("id insert: " + insertId);
            resolve(insertId);
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

  static updateById(sale) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `update ${table} set total=?, userId=?, clientId=? where id = ?;`,
            [sale.total, sale.userId, sale.clientId, sale.id],
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
          `delete from ${table} where id = ?;`,
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

  static findAllByClientId(clientId) {
    return new Promise((resolve, reject) =>
      db.transaction(
        (tx) => {
          tx.executeSql(
            `select * from ${table} where clientId=?`,
            [clientId],
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
