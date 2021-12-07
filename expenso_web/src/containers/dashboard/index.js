import React from "react";
import SideBar from "../../components/sidebar";
import { useState, useEffect } from "react";
import IncomeBar from "../../components/incomebar";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, getIncome, removeToken } from "../../actions";
import axios from "axios";
import { useNavigate } from "react-router";
import ExpenseBar from "../../components/expensebar";
import Summary from "../../components/summary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faArrowCircleRight, faSignOutAlt, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import Summary2 from "../../components/summary2";

const APIURL = 'http://423f-49-124-200-218.ngrok.io'

const Dashboard = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

 

    const [sideBar, showSideBar] = useState(false)
    

    const logout = () =>{
        alert('Logging out, thanks for using Expenso!')
        dispatch(removeToken(token, 'logout'))
    }

    useEffect(()=>{

        dispatch(getIncome(token, id))
        dispatch(getExpenses(token, id))

        setTimeout(()=>{
            console.log('TOKEN CHECK HERE',token)
            checkToken(token)
        },1000)  
    },[])

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

    useEffect(() => {
        if(token == ''){
            navigate('/')
        }
    }, [token])
        
    return(
        <div style={styles.container}>
            <div style={styles.sideNav}>
                <div>
                    <div style={styles.navButton} onClick={() => showSideBar(!sideBar)}>
                        {sideBar?
                        <FontAwesomeIcon size='2x' icon={faArrowCircleRight} color='#ffd700'/>:
                        <FontAwesomeIcon size='2x' icon={faArrowCircleLeft} color='#ffd700'/>}
                    </div>
                </div>
                <div style={styles.navButton} onClick={() => logout()}>
                    <FontAwesomeIcon size='2x' icon={faDoorOpen} color='#ffd700'/>
                    </div>
            </div>
            {sideBar?<SideBar />:null}
            <IncomeBar />
            <ExpenseBar />
            <Summary />
            <Summary2 />
        </div>
    )
}

const styles={
    container:{
        backgroundColor:'black',
        minWidth:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'row',
        overflowY:'hidden',
        // overflowX:'hidden'

    },
    sideNav:{
        backgroundColor:'black',
        height:'100vh',
        minWidth:50,
        // width:'3%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        paddingTop:50,
        paddingBottom:50
    },
    navButton:{
        // backgroundColor:'#ffd700',
        width:'100%',
        aspectRatio:'1',
        marginTop: 20,
        display:'flex',
        flex:'row',
        justifyContent:'center',
        alignItems:'center',
        transform:'scaleX(-1)',
        cursor:'pointer'
    }
}

export default Dashboard