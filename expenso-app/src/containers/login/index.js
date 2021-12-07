import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { addToken } from '../../actions';



const Login = (props) =>{

  const dispatch = useDispatch()

  const token = useSelector(state => state.token.token)
  const loading = useSelector(state => state.token.isLoading)

  useEffect(() => {

    if(token != ''){
      props.navigation.navigate('TabNav')
    }
    // console.log(token)
  }, [token])

  useEffect(()=>{
    console.log(emailVal)
  })

  // const user = useSelector(state => state.token.user)

  // useEffect(() => {
  //   if(user != ''){
  //     props.navigation.navigate('Login')
  //   }
  //   console.log(user)
  // }, [user])

  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')

  const loginAttempt = () => {
    console.log('email:',emailVal)
    console.log('password:',passwordVal)

    dispatch(addToken({email : emailVal, password : passwordVal}))

  }

    return(
        <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <Text style={{paddingBottom:50,fontSize:50,fontFamily:'',fontWeight:'bold'}}>Expenso</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'space-evenly'}}>


          <TextInput placeholder='Email' onChangeText={(value) => setEmailVal(value)} style={styles.input}></TextInput>
          <TextInput placeholder='Password' onChangeText={(value) => setPasswordVal(value)} style={styles.input}></TextInput>
          {loading == true 
          ? <TouchableOpacity style={styles.button}>
              <Text style={{fontSize:18}} >...</Text>
            </TouchableOpacity>
          : <TouchableOpacity style={styles.button} onPress={() => loginAttempt()}>
              <Text style={{fontSize:18}} >Login</Text>
            </TouchableOpacity>
          }
          
          
          {/* <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('TabNav')}>
            <Text style={{fontSize:18}} >Enter</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => props.navigation.navigate('Registration')}>
            <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>New user? Create a new account here.</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}

export default Login

const styles = {
    main:{
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    },
    container:{
      backgroundColor:'#FFD700',
      height:'50%',
      width:'100%',
      borderBottomRightRadius:50,
      borderBottomLeftRadius:50,
      justifyContent:'flex-end',
      alignItems:'center'
    },
    input:{
      padding:5,
      marginTop:30,
      width:'66%',
      borderWidth:2,
      borderStyle:'solid',
      borderColor:'gray',
      borderRadius:20
    },
    button:{
      padding:10,
      marginBottom:15,
      marginTop:30,
      width:'20%',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#FFD700',
      borderRadius:15
    }
  }