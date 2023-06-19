import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("localdb.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS userprofile (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT, picture TEXT)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(new Error(`Error initializing database: ${err.message}`));
        }
      );
    });
  });
  return promise;
};

export const dropTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS userprofile",
        [],
        () => {
          console.log("Tabla userprofile eliminada");
          resolve();
        },
        (_, err) => {
          console.error("Error al eliminar la tabla userprofile:", err);
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addUserToSqlite = (userData) => {
  console.log("addUserToSqlite INTENTO", userData);
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO userprofile (name, password, email, picture) VALUES (?, ?, ?, ?)",
          [userData.username, userData.password, userData.email, ""],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(true); // Usuario guardado correctamente
            } else {
              resolve(false); // No se guardó el usuario
            }
          },
          (_, err) => {
            console.error("Error al ejecutar la consulta SQL en addUserToSqlite:", err);
            reject(err);
          }
        );
      },
      reject,
      resolve
    );
  });
};

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM userprofile",
          [],
          (_, result) => {
            const users = result.rows._array;
            resolve(users);
          },
          (_, err) => {
            console.error("Error al ejecutar la consulta SQL en getAllUsers:", err);
            reject(err);
          }
        );
      },
      reject,
      resolve
    ); // Catch handler and success handler are swapped for proper error handling
  });
};

export const checkUserSqlite = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM userprofile",
          [],
          (_, result) => {
            const user = result.rows._array;
            if (user.length > 0) {
              const userJSON = JSON.stringify(user);
              resolve(userJSON);
            } else {
              resolve("[]");
            }
          },
          (_, err) => {
            console.error("Error al ejecutar la consulta SQL en checkUserSqlite:", err);
            reject(err);
          }
        );
      },
      reject,
      resolve
    ); // Catch handler and success handler are swapped for proper error handling
  });
};
