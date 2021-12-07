import IncomeForm from "./incomeform"
import { faRandom } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import ExpenseForm from "./expenseform"
import Filter from "./filter"
import { useSelector } from "react-redux"


const SideBar = () =>{

    const user = useSelector(state => state.token.user)

    const [showForm, setshowForm] = useState(true)

    return(
        <div>
            <div style={styles.container}>
                <div style={styles.container2}>
                    <h3>Hi {user}!</h3>
                    <div style={styles.switch} onClick={() => setshowForm(!showForm)}>
                        <h3 style={{color:'#ffd700'}}>Switch </h3><FontAwesomeIcon icon={faRandom} color='#ffd700' />
                    </div>
                    {
                        showForm
                        ?<IncomeForm />
                        :<ExpenseForm />
                    }
                    
                </div>
                
            </div>
            <div style={styles.filterContainer}>
                <Filter />
            </div>
        </div>
    )
}

export default SideBar

const styles = {
    container:{
        backgroundColor:'rgba(0,0,0,0)',
        minWidth:200,
        width:'20%',
        height:'65%'
    },
    container2:{
        backgroundColor:'#ffd700',
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30
    },
    filterContainer:{
        backgroundColor:'#ffd700', 
        marginTop:2,
        width:'100%', 
        height:'35%',
        borderTopRightRadius:30,
        borderBottomRightRadius:30
    },
    switch:{
        // borderWidth:2,
        backgroundColor:'black',
        padding:4,
        width:'70%',
        margin:20,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        cursor:'pointer'
    }
}