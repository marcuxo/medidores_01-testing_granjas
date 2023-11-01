import React from 'react'
import GetMedidorsOnSRV from '../../api/GetMedidorsOnSRV';
import OpenconectionItems from '../connect/OpenconectionItems';

const db =  OpenconectionItems()

export default function ObteainDataItemsFrom({EMPRESA, CECO}) {
  return new Promise(async (resolve, reject) => {
    const GetDataItemsNow = async (data) => {
      // console.log('|-|',data.rows._array.length)
      if(data.rows._array.length === 0){
        // console.log('|||',itms_medidorSRV)
        // {"EMPRESA": "AGROINDUSTRIAL EL PAICO S.A.", "FECHA_SHORT": "2023-05-27", "NOMBRE": "camara_contacto", "SORT_LIST": 1002, "SORT_RUTE": 101, "VALOR": 8695671}
        let itms_medidorSRV = await GetMedidorsOnSRV({EMPRESA, CECO});
        for (let ihvf = 0; ihvf < itms_medidorSRV.length; ihvf++) {
          const ihvf_ = itms_medidorSRV[ihvf];
          // console.log('--->',ihvf_.EMPRESA,ihvf_.FECHA_SHORT,ihvf_.NOMBRE,ihvf_.VALOR)
          await db.transaction(
            (tx) => {
              tx.executeSql(`insert into items (ceco, item,v_ant,done,fecha_ant,empresa,sort_list) values ('${CECO}','${ihvf_.NOMBRE}',${ihvf_.VALOR},0,'${ihvf_.FECHA_SHORT}','${ihvf_.EMPRESA}','${ihvf_.SORT_LIST}')`);
            },
            null,
          )
        }
        resolve([])
      }else{
        // console.log('base de datos con datos')
        resolve(data.rows._array)
        // for (let antfc = 0; antfc < data.rows._array.length; antfc++) {
        //   const antfc_ = data.rows._array[antfc];
        //   // console.log(antfc_.done)
        //   // console.log(antfc_.empresa)
        //   // console.log(antfc_.fecha_ant)
        //   // console.log(antfc_.fecha_new)
        //   // console.log(antfc_.id)
        //   // console.log(antfc_.item)
        //   // console.log(antfc_.v_ant)
        //   // console.log(antfc_.v_new)
        // }
      }
    }

    db.transaction((tx) => {
      tx.executeSql("select * from items", [], (tx, res) => GetDataItemsNow(res)
      );
    });
  })
}
