import axios from "axios";
import React, { useState } from "react";
import { checkToken, dateFilter, getExpenses, removeToken } from "../../actions";
import { SafeAreaView, Text, View, TouchableOpacity, Button, Switch } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIncome } from "../../actions";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DateTimePicker from '@react-native-community/datetimepicker';


const APIURL = 'http://423f-49-124-200-218.ngrok.io'

const Dashboard = (props) =>{

    const dispatch = useDispatch()

    const token = useSelector(state => state.token.token)
    const loading = useSelector(state => state.token.isLoading)
    const name = useSelector(state => state.token.user)
    const id = useSelector(state => state.token.id)

    const incomesLoading = useSelector(state => state.income.isLoading)

    const incomeData = useSelector(state => state.income.incomes)
    const [totalIncome, setTotalIncome] = useState(0)

    const expensesLoading = useSelector(state => state.expenses.isLoading)

    const expensesData = useSelector(state => state.expenses.expenses)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const filterDates = useSelector(state => state.filter)

    const balance = totalIncome - totalExpenses

    const circleBarFill = totalExpenses/totalIncome * 100

    const logout = () =>{
        dispatch(removeToken(token, 'logout'))
    }

    
    const [dateFrom, setDateFrom] = useState(new Date());

    const [dateTo, setDateTo] = useState(new Date());

    const [modeFrom, setModeFrom] = useState('date');
    const [showFrom, setShowFrom] = useState(false);

    const [modeTo, setModeTo] = useState('date');
    const [showTo, setShowTo] = useState(false);
  
    useEffect(()=>{
        console.log(filterDates)
        updateTotal()
    },[filterDates])
    
    useEffect(()=>{
        let date1 = Math.floor(new Date(dateTo).getTime())
        let date2 = Math.floor(new Date(dateFrom).getTime())
        
        dispatch(dateFilter(date2, date1))
    },[dateTo,dateFrom])

    const onChangeTo = (event, selectedDate) => {
      const currentDate = selectedDate || dateTo;
      setShowTo(Platform.OS === 'ios');
      console.log(currentDate)
      setDateTo(currentDate);

        console.log('To',selectedDate.toDateString())
    };

    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate || dateFrom;
        setShowFrom(Platform.OS === 'ios');
        console.log(currentDate)
        setDateFrom(currentDate);

        console.log('From',selectedDate.toDateString())
      };

      const showModeTo = (currentMode) => {
        setShowTo(true);
        setModeTo(currentMode);
      };
    
      const showDatepickerTo = () => {
        showModeTo('date');
      };

      const showModeFrom = (currentMode) => {
        setShowFrom(true);
        setModeFrom(currentMode);
      };
    
      const showDatepickerFrom = () => {
        showModeFrom('date');
      };

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
    }

    const filterDateFrom = useSelector(state => state.filter.dateFrom)
    const filterDateTo = useSelector(state => state.filter.dateTo)

    const updateTotal = () =>{
        if(incomeData.length > 0){
            let temp = 0
            incomeData.forEach(income => {
                // console.log(income.status)
                if(income.status == 1
                    && new Date(income.entry_date.substr(0,10)) >= new Date(filterDateFrom) 
                    && new Date(income.entry_date.substr(0,10)) <= new Date(filterDateTo)){
                    temp += parseFloat(income.value)
                    // console.log(temp)
                    
                }
                setTotalIncome(temp.toFixed(2))
            });
        } else {
            let temp = 0
            setTotalIncome(temp.toFixed(2))
        }
        if(expensesData.length > 0){
            let temp = 0
            expensesData.forEach(expenses => {
                // console.log(expenses.status)
                if(expenses.status == 1
                    && new Date(expenses.entry_date.substr(0,10)) >= new Date(filterDateFrom) 
                    && new Date(expenses.entry_date.substr(0,10)) <= new Date(filterDateTo)){
                    temp += parseFloat(expenses.value)
                    // console.log(temp)
                    
                }
                setTotalExpenses(temp.toFixed(2))
            });
        } else {
            console.log('here lol')
            let temp = 0
            setTotalExpenses(temp.toFixed(2))
        }
    }

    useEffect(()=>{
        dispatch(getIncome(token, id))
        dispatch(getExpenses(token, id))
        updateTotal()

        setTimeout(()=>{
            console.log('TOKEN CHECK HERE',token)
            checkToken(token)
        },500)  
    },[])

    useEffect(()=>{
        updateTotal()
    },[incomeData])

    useEffect(() =>{
        updateTotal()
    }, [expensesData])

    const testingHere = () =>{
        let date1 = Math.floor(new Date().getTime())
        let date2 = Math.floor(new Date(date1-1000*60*60*24*30))
        
        dispatch(dateFilter(date2, date1))

        console.log(date1)
        console.log(date2)

        // console.log(filterDates)

        // date1 > date2
        // ? console.log('date1 is larger')
        // : console.log('date2 is larger')
    }

    const testingHere2 = () =>{
        let newDateFrom = new Date(filterDates.dateFrom)  
        let newDateTo = new Date(filterDates.dateTo)  
        console.log(newDateFrom)
        console.log(newDateTo)

        console.log(newDateFrom > newDateTo)
        console.log(newDateTo > newDateFrom)
    }


    const checkToken = (token) => {
        try{
            // console.log(token)
            axios.get(`${APIURL}/api/auth/user-profile` , {
                headers:{
                    Authorization: 'Bearer ' + token
                }})
            .then((response) =>{
                console.log('valid token');

            }).catch((error) => {
                console.log('invalid token');
                dispatch(removeToken(token, 'invalid'))
            })
            }catch(error){
                console.log('error...', error)
        
            }
    
        }

    const _APITestAgain = () =>{
      checkToken(token)
    }

    
    useEffect(() => {
        if(token == ''){
        props.navigation.navigate('Login')
        }
    }, [token])

    return(
        <SafeAreaView style={styles.main}>
            <View style={styles.container}>
                <View style={{width:'100%',flexDirection:'row', justifyContent:'space-between',marginTop:15}}>
                <Text style={styles.helloText} onPress={() => testingHere()}>Hello {name}!</Text>
                <TouchableOpacity style={styles.logout}  onPress={() => logout()}>
                    <Text style={{color:'#ffd700', fontWeight:'bold'}}>Logout</Text>
                </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', alignItems:'center', paddingTop:20}}>
                <View style={styles.containerRow}>
                    <View>
                    <Text style={styles.headerText} onPress={() => testingHere2()}>Incomes</Text>
                    {incomesLoading == true 
                    ?<Text style={styles.headerText}>RM   ...</Text>
                    :<Text style={styles.headerText2}>RM {totalIncome}</Text>
                    }
                    </View>
                    <View style={{marginTop:30}}>
                    <Text style={styles.headerText}>Expenses</Text>
                    {expensesLoading == true 
                    ?<Text style={styles.headerText}>RM   ...</Text>
                    :<Text style={styles.headerText2}>RM {totalExpenses}</Text>
                    }
                    </View>
                    <View style={{marginTop:30}}>
                    <Text style={styles.headerText}>Total Saved</Text>
                    {incomesLoading == true || expensesLoading == true
                    ?<Text style={styles.headerText}>RM   ...</Text>
                    :<Text style={styles.headerText2}>RM {balance.toFixed(2)}</Text>
                    }
                    </View>
                </View>

                <AnimatedCircularProgress
                    size={150}
                    width={13}
                    backgroundWidth={19}

                    rotation={180}
                    padding={5}
                    lineCap={'butt'}
                    // arcSweepAngle={270}
                    fill={circleBarFill.toFixed(0)}
                    tintColor="white"
                    backgroundColor="black">
                    {
                        (fill) => (
                            <View style={{marginTop:0, alignItems:'center'}}>
                            {circleBarFill >= 0
                            ?
                            <View>
                            <Text style={styles.headerText2}>{100 - circleBarFill.toFixed(0)}%</Text>
                            <Text style={styles.headerText}>Saved</Text>
                            </View>
                            :
                            <View>
                            <Text style={styles.headerText2}>Hello </Text>
                            <Text style={styles.headerText2}>there!</Text>
                            </View>
                            }
                            
                            
                            </View>
                    )
                    }
                </AnimatedCircularProgress>


            </View>
            
            <View style={{width:'80%'}}>
            <View style={{flexDirection:'row', alignItems:'center', alignSelf:'flex-end'}}>
            <Text>Last 30 days</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#f0f0f0" }}
              thumbColor={isEnabled ? "#ffd700" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />

            </View>
            {isEnabled 
                    ?
                    <View>
                        {dateFrom.toDateString() != new Date(dateTo-1000*60*60*24*30).toDateString()
                        ? setDateFrom(new Date(dateTo-1000*60*60*24*30))
                        : null}
                    <View>
                        <View onPress={showDatepickerFrom} style={styles.dateBox}>
                        <Text style={{color:'#a0a0a0'}}>From</Text>
                        <Text style={{color:'#a0a0a0'}}>{new Date(dateFrom).toDateString()}</Text> 
                        <Text style={{color:'rgba(0,0,0,0)', marginLeft:20}}>Change</Text>
                        </View>
                    </View>
                    {showFrom && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dateFrom}
                        mode={modeFrom}
                        // is24Hour={true}
                        display="default"
                        onChange={onChangeFrom}
                        />
                    )}
                    </View>
                    : 
                    <View>
                    <View>
                        <TouchableOpacity onPress={showDatepickerFrom} style={styles.dateBox}>
                        <Text style={{color:'#a0a0a0'}}>From</Text>
                        <Text>{new Date(dateFrom).toDateString()}</Text>
                        <Text style={{color:'#a0a0a0', marginLeft:20}}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    {showFrom && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dateFrom}
                        mode={modeFrom}
                        // is24Hour={true}
                        display="default"
                        onChange={onChangeFrom}
                        />
                    )}
                    </View>
                    }

                    
                    


                    {isEnabled 
                    ?
                    <View>
                        {dateTo.toDateString() != new Date().toDateString()
                        ? setDateTo(new Date())
                        : null}
                    <View>
                        <View onPress={showDatepickerTo} style={styles.dateBox}>
                        <Text style={{color:'#a0a0a0'}}>To     </Text>
                        <Text style={{color:'#a0a0a0'}}>{new Date(dateTo).toDateString()}</Text> 
                        <Text style={{color:'rgba(0,0,0,0)', marginLeft:20}}>Change</Text>
                        </View>
                    </View>
                    {showTo && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dateTo}
                        mode={modeTo}
                        // is24Hour={true}
                        display="default"
                        onChange={onChangeTo}
                        />
                    )}
                    </View>
                    : 
                    <View>
                    <View>
                        <TouchableOpacity onPress={showDatepickerTo} style={styles.dateBox}>
                        <Text style={{color:'#a0a0a0'}}>To     </Text>
                        <Text>{new Date(dateTo).toDateString()}</Text>
                        <Text style={{color:'#a0a0a0', marginLeft:20}}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    {showTo && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={dateTo}
                        mode={modeTo}
                        // is24Hour={true}
                        display="default"
                        onChange={onChangeTo}
                        />
                    )}
                    </View>
                    }
                    </View>
                </View>

            <View style={{flexDirection:'row', justifyContent:"space-evenly"}}>
                <TouchableOpacity style={styles.button} onPress={() =>  props.navigation.navigate('IncomeModal')}>
                    <Text style={{fontWeight:'bold'}}>Add Income</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('ExpensesModal')}>
                    <Text style={{fontWeight:'bold'}}>Add Expense</Text>
                </TouchableOpacity>
            </View>
            {/* <TouchableOpacity style={styles.button} onPress={() => logout()}>
                    <Text>Logout</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default Dashboard

const styles = {
    main:{
        height:'100%',
        width:'100%',
        backgroundColor:'white'
    },
    container:{
      backgroundColor:'#FFD700',
      height:'85%',
      width:'100%',
      borderBottomRightRadius:50,
      borderBottomLeftRadius:50,
    //   justifyContent:'flex-end',
      alignItems:'center'
    },
    containerRow:{
        width:'60%',
        // height:20,
        paddingLeft:30,
        marginTop:30,
        // flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        // backgroundColor:'gray'
    },
    helloText:{
        fontSize:28,
        marginTop:40,
        marginLeft:40,
        fontWeight:'bold'
        // backgroundColor:'blue'
    },
    headerText:{
        fontSize:22,
        // textAlign:'',
        fontWeight:'bold'
    },
    headerText2:{
        fontSize:20,
        // textAlign:'',
        fontWeight:'bold'
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
    logout:{
        marginTop:40,
        marginRight:30,
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        borderRadius:10
    },
    dateBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderWidth:2,
        borderColor:'#FFD700',
        borderRadius:15,
        backgroundColor:'white',
        marginTop:8
      }
  }