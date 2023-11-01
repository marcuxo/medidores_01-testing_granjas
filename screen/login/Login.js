import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native'
import { Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import GetDataStartUserDb from '../../dataBase/querys/GetDataStartUserDb';
import SaveLoginUser from '../../dataBase/querys/SaveLoginUser';
import DelDataUserDB from '../../dataBase/querys/DelDataUserDB';
import { Alert } from 'react-native';
import { VERSION } from '../../url/Url';

export default function Login({ navigation }) {

  const [DataUserStart, setDataUserStart] = useState('')
  const [LoginData, setLoginData] = useState({
    user: '',
    pass: ''
  })
  const [isLoading, setIsLoading] = useState(false);

  const logate = async () => {
    SaveLoginUser({LoginData, setIsLoading, navigation});
    setIsLoading(true)
    // console.log(LoginData)
  }

  const HandleImnot = () => {
    DelDataUserDB();
    setDataUserStart('');
    setLoginData({
      user: '',
      pass: '',
      empresa: ''
    })
    Alert.alert('MEDIDORES','Completa el usuario y clave!!')
  }

  // borrar funcion temporal
  const BorrarUsers = async () => {
    await DelDataUserDB();
  }

  useEffect(() => {
    GetDataStartUserDb({setDataUserStart})
  }, [])

  useEffect(() => {
    // console.log(DataUserStart)
    setLoginData({'user': DataUserStart.correo || '','pass': DataUserStart.password, 'empresa': DataUserStart.empresa || ''})//inicia el login con las credenciales guardadas
  }, [DataUserStart])

  return (
    // <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/splash-ariztia.png')}
          style={styles.container}
        >
          <View style={styles.inner}>
            <Text>INICIO SESION</Text>
            <Text>GRANJAS ARIZTIA</Text>
            <Text></Text>
            <View style={styles.valorumain}>
              <TextInput
                dense={true}
                left={<TextInput.Icon icon='account-circle' />}
                mode='flat'
                label={"Usuario"}
                style={styles.valorum}
                // keyboardType='email-address'
                value={LoginData.user}
                onChangeText={(event)=>setLoginData({...LoginData, ['user']: event})}
              />
            </View>
            <View style={styles.valorumain}>
              <TextInput
                dense={true}
                left={<TextInput.Icon icon='account-lock' />}
                mode='flat'
                label={"Clave"}
                style={styles.valorum}
                textContentType='password'
                secureTextEntry={true}
                keyboardType='default'
                value={LoginData.pass}
                onChangeText={(event)=>setLoginData({...LoginData, ['pass']: event})}
              />
            </View>
            <View style={styles.valorumain}>
              <TouchableOpacity
                onPress={()=>logate()}
                disabled={isLoading}
              >
                <Button
                  mode='contained'
                  icon='account-lock-open'
                  buttonColor={isLoading?'#6268FF':'#181C7C'}
                >
                  {isLoading?
                    <Text style={{color: '#FFFFFF'}}>Cargando ... </Text>
                    :<Text style={{color: '#ECECEC'}}>Entrar</Text>
                  }
                </Button>
              </TouchableOpacity>
              
            </View>
          {
            DataUserStart?
            <View style={styles.valorumainerase}>
              <TouchableOpacity onPress={()=>HandleImnot()}>
                <Text style={{color: 'gray'}}>No eres {DataUserStart.nombre} de {DataUserStart.empresa} <Entypo name="emoji-sad" size={15} color="gray" /></Text>
              </TouchableOpacity>
            </View>:null
          }
          </View>
          <View>
            <Text style={styles.floatRight}>{VERSION}</Text>
          </View>

          {/* <View style={styles.valorumain}>
            <TouchableOpacity
              onPress={()=>BorrarUsers()}
            >
              <Button
                mode='contained'
                icon='account-lock-open'
                buttonColor={'#181C7C'}
              >
                <Text style={{color: '#ECECEC'}}>Eliminar Usuario</Text>
              </Button>
            </TouchableOpacity>
            
          </View> */}
        </ImageBackground>
      </View>
    // </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignSelf: 'center'
  },
  inner: {
    backgroundColor: 'rgba(255,255,255,.3)',
    alignItems: 'center',
    paddingVertical: 25
  },
  valorum: {
    width: '80%',
    marginVertical: 5
  },
  valorumain: {
    width: '90%',
    alignItems:'center',
    marginVertical: 5,
    paddingVertical: 5
  },
  valorumainerase: {
    width: '90%',
    alignItems:'flex-end',
    paddingTop:30,
    marginVertical: 5,
    paddingVertical: 5
  },
  floatRight: {
    textAlign: 'right',
    fontStyle: 'italic',
    color: '#C8C8C8',
    fontWeight: '600',
    paddingRight:10,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 5
  }

});
