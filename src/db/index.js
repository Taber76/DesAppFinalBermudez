import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("localdb.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS userprofile (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT, picture TEXT)",
        [],
        () => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY, storeid TEXT)",
            [],
            () => {
              resolve();
            },
            (_, err) => {
              reject(err);
            }
          );
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertUser = (name, password, email, picture) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO userprofile (name, password, email, picture) VALUES (?, ?, ?, ?)",
        [name, password, email, picture],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const getAllUsers = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM userprofile",
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertFavorite = (storeid) => {};
