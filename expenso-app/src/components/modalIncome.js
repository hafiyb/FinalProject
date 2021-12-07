import React, { useEffect, useState } from "react";

import {View, Text, Button, TouchableOpacity, TextInput, Switch} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import DropDownPicker from "react-native-dropdown-picker";

// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from "react-redux";
import { addIncome, getIncome } from "../actions";


function incomeModal({ navigation }) {

  // const [date, setDate] = useState(new Date())

  const token = useSelector(state => state.token.token)

  const id = useSelector(state => state.token.id)

  const isLoading = useSelector(state => state.income.isLoading)

  const dispatch = useDispatch()

const submitForm = () =>{

  console.log(date.toISOString().split('T')[0])
  var newDate = date.toISOString().split('T')[0]
  dispatch(addIncome(token, id, value, inputValue, newDate))

  setTimeout(() => {
    dispatch(getIncome(token, id))
    navigation.goBack()
  }, 1000)


}



  const [inputValue, setInputValue] = useState(0)



  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }


  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Salary', value: 'Salary'},
    {label: 'Side-job', value: 'Side-job'},
    {label: 'Sales', value: 'Sales'},
    {label: 'Misc.', value: 'Misc.'},
  ]);

  // console.log(date)


  return (
    <View style={styles.outside}>
      <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back' size={30}  />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, marginLeft:40 }}>New income entry</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Type: </Text>
          <DropDownPicker style={{elevation:10}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Value: </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{padding:5, fontSize: 20}}>RM: </Text>
          <TextInput maxLength={9} keyboardType={"number-pad"} style={styles.inputBox} placeholder="0000.00"  onChangeText={(input) => setInputValue(input)} />
          </View>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Date: </Text>
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#f0f0f0" }}
              thumbColor={isEnabled ? "#ffd700" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.inputLabel}>Use current date?</Text>

          </View>

          {isEnabled 
          ?
          <View>
            {date.toDateString() != new Date().toDateString()
            ? setDate(new Date())
            : null}
          <View>
            <View onPress={showDatepicker} style={styles.dateBox}>
              <Text style={{color:'#a0a0a0'}}>{new Date(date).toDateString()}</Text> 
            </View>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              // is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          </View>
          : 
          <View>
          <View>
            <TouchableOpacity onPress={showDatepicker} style={styles.dateBox}>
              <Text>{new Date(date).toDateString()}</Text>
              <Text style={{color:'#a0a0a0'}}>Change</Text>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              // is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          </View>
          }
          
        </View>

      <View>

      {isLoading
      ?
      <View style={styles.button}>
        <Text>...</Text>
      </View>
      : value != null && inputValue != 0 
      ? inputValue <1000000
      ?
      <TouchableOpacity style={styles.button} onPress={() => submitForm()}>
        <Text>Submit entry</Text>
      </TouchableOpacity>
      : 
      <TouchableOpacity style={styles.button} onPress={()=>alert('Value too large!')}>
        <Text>Submit entry</Text>
      </TouchableOpacity>
      : 
      <TouchableOpacity style={styles.button} onPress={()=>alert('Form incomplete!')}>
        <Text>Submit entry</Text>
      </TouchableOpacity>

      }

      </View>
      {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
        
      </View>
    </View>
  );
}

export default incomeModal

const styles = {
  outside:{
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.1)',
    filter: 'blur(30px)',
    padding:20
  },
  container:{
    backgroundColor:'white',
    width:'100%',
    // height:'100%',
    padding:35,
    borderRadius:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputView:{
    width:'90%',
    margin:10, 
    // backgroundColor:'gray'
  },
  inputLabel:{
    marginBottom:5,
    marginLeft:20
  },
  inputBox:{
    borderBottomWidth:2,
    fontSize:20,
    width:'50%',
    
  },
  button:{
    padding:20,
    marginBottom:15,
    marginTop:30,
    width:'40%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FFD700',
    borderRadius:15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems:'center'
    // marginBottom: 20,
  },
  dateBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:8,
    borderWidth:1,
    borderRadius:10
  }
}