import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToken } from "../actions"



const LoginForm = () =>{

    let dispatch = useDispatch()
    const token = useSelector(state => state.token.token)
    const isLoading = useSelector(state => state.token.isLoading)


    const loginAttempt = () =>{
        dispatch(addToken({email : emailVal, password : passwordVal}))
    }

    const [emailVal, setemailVal] = useState('')
    const [passwordVal, setpasswordVal] = useState('')
    return(
        <div style={styles.loginCardLeft}>
                <h1 style={{margin:20}} onClick={()=> console.log(emailVal, passwordVal)}>Expenso</h1>
                <hr style={{width:'80%', }}/>
                <h2 style={{margin:20}}>Login</h2>
                <form style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center', width:'100%'}}>
                    <input style={styles.textInput} type="text" placeholder='Email' onChange = {(value) => setemailVal(value.target.value)} />
                    <input style={styles.textInput} type="password" placeholder='Password' onChange = {(value) => setpasswordVal(value.target.value)}/>

                    {isLoading
                    ?<input style={styles.buttonInput} type="button" value="Logging in..." />
                    :<input style={styles.buttonInput} type="button" value="Login" onClick={()=>loginAttempt()} />
                    }
                </form>
        </div>
    )
}

export default LoginForm

const styles={
    loginCardLeft:{
        backgroundColor:'#ffd700',
        width:'100%',
        height:'100%',
        // borderRadius:50,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
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
        width:'30%',
        cursor:'pointer'
    }
}