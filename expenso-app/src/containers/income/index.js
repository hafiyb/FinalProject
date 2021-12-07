import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Button, FlatList, Modal, Pressable, Alert, StyleSheet, TextInput } from 'react-native'
import EntryTab from "../../components/entrytab";
import { useDispatch, useSelector } from "react-redux";
import { getIncome, removeIncome } from "../../actions";
import { SwipeListView } from "react-native-swipe-list-view";


import DropDownPicker from 'react-native-dropdown-picker';

import { Ionicons } from '@expo/vector-icons';

import incomeModal from "../../components/incomeModal";



const Income = (props) =>{


  const token = useSelector(state => state.token.token)

  const [modalVisible, setModalVisible] = useState(false);

  const isLoading = useSelector(state => state.income.isLoading)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Salary', value: 'Salary'},
    {label: 'Side-job', value: 'Side-job'},
    {label: 'Sales', value: 'Sales'},
    {label: 'Misc.', value: 'Misc.'},
  ]);

  const id = useSelector(state => state.token.id)



  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getIncome(token, id))
  },[])

  // useEffect(()=>)

  const deleteEntry = (idEntry) => {

    dispatch(removeIncome(token, idEntry))

    setTimeout(() => {
      dispatch(getIncome(token, id))
      
    },300)
  
  }

  const incomes = useSelector(state => state.income.incomes)

  // console.log(incomes)

    return(
      <SafeAreaView style={styles.main}>



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
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name='arrow-back' size={30}  />
              </TouchableOpacity>
              <Text style={{fontWeight:'bold', fontSize:20}}>Add new Income entry</Text>
            </View>
            <Text style={modal.modalText}>Type</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            <View style={{flexDirection:'row'}}> 
            <View style={modal.inputTab}>
            <Text style={modal.modalText}>Value</Text>
            <TextInput style={modal.modalTextInput} placeholder="Value" />

            </View>
            <View style={modal.inputTab}>
            <Text style={modal.modalText}>Date</Text>
            <TextInput style={modal.modalTextInput}  placeholder="Date" />

            </View>

            </View>
            <Text style={modal.modalText}>Hello World!</Text>
            <Pressable
              style={[modal.button, modal.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={modal.textStyle}>Create entry!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


            <View style={styles.container}>
                <Text style={{margin:50, fontSize:30,height:40, fontWeight:'bold'}}>Incomes</Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.text}>Type</Text>
              <Text style={styles.text}>Date</Text>
              <Text style={styles.text}>Value (RM)</Text> 
            </View>
            {/* <SwipeListView
            data={incomes}
            renderItem={(data,rowMap) => (
              <EntryTab 
              status={data.item.status} type={data.item.type}  value={data.item.value}  entry_date={data.item.entry_date}
              />
            )}
            renderHiddenItem={(data,rowMap) =>(
              <View style={styles.rowBack}>

                  {isLoading 
                  ?
                  <View style={styles.buttonBack}>
                    <Text>...</Text>
                  </View>
                  :
                  <TouchableOpacity style={styles.buttonBack} onPress={() => deleteEntry(data.item.id)}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  }
              </View>
          )}
          rightOpenValue={-75}>
            </SwipeListView> */}

            <FlatList
            data={incomes}
            renderItem={(data) => (
              <EntryTab 
              status={data.item.status} type={data.item.type}  value={data.item.value}  entry_date={data.item.entry_date} table='income' id={data.item.id}
              />
            )}>
            </FlatList>


            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => props.navigation.navigate('IncomeModal')}
              // onPress={() => setModalVisible(true)}

            >
              <Text style={{fontWeight:'bold',color:'black',textAlign:'center'}}>Add entry +</Text>
            </TouchableOpacity>


        </SafeAreaView>


    )
}

export default Income

const styles = {
  main:{
      height:'100%',
      width:'100%',
      backgroundColor:'white'
  },
  container:{
    backgroundColor:'#FFD700',
    height:'20%',
    width:'100%',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
    justifyContent:'flex-start',
  //   alignItems:'center'
  },
  tab:{
    height:'10%',
    width:'90%',
    backgroundColor:'rgba(0,0,0,0)',
    // borderBottomWidth:2,
    borderColor:'rgba(0,0,0,0.3)',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:20
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
    padding:20,
    marginBottom:15,
    marginTop:30,
    width:'40%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FFD700',
    borderRadius:15
  },
  text:{
    width:'33%',
    textAlign:'center',
    fontSize:18
},
rowBack:{
  // alignItems:'center',
  flex:1,
  backgroundColor:'#FFD700',
  flexDirection:'row',
  justifyContent:'flex-end',
  paddingleft:15,
  // paddingBottom:5,
      
},
buttonBack:{
  paddingRight:15,
  // height:'100%',
  width:'100%',
  backgroundColor:'rgba(0,0,0,0.1)',
  alignItems:'flex-end',
  justifyContent:'center'
},    
modalButton:{
  width:'100%',
  padding:15,
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  backgroundColor:'#FFD700'
}
}

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
  },
  modalTextInput:{
    borderBottomWidth:2,
    padding:5
  },
  inputTab:{
    width:'45%',
    margin:5
  }
});