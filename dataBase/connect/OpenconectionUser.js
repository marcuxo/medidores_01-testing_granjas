import React from 'react'
import * as SQLite from 'expo-sqlite'

export default function OpenconectionUser() {
  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }

    const db = SQLite.openDatabase("user_arta.db");

    function writenn(){
      db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists user (id integer primary key not null, namececo text, ceco text, fecha_log text, fecha_exp text, nombre text, empresa text, correo text, password text, fecha text, state int);"
        );
      });
    }
    writenn()
    
    return db;
  }
  
  return openDatabase()
}
