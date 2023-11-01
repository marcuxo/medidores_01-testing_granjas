import OpenconectionItems from "../connect/OpenconectionItems"

const db = OpenconectionItems()

export default function UpdateNewValorMedidor({iData, valorMedidor, empresa, fecha_now, ModifiData_, setModifiData_}) {
  
    console.log("data save",iData['id'], iData['v_ant'], valorMedidor, empresa, fecha_now)

    db.transaction(
      (tx) => {
        tx.executeSql(`update items set done = 1, v_new = ?, fecha_new = ? where id = ?;`, [
          valorMedidor,fecha_now,iData.id
        ]);
      }, null,setModifiData_(ModifiData_+1)
    )

    return
    
}

