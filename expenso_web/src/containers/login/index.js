import React from "react"
import { Navigate, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToken } from "../../actions"
import axios from "axios"
import LoginForm from "../../components/login"
import RegisterForm from "../../components/register"

function Login(){

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const token = useSelector(state => state.token.token)

    const user = useSelector(state => state.token.user)

    const [emailVal, setemailVal] = useState('')
    const [passwordVal, setpasswordVal] = useState('')
    const [formVal, setformVal] = useState(true)

    useEffect(() => {
        if(token != ''){
            setTimeout(() =>{
                navigate('/home')
            },500)
        }
    }, [token])

    useEffect(() =>{
        if(user != '' && formVal == false){
            setformVal(true)
        }
    },[user])


    return(
        <div style={styles.container}>
            <div style={styles.filter}>
            <div style={styles.loginCard}>

                {formVal
                ?
                <div style={styles.loginCardLeft}>
                    <LoginForm />
                    <h3 style={{cursor:'pointer',margin:20, textDecoration:'underline'}} onClick={() => setformVal(!formVal)}>Create new account ?</h3>
                </div>
                :
                <div style={styles.loginCardLeft}>
                    <RegisterForm />
                    <h3 style={{cursor:'pointer',margin:20, textDecoration:'underline'}} onClick={() => setformVal(!formVal)}>Return to login</h3>
                </div>
                }
                
                <div style={styles.loginCardRight}></div>
            </div>
            </div>
        </div>
    )
    
}

export default Login

const styles={
    container:{
        width:'100vw',
        height:'100vh',
        // backgroundColor:'black',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundImage:"url('../assets/images/3.jpg')",
        backgroundSize:'auto',
        backgroundPosition:'center',


    },
    filter:{
        width:'100%',
        height:'100%',
        backdropFilter:'blur(10px)',
        backgroundColor:'rgba(0,0,0,0.7)',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    loginCard:{
        backgroundColor:'black',
        minWidth:700,
        minHeight:400,
        height:'auto',
        borderRadius:50,
        display:'flex',
        flexDirection:'row',
        // justifyContent:'',
        alignItems:'center',
        overflow:'hidden',

    },
    loginCardLeft:{
        backgroundColor:'#ffd700',
        width:'60%',
        height:'100%',
        // borderRadius:50,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    loginCardRight:{
        backgroundColor:'red',
        backgroundImage:"url('../assets/images/2.jpg')",
        backgroundSize:'cover',
        height:'100%',
        width:'40%'
    },
    textInput:{
        padding:10,
        marginBottom:20,
        borderRadius:20,
        borderWidth:0,
        width:'70%'
    },
    buttonInput:{
        padding:10,
        backgroundColor:'black',
        color:'#ffd700',
        fontWeight:'bold',
        borderRadius:20,
        width:'30%'
    }
}