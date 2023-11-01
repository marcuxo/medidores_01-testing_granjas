import React, { useEffect, useState } from 'react'
import { FormatNumeral } from './FormatNumbers'
import { View,Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import UpdateNewValorMedidor from '../dataBase/querys/UpdateNewValorMedidor';
import { Button, TextInput } from 'react-native-paper';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SaveNewValueMed({itm,DatdaMedDateNow, empresa, ModifiData, setModifiData}) {
  // console.log('datos modificadisimos modal',ModifiData)

  const [modalVisible, setModalVisible] = useState(false);
  const [valorMedidor, setvalorMedidor] = useState(null);
  const [isEmptyInp, setIsEmptyInp] = useState(true);
  const [ModifiData_, setModifiData_] = useState(0);

  const SaveValorMedidor = async (iData) => {
    // setCountDone(CountDone + 1)
    // Alert.alert('Alerta Medidor!!',`Valor Guardado!!`)
    // setModifiData(ModifiData+1)
    console.log("idata",iData);

    const toDay = new Date();
    let nowReal = toDay.toLocaleString("es-CL", {timeZone: "America/Santiago"})
    let a = nowReal.split(" ")
    // 1970-01-01T00:00:00.300+00:00
    let fecha_now = `${DatdaMedDateNow}T${a[1]}`
    console.log("hora actual: ", fecha_now)

    await UpdateNewValorMedidor({iData, valorMedidor, empresa, fecha_now, ModifiData_, setModifiData_});//crear metodo
    setModalVisible(false);
  }

  const HandleModalValue = async (text) => {
    let regIs = /^[0-9]+$/; //validacion regex de solo numeros
    if(regIs.test(text)){
      if(text.length>0)setIsEmptyInp(false)
      else setIsEmptyInp(true)
    }else setIsEmptyInp(true)
    
    setvalorMedidor(text)
  }

  useEffect(() => {
    setModifiData(ModifiData+1)
  }, [ModifiData_])
  

  return (
    <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
       <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("La Ventana se cerro!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>{empresa}</Text>
          <SimpleLineIcons name="speedometer" size={45} color="black" />
            <Text style={{ fontSize: 20 }}>{itm.item}</Text>
            <Text style={{ fontSize: 15, color: 'gray' }}>{itm.fecha_ant} - {FormatNumeral(itm.v_ant)}</Text>
            <Text style={{ fontSize: 15, color: 'fuchsia' }}></Text>
            <View style={styles.inner}>
              <TextInput
                dense={true}
                left={<TextInput.Icon icon='speedometer' />}
                mode='outlined'
                label={"Valor Medidor"}
                style={styles.valorum}
                textContentType='none'
                keyboardType='phone-pad'
                value={valorMedidor}
                onChangeText={(text)=>HandleModalValue(text)}
              />
            </View>
            <Text></Text>
            <View style={styles.btninlie}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Button
                  style={styles.btnInner}
                  buttonColor='orange'
                  mode='contained'>
                  <Text>Cancelar</Text>
                </Button>
              </TouchableOpacity>
                <Button
                  onPress={() => SaveValorMedidor(itm)}
                  style={styles.btnInner}
                  disabled={isEmptyInp}
                  buttonColor='green'
                  mode='contained'
                >
                  <Text>Guardar</Text>
                </Button>
            </View>
        </View>
      </Modal>
      <View key={itm.id} style={itm.done===0?styles.container_card_nodata:styles.container_card_success}>
        <Text style={itm.done===0?styles.title_card_nodata:styles.title_card_success}>
          {itm.id}.- {itm.item} <AntDesign name="dashboard" color={"white"} />
          {
            itm.done===1?<Text style={{marginLeft: 20}}>     Consumo:{FormatNumeral(itm.v_new-itm.v_ant)}</Text>:null
          }
        </Text>
        <Text style={itm.done===0?styles.paraf_card_nodata:styles.paraf_card_success}>
          {itm.fecha_ant}<MaterialIcons name="double-arrow" color={"white"} />{FormatNumeral(itm.v_ant)}
          <Text>  <FontAwesome5 name="equals" color={"white"}/>  </Text>
          {DatdaMedDateNow}<MaterialIcons name="double-arrow" color={"white"} />{itm.v_new===null?0:FormatNumeral(itm.v_new)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container_card_success: {
    marginBottom: 3,
    borderRadius: 5,
    padding:5,
    // backgroundColor: '#FB4038',//nodata
    backgroundColor: '#4AA02D',//success
    borderColor: '#CACACA',
    color: 'white'
  },
  container_card_nodata: {
    marginBottom: 3,
    borderRadius: 5,
    padding:5,
    backgroundColor: '#FB4038',//nodata
    // backgroundColor: '#5FCF3A',//success
    borderColor: '#CACACA',
    color: 'white'
  },
  title_card_success: {
    fontWeight: '700',
    fontSize:15,
    color: 'white'
  },
  paraf_card_success: {
    color: 'white'
  },
  title_card_nodata: {
    fontWeight: '700',
    color: 'white',
    fontSize:15
  },
  paraf_card_nodata: {
    color: 'white'
  },
  text_white: {
    color: '#ffffff'
  },
  btninlie: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnInner: {
    marginHorizontal: 15,
  },
  valorum: {
    width: '90%',
    marginVertical: 5
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  }
})
