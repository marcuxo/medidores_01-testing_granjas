import { URL_SRV } from '../url/Url';

export default function SaveDataMedidor_OnSRV({DataMedidor, USER, EMPRESA, CECO}) {
  return new Promise(async (resolve, reject) => {
    let query = await fetch(URL_SRV+'savedata_medidor_srv',{
      method: 'POST',
      headers: {
        'authorization': "paico2021",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        MEDIDORES: DataMedidor,
        USER,
        EMPRESA,
        CECO
      })
    })
    let responsito = await query.json();

    if(responsito.data.success){
      resolve({MSG:responsito.data.body, OK:true})
    }else{
      resolve({MSG:responsito.data.body, OK:false})
    }
  })
}
