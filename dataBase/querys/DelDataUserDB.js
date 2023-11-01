import React from 'react'
import OpenconectionUser from '../connect/OpenconectionUser';
const db = OpenconectionUser();

export default function DelDataUserDB() {
  db.transaction(
    (tx) => {
      tx.executeSql(`DROP TABLE user`);
      tx.executeSql(
        "create table if not exists user (id integer primary key not null, namececo text, ceco text, fecha_log text, fecha_exp text, nombre text, empresa text, correo text, password text, fecha text, state int);"
      );
    },
    null,
  )
}
