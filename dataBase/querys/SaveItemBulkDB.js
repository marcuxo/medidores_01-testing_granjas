import React from 'react'
import charkyDB from '../../FontDB';
import OpenconectionItems from '../connect/OpenconectionItems';

const db2 = OpenconectionItems()

export const SaveItemBulkDB = ({ModifiData, setModifiData}) => {
  // console.log('LoadBulkToApp')
  db2.transaction((tx) => {
    tx.executeSql("select * from items", [], function(tx, res){
        isLoadData(res.rows._array)
      }
    );
  });

  async function isLoadData(data){
    
    if(data.length){
      try {

        const query = await fetch(url+'/getnameitems',{
          method: 'GET',
          headers: {
            'authorization': "paico 2021",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        const resp = await query.json();
        // console.log(resp.data.body[0],data[0])
        
        for (let itr = 0; itr < resp.data.body.length; itr++) {
          const element = resp.data.body[itr];
          // console.log(element)
          db2.transaction(
            (tx) => {
              tx.executeSql(`update items set v_ant = ?, fecha_ant = ? where item = ?;`, [
                element.v_ant,element.fecha_ant,element.item
              ]);
            },
            null,
          )
        }
        setModifiData(ModifiData+1)

      } catch (error) {
        console.log('catch has ok',error)
      }
    }
    else{
     
      for (let vvr = 0; vvr < charkyDB.length; vvr++) {
        const itm = charkyDB[vvr];
        // console.log(itm)
        const keysList = Object.values(itm)
        // console.log(keysList)
        db2.transaction(
          (tx) => {
            tx.executeSql(`insert into items (item,v_ant,done,fecha_ant) values ('${keysList[0]}',${keysList[1]},0,'${keysList[2]}')`);
          },
          null,
        )
      }
      setModifiData(ModifiData+1)
      
    }
   
    return
  }
  
}



// const query = await fetch(url+'/getnameitems',{
//   method: 'POST',
//   headers: {
//     'authorization': "paico 2021",
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     user: 'marcuxo',
//     data: resp
//   })
// })