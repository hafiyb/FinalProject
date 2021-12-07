import React, {useState} from "react";

import { SafeAreaView, Text, View, TouchableOpacity, Button, FlatList, Modal, Pressable, Alert, StyleSheet, TextInput } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';


const incomeModal = () =>{


    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {setModalVisible(true)}, [])

    

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Salary', value: 'Salary'},
      {label: 'Side-job', value: 'Side-job'},
      {label: 'Sales', value: 'Sales'},
      {label: 'Misc.', value: 'Misc.'},
    ]);

<Modal
animationType="slide"
transparent={true}
visible={modalVisible}
onRequestClose={() => {
  Alert.alert("Modal has been closed.");
  setModalVisible(!modalVisible);
}}
>

<View style={modal.centeredView}>
  
  <View style={modal.modalView}>
  <TouchableOpacity>
    <Ionicons name='arrow-back' size={20}  />
  </TouchableOpacity>
    <Text style={modal.modalText}>Type</Text>
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
    <Text style={modal.modalText}>Value</Text>
    <TextInput placeholder="Value" />
    <Text style={modal.modalText}>Date</Text>
    <TextInput placeholder="Date" />
    {/* <Text style={modal.modalText}>Hello World!</Text> */}
    <Pressable
      style={[modal.button, modal.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}
    >
      <Text style={modal.textStyle}>Create entry!</Text>
    </Pressable>
  </View>
</View>
</Modal>
}

export default incomeModal


const modal = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });