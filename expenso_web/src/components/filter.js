import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dateFilter } from "../actions"

const Filter = () =>{

    const dispatch = useDispatch()

    const [dateTo, setdateTo] = useState('')
    const [dateFrom, setdateFrom] = useState('')

    const preDateForm = new Date()-1000*60*60*24*30

    const filterDates = useSelector(state => state.filter)

    const filterDateFrom = useSelector(state => state.filter.dateFrom)
    const filterDateTo = useSelector(state => state.filter.dateTo)

    useEffect(()=>{
        if(filterDateFrom != '' && filterDateTo != ''){
            setdateFrom(new Date(filterDateFrom).toISOString().split('T')[0])
            setdateTo(new Date(filterDateTo).toISOString().split('T')[0])
        } else {
            // setdateFrom(new Date(preDateForm).toISOString().split('T')[0])
            // setdateTo(new Date().toISOString().split('T')[0])
            resetFilter()
        }
    },[])

    const resetFilter = () =>{
        setdateFrom(new Date(preDateForm).toISOString().split('T')[0])
        setdateTo(new Date().toISOString().split('T')[0])
    }
    
    // const [dateTo, setdateTo] = useState(new Date().toISOString().split('T')[0])
    // const preDateForm = new Date()-1000*60*60*24*30
    // const [dateFrom, setdateFrom] = useState(new Date(preDateForm).toISOString().split('T')[0])

    // const [dateTo, setdateTo] = useState(dateTo)
    // const preDateForm = new Date()-1000*60*60*24*30
    // const [dateFrom, setdateFrom] = useState(dateFrom)

    useEffect(()=>{
        let date1 = Math.floor(new Date(dateTo).getTime())
        let date2 = Math.floor(new Date(dateFrom).getTime())
        
        dispatch(dateFilter(date2, date1))
    },[dateTo,dateFrom])

    return(
        <div style={styles.container2}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
                <h2>Filter</h2> 
                <button style={styles.blackButton} onClick={() => resetFilter()}>Reset</button>
            </div>
            
            <hr style={{width:'100%', margin:5}} />
            <label style={styles.inputLabel} htmlFor="DateFrom">From : </label>
            <input style={styles.input} type="date" name="DateFrom" value={dateFrom} onChange={(value) => setdateFrom(value.target.value)}/>
            <label style={styles.inputLabel} htmlFor="DateTo">To : </label>
            <input style={styles.input} type="date" name="DateTo" value={dateTo} onChange={(value) => setdateTo(value.target.value)}/>
        </div>
    )
}

export default Filter

const styles={
    // container:{
    //     backgroundColor:'#ffd700',
    //     width:'100%',
    //     height:'100%',
    //     display:'flex',
    //     flexDirection:'column',
    //     justifyContent:'center',
    //     alignItems:'center',
    //     borderTopRightRadius:30,
    //     borderBottomRightRadius:30
    // },
    container2:{
        width:'90%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        padding:20
        // backgroundColor:'black'
    },
    input:{
        padding:5,
        width:'100%',
        borderRadius:10
    },
    inputButton:{
        padding:7,
        margin:10,
        // color:'#ffd700',
        borderRadius:10,
        fontWeight:'bold'
    },
    inputLabel:{
        fontWeight:'bold',
        marginTop:10,
        marginBottom:5
    },
    blackButton:{
        padding:5,
        borderRadius:10,
        color:'#ffd700',
        backgroundColor:'black',
        fontWeight:'bold',
        borderWidth:0,
        cursor:'pointer'
    }
}