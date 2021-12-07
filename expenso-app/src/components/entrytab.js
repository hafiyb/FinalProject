import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from '@expo/vector-icons';

import DropDownPicker from 'react-native-dropdown-picker';
import { getExpenses, getIncome, removeExpenses, removeIncome } from "../actions";


const EntryTab = (data) =>{

const token = useSelector(state => state.token.token)

const dispatch = useDispatch()

const incomesLoading = useSelector(state => state.income.isLoading)
const expensesLoading = useSelector(state => state.expenses.isLoading)

const filterDateFrom = useSelector(state => state.filter.dateFrom)
const filterDateTo = useSelector(state => state.filter.dateTo)

const filterDates = useSelector(state => state.filter)

const id = useSelector(state => state.token.id)

const deleteEntry = (idEntry) => {

    if(data.table == 'income'){
        dispatch(removeIncome(token, idEntry))
    
        setTimeout(() => {
          dispatch(getIncome(token, id))
          
        },300)
    }

    if(data.table == 'expense'){
        dispatch(removeExpenses(token, idEntry))
    
        setTimeout(() => {
          dispatch(getExpenses(token, id))
          
        },300)
    }
  
  }

useEffect(()=>{
    // this.setState(this.state)
},[filterDates])
    
    // console.log('lol date here', new Date(data.entry_date.substr(0,10)))
    return(
        // <TouchableOpacity style={styles.tab}>
        <View>
            {data.status == 1 
            && new Date(data.entry_date.substr(0,10)) >= new Date(filterDateFrom) 
            && new Date(data.entry_date.substr(0,10)) <= new Date(filterDateTo)
            ?
            <View style={{display:'flex', flexDirection:'row'}}>     
            <View style={styles.tab}>
            {/* {console.log(data.value.type)} */}
            <Text style={styles.text}>{data.type}</Text>
            <Text style={styles.text}>{data.entry_date.substr(0,10)}</Text>
            <Text style={styles.text}>{data.value}</Text> 
            </View>
                {(incomesLoading && data.table == 'income') || (expensesLoading && data.table == 'expense')
                ?
                <View style={styles.del}>
                    <Ionicons name={'ellipsis-horizontal'} size={20} color={'black'}  />
                </View>
                :
                <TouchableOpacity style={styles.del} onPress={()=> deleteEntry(data.id)}>
                    <Ionicons name={'trash-outline'} size={20} color={'black'}  />
                </TouchableOpacity>
                }   
            </View>
            : <View />
            }
        
        </View>
        // </TouchableOpacity>
    )
}

export default EntryTab

const styles = {
    tab:{
        // height:'100%',
        width:'90%',
        backgroundColor:'rgba(0,0,0,0)',
        borderTopWidth:2,
        // borderBottomWidth:2,
        borderColor:'rgba(0,0,0,0.3)',
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginBottom:2
    },
    text:{
        width:'33%',
        textAlign:'center',
        fontSize:18
    },
    del:{
        width:'10%',
        height:'90%',
        backgroundColor:'rgba(0,0,0,0.3)',
        // backgroundColor:'red',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomLeftRadius:15
    }
}

