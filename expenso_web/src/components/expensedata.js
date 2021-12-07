import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { getExpenses, getIncome, removeExpenses, removeIncome } from "../actions"

const ExpenseData = (data) =>{

    const dispatch = useDispatch()

    const id = useSelector(state => state.token.id)
    const token = useSelector(state => state.token.token)

    const filterDateFrom = useSelector(state => state.filter.dateFrom)
    const filterDateTo = useSelector(state => state.filter.dateTo)

    const expensesLoading = useSelector(state => state.expenses.isLoading)

    const deleteEntry = (token, idEntry) => {
        dispatch(removeExpenses(token, idEntry))
    
        setTimeout(()=>{
            dispatch(getExpenses(token, id))
        },500)
        
    }


    // console.log(data)
    if(data.status == 1
        && new Date(data.date.substr(0,10)) >= new Date(filterDateFrom) 
        && new Date(data.date.substr(0,10)) <= new Date(filterDateTo)
    ){
    return(
        

        <div style={styles.container}>
            <div style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', width:'100%'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center', width:'100%'}}>
                    <h4>{data.type}</h4>
                    <h6>{data.date.substr(0,10)}</h6>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center', width:'100%', marginTop:4}}>
                    <h5>RM</h5>
                    <h4>{data.value}</h4>
                </div>
                </div>
                <div style={{width:20,height:20,marginLeft:7, borderRadius:4, textAlign:'center',cursor:'pointer'}}>
                {expensesLoading
                    ?<p>...</p>
                    :< FontAwesomeIcon icon={faTimes} onClick={() => deleteEntry(token, data.id)}/>
                    }
                </div>
            </div>
            
        </div>
    )} else return <div></div>
}

export default ExpenseData

const styles = {
    container:{
        backgroundColor:'rgba(255,255,255,0.7)',
        width:'100%',
        minHeight:60,
        marginTop:4,
        borderRadius:10,
        padding:5,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
    }
}