import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';

import { Register } from '../../actions';

import axios from 'axios';

import { addToken } from '../../actions';

import { Ionicons } from '@expo/vector-icons';


const Registration = (props) =>{

  const dispatch = useDispatch()

  
  const loading = useSelector(state => state.token.isLoading)
  const user = useSelector(state => state.token.user)

  useEffect(() => {
    if(user != ""){
      dispatch(addToken({email : emailVal, password : passwordVal}))
      props.navigation.navigate('Login')
    }
    // console.log(user)
  }, [user])


  const [usernameVal, setUsernameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [passwordConVal, setPasswordConVal] = useState('')

  const registerAttempt = () => {

    console.log('username:',usernameVal)
    console.log('email:',emailVal)
    console.log('password:',passwordVal)
    console.log('password con:',passwordConVal)

    if(usernameVal != '' && emailVal != '' && passwordVal != '' && passwordConVal !='' && passwordVal.length>5){
      if(passwordVal == passwordConVal){
        dispatch(Register({name: usernameVal, email : emailVal, password : passwordVal, password_confirmation : passwordConVal}))
      } else {
        alert('Password confirmation is different from entered password')
      }
    } else {
      alert('One or more fields is empty or entered incorrectly!')
    }



  }

    return(
        <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={{flexDirection:'row', alignItems:'center',marginBottom:10}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name='arrow-back' size={30}  />
            </TouchableOpacity>
            <Text style={{ fontSize: 36, marginLeft:40 }}>Registration</Text>
          </View>
        </View>
        <View style={{alignItems:'center',justifyContent:'space-evenly'}}>
            <View style={styles.inputTab}>
                <Text style={{width:'66%'}}>Username : </Text>
                <TextInput placeholder='Username' onChangeText={(value) => setUsernameVal(value)} style={styles.input}></TextInput>
            </View>
            <View style={styles.inputTab}>
                <Text style={{width:'66%'}}>Email : </Text>
                <TextInput placeholder='Email' keyboardType={'email-address'} onChangeText={(value) => setEmailVal(value)} style={styles.input}></TextInput>            
            </View>
            <View style={styles.inputTab}>
                <Text style={{width:'66%'}}>Password (min. 6 characters): </Text>
                <TextInput placeholder='Password' onChangeText={(value) => setPasswordVal(value)} style={styles.input}></TextInput>
            </View>
            <View style={styles.inputTab}>
                <Text style={{width:'66%'}}>Password Confirmation : </Text>
                <TextInput placeholder='Password confirmation' onChangeText={(value) => setPasswordConVal(value)} style={styles.input}></TextInput>
            </View>
          
          {loading == true 
          ? <TouchableOpacity style={styles.button}>
              <Text style={{fontSize:18}} >...</Text>
            </TouchableOpacity>
          : <TouchableOpacity style={styles.button} onPress={() => registerAttempt()}>
              <Text style={{fontSize:18}} >Register</Text>
            </TouchableOpacity>
          }
          {/* <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('TabNav')}>
            <Text style={{fontSize:18}} >Enter</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity >
            <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>New user? Create a new account here.</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    )
}

export default Registration

const styles = {
    main:{
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    },
    inputTab:{
        width:'100%',
        alignItems:'center',
        marginTop:25
    },
    container:{
      backgroundColor:'#FFD700',
      height:'15%',
      width:'100%',
      borderBottomRightRadius:50,
      borderBottomLeftRadius:50,
      paddingLeft:40,
      justifyContent:'flex-end',
    //   alignItems:'center'
    },
    input:{
      padding:5,
      marginTop:5,
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
    //   width:'20%',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#FFD700',
      borderRadius:15
    }
  }