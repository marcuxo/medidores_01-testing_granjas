import React from 'react'
import OpenconectionUser from '../connect/OpenconectionUser';

const db = OpenconectionUser()

export default function GetDataStartUserDb({setDataUserStart}) {
  // console.log('consulta inicial a base de datos')
  db.transaction((tx) => {
    tx.executeSql("select * from user", [], function(tx, res){
      console.log("respDB//=>",res.rows._array)
        if(res.rows._array.length){
          setDataUserStart({
            correo: res.rows._array[0].correo,
            nombre: res.rows._array[0].nombre,
            empresa: res.rows._array[0].empresa,
            password: res.rows._array[0].password, //borrar en produccion
            ceco: res.rows._array[0].ceco,
            namececo: res.rows._array[0].namececo,
          });
        }else{
          return
        }
      }
    );
  });
}
