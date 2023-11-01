import React from 'react'
import { URL_SRV } from '../url/Url';
import { Alert } from 'react-native';

export default function GetMedidorsOnSRV({EMPRESA, CECO}) {
  console.log(EMPRESA, CECO);
  return new Promise(async (resolve, reject) => {
    let query = await fetch(URL_SRV+'getlismedidores',{
      method: 'POST',
      headers: {
        'authorization': "paico2021",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        EMPRESA,CECO
      })
    })
    let responsito = await query.json();
    console.log("ITEMS",responsito.data.body)
    if(responsito.data.success){
      resolve(responsito.data.body)
    }else{
      Alert.alert('Medidores',responsito.data.msg)
      return
      // resolve(responsito.data.body)
    }
  })
}
