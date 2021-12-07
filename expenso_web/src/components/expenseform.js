import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addExpenses, addIncome, getExpenses, getIncome } from "../actions"


const ExpenseForm = () => {

    const [type, settype] = useState('Rent')
    const [value, setvalue] = useState(0)
    const [date, setdate] = useState(new Date().toISOString().split('T')[0])
    const token = useSelector(state => state.token.token)
    const id = useSelector(state => state.token.id)
    const expensesLoading = useSelector(state => state.expenses.isLoading)


    const dispatch = useDispatch()

    const addExpenseAttempt = () => {
        if(type != '' && value > 0 ){
            dispatch(addExpenses(token, id, type, value, date))

            setTimeout(() => {
              dispatch(getExpenses(token, id))
            }, 1000)
        }
    }

  

    return(
        <div style={styles.container}>
            <h2 >Add Expense</h2>
            <hr style={{width:'80%', margin:20}} />
            <div style={styles.container2}>

            {/* <form > */}
                <label style={styles.inputLabel} htmlFor="Type">Type : </label>
                <select style={styles.input}  name="Type" onChange={(value) => settype(value.target.value)}>
                    <option value="Rent" key="">Rent</option>
                    <option value="Bills" key="">Bills</option>
                    <option value="Loans" key="">Loans</option>
                    <option value="Food" key="">Food</option>
                    <option value="Groceries" key="">Groceries</option>
                    <option value="Misc." key="">Misc.</option>
                </select>
                <label style={styles.inputLabel} htmlFor="Value">Value : </label>
                <input style={styles.input} type="text" name="Value" onChange={(value) => setvalue(value.target.value)}/>
                <label style={styles.inputLabel} htmlFor="Date">Date : </label>
                <input style={styles.input} type="date" name="Date" value={date} onChange={(value) => setdate(value.target.value)}/>
                {expensesLoading
                ?<input style={styles.inputButton} type="button" value="Adding entry..."/>
                :<input style={styles.inputButton} type="button" value="Add entry" onClick={() => addExpenseAttempt()}/>
                }
                
            {/* </form> */}
            </div>
        </div>
    )
}

export default ExpenseForm

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
        width:'80%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    input:{
        padding:5,
        width:'100%',
        borderRadius:10
    },
    inputButton:{
        padding:7,
        margin:10,
        color:'#ffd700',
        backgroundColor:'black',
        borderRadius:10,
        fontWeight:'bold',
        cursor:'pointer'

    },
    inputLabel:{
        fontWeight:'bold',
        marginTop:10,
        marginBottom:5
    }
}