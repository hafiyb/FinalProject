

import { useSelector } from "react-redux"
import { useState } from "react"
import ExpenseData from "./expensedata"

const ExpenseBar = () =>{

    const incomesLoading = useSelector(state => state.income.isLoading)

    const incomeData = useSelector(state => state.income.incomes)
    const [totalIncome, setTotalIncome] = useState(0)

    const expensesLoading = useSelector(state => state.expenses.isLoading)

    const expensesData = useSelector(state => state.expenses.expenses)
    const [totalExpenses, setTotalExpenses] = useState(0)
    
    return(
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={styles.header}>
                    <h2>Expense</h2>
                </div>
                <div style={{padding:2, overflow:'auto', height:'90%'}}>
                    {
                        expensesData.map((data) => <ExpenseData type={data.type} date={data.entry_date} status={data.status} value={data.value} id={data.id} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ExpenseBar

const styles = {
    container:{
        minWidth:200,
        width:'20%',
        height:'100vh',
        // backgroundColor:'black',
        paddingLeft:2,
        paddingRight:2
    },
    innerContainer:{
        width:'100%',
        height:'100%',
        // backgroundColor:'white'
    },
    header:{
        backgroundColor:'#ffd700',
        width:'100%',
        height:65,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:20,
        paddingRight:30,
        borderBottomRightRadius:30,
        // borderBottomLeftRadius:20,
    }
}