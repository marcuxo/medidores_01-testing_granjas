import React, { useCallback, useEffect, useState } from 'react'
import {  RefreshControl } from 'react-native';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native'
import { ScrollView } from 'react-native';
import { View } from 'react-native'
import { Button } from 'react-native-paper';
import DelDataItemsDB from '../../dataBase/querys/DelDataItemsDB';
import GetDataStartUserDb from '../../dataBase/querys/GetDataStartUserDb';
import ObteainDataItemsFrom from '../../dataBase/querys/ObteainDataItemsFrom';
import NetInfo from '@react-native-community/netinfo';
import SaveNewValueMed from '../../components/SaveNewValueMed';
import SaveDataMedidor_OnSRV from '../../api/SaveDataMedidor_OnSRV';
// icons
import { Foundation } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//timer to refresh app
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({ route, navigation }) {
  const {empresa, namececo ,ceco} = route.params;
  console.log("=>>>>",empresa, namececo ,ceco);

  const [DataUserStart, setDataUserStart] = useState('');
  const [IsCompleteALL, setIsCompleteALL] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [DataMedidor, setDataMedidor] = useState([]);
  const [DatdaMedDateNow, setDatdaMedDateNow] = useState('0000-00-00');
  const [IsConnet, setIsConnet] = useState(false);
  const [ModifiData, setModifiData] = useState(0);


  // modulo que recarga pa pagina al haces swip down
  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    // console.log('data==>>>', empresa)
    GetDataFromSrvMedidors();
    
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const VerifiIsAll = async () => {
    let acum = 0;
    DataMedidor.map(itmds => {
      acum = acum + itmds.done
    })
    if(DataMedidor.length === acum){
      setIsCompleteALL(false);
    }else{
      setIsCompleteALL(true);
    }
    // console.log( 'Cantidad ded datos en BD local',DataMedidor.length,' v/s ',acum)
  }

  setInterval(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnet(state.isConnected);
      // console.log(state.type,state.isConnected)
    })
    unsubscribe()
  }, 10000);

  const GetDataFromSrvMedidors = async () => {
    let data = await ObteainDataItemsFrom({EMPRESA:empresa, CECO:ceco})
    // console.log('data==||>>>',data.length)
    if(data.length == 0){
      // Alert.alert('Medidores','No se encontraron medidores vuelva a recargar 🙄')
      GetDataFromSrvMedidors()
    }else{
      await setDataMedidor(data)
    }
    // let medidores = await GetMedidorsOnSRV({EMPRESA:empresa})
    // console.log(medidores)
  }

  const dropDataBase = async () => {
    await DelDataItemsDB()
    await setDataMedidor([])
    Alert.alert("Meidores","Los datos Fueron Borrados")
  }

  const HandleSaveData = async () => {
    let resp = await SaveDataMedidor_OnSRV({DataMedidor,USER: DataUserStart?.nombre, EMPRESA: empresa, CECO:ceco})
    if(resp.OK){
      Alert.alert('Medidores',resp.MSG)
      // eliminar los medidores y recargar los nuevos
      await DelDataItemsDB()//elimina los medidores de la base de datos local****
      // await GetDataFromSrvMedidors();// recarga los medidores actualizados desde la base de datos remota(SRV)
      await setDataMedidor([])
    }else{
      Alert.alert('Medidores',resp.MSG)
      await DelDataItemsDB()//***
      await setDataMedidor([])
    }
  }

  // useEffect(() => {
  //   GetDataStartUserDb({setDataUserStart});
  //   GetDataFromSrvMedidors();
  // }, [])

  useEffect(() => {
    // const cargadatos = async () => {
      GetDataStartUserDb({setDataUserStart});
      GetDataFromSrvMedidors();
      // console.log('se modifico el dato del dato con el numero')
    // }
    // cargadatos()
  }, [ModifiData])

  useEffect(() => {
    const toDay = new Date();
    let nowReal = toDay.toLocaleString("es-CL", {timeZone: "America/Santiago"})
    let a = nowReal.split(" ")[0].split("-")
    let fecha_now = a[2]+"-"+a[1]+"-"+a[0]
    setDatdaMedDateNow(fecha_now)
  }, [])

  useEffect(() => {
    VerifiIsAll()
    console.log("datamedidor",DataMedidor);
  }, [DataMedidor]) 
  
  // useEffect(() => {
  //   console.log('useefect=>',DataUserStart.ceco)
  //   GetDataFromSrvMedidors();
  // }, [DataUserStart])
  

  return (
    <View style={{flex:1,paddingTop:29}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <View style={styles.container_user}>
        <Text>User: {DataUserStart?.nombre}</Text>
        <Text>Empresa: {empresa}</Text>
        <Text>Granja: {DataUserStart?.namececo}</Text>
        {/* <Text>Sector: {DataUserStart?.ceco}</Text> */}
        
      </View>
      <View style={styles.container_body_med}>
        {
          DataMedidor.length===0?
          <View style={{alignItems: 'center', paddingVertical: 70}}>
            <Text style={{color: '#C8C8C8'}}>Deslice Hacia abajo para recargar la aplicacion.</Text>
            <Text><MaterialCommunityIcons name="gesture-swipe-down" size={60} color="#C8C8C8" /></Text>
          </View>
          :
          DataMedidor.map(itm=>

            <SaveNewValueMed
              key={itm.id}
              itm={itm}
              DatdaMedDateNow={DatdaMedDateNow}
              empresa={empresa}
              ModifiData={ModifiData}
              setModifiData={setModifiData}
            />
          
          )
        }
      </View>
        <View style={styles.container_body}>
          <Text></Text>
          <TouchableOpacity
            onPress={()=>HandleSaveData()}
            disabled={IsCompleteALL||!IsConnet?true:false}
          >
            <Button
              mode='contained'
              icon='content-save'
              disabled={IsCompleteALL||!IsConnet?true:false}
              buttonColor={'#51F909'}
            >
              <Text style={{color: '#1434A7'}}>
                Cargar Datos  <Foundation name="mobile-signal" size={24} color={IsConnet?'green':'red'} />
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
        <View style={styles.container_body}>
        <Text></Text>
          <TouchableOpacity
            onPress={()=>dropDataBase()}
          >
            <Button
              mode='contained'
              icon='trash-can-outline'
              buttonColor={'#FF0000'}
            >
              <Text style={{color: '#FFFFFF'}}>
                Borrar Datos!!
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  container_user: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10
  },
  container_card: {
    // flex: 1,
    // alignItems: 'center',
    // paddingVertical: 10
    borderWidth: 2,
    marginBottom: 3,
    borderRadius: 5,
    paddingHorizontal:5,
    backgroundColor: '#E5E5E5',
    borderColor: '#CACACA'
  },
  container_body: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    color: 'white'
  },
  container_body_med: {
    flex: 1,
    // alignItems: 'center',
    paddingVertical: 10
  },
  titlemed: {
    fontSize: 30,
    fontWeight: '600',
  },
  carditem:{
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 5,
  },
  cartitle:{
    fontWeight: '800',
    color: '#fff'
  },
  cardvalues:{
    color: '#fff'
  },
  screen: {
    paddingVertical: 15,
    paddingHorizontal: 5
  },
  header: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA2722',//dfdfdf
    height: 25,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  themeSucces: {backgroundColor:"#239B56", padding: 5, borderRadius:5},
  themeWrong: {backgroundColor:"#E74C3C", padding: 5, borderRadius:5}
})
