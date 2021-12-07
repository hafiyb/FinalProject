import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const SummaryTotal = () =>{

    const incomesLoading = useSelector(state => state.income.isLoading)

    const incomeData = useSelector(state => state.income.incomes)
    const [totalIncome, setTotalIncome] = useState(0)

    const expensesLoading = useSelector(state => state.expenses.isLoading)

    const expensesData = useSelector(state => state.expenses.expenses)
    const [totalExpenses, setTotalExpenses] = useState(0)

    const filterDates = useSelector(state => state.filter)

    const filterDateFrom = useSelector(state => state.filter.dateFrom)
    const filterDateTo = useSelector(state => state.filter.dateTo)

    let saved = 'white'
    if(totalIncome-totalExpenses < 0 ){
        saved = 'red'
    }

    const data = {
        labels: ['Saved', 'Spent',],
        datasets: [
          {
            // label: '# of Votes',
            data: [totalIncome-totalExpenses, totalExpenses],
            backgroundColor: [
              saved,
              'black',
            ],
            borderColor: [
              saved,
              'white',
            ],
            borderWidth: 3,
          },
        ],

        options: {
            plugins: {
              legend: {
                display: false,
                position: 'bottom'
              },
              
            },
            
          }
    };


    
    const updateTotal = () =>{
        if(incomeData.length > 0){
            let temp = 0
            incomeData.forEach(income => {
                // console.log(income.status)
                if(income.status == 1
                    && new Date(income.entry_date.substr(0,10)) >= new Date(filterDateFrom) 
                    && new Date(income.entry_date.substr(0,10)) <= new Date(filterDateTo)
                    ){
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
                    && new Date(expenses.entry_date.substr(0,10)) <= new Date(filterDateTo)
                    ){
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
        console.log(filterDates)
        updateTotal()
    },[filterDates])

    useEffect(()=>{
        updateTotal()
    },[incomeData])

    useEffect(() =>{
        updateTotal()
    }, [expensesData])

    return(
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <div style={{width:'45%'}}>
                    <div style={{marginTop:20}}>
                        <h2>Total Income</h2>
                        <div style={{display:'flex', flexDirection:'row',width:'90%', justifyContent:'space-between'}}>
                            <h3>RM</h3>
                            <h2>{totalIncome}</h2>
                        </div>

                    </div>
                    <div style={{marginTop:20}}>
                        <h2>Total Expense</h2>
                        <div style={{display:'flex', flexDirection:'row',width:'90%', justifyContent:'space-between'}}>
                            <h3>RM</h3>
                            <h2>{totalExpenses}</h2>
                        </div>

                    </div>
                    <div style={{marginTop:20,}}>
                        <h2>Total Saved</h2>
                        <div style={{display:'flex', flexDirection:'row',width:'90%', justifyContent:'space-between'}}>
                            <h3>RM</h3>
                            <h2>{(totalIncome-totalExpenses).toFixed(2)}</h2>
                        </div>

                    </div>
                    
                    
                </div>
                <div style={{width:'45%'}}>
                <Doughnut data={data} />

                </div>

            </div>
        </div>
    )
}

export default SummaryTotal

const styles={
    container:{
        width:'100%',
        // height:500,
        backgroundColor:'#ffd700',
        borderRadius:30,
        padding:15,
        marginTop:5
    },
    innerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
    
}