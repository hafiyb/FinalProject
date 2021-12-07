import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToken, Register } from "../actions"


const RegisterForm = () =>{
    let dispatch = useDispatch()
    const token = useSelector(state => state.token.token)
    const isLoading = useSelector(state => state.token.isLoading)
    const user = useSelector(state => state.token.user)

    const registerAttempt = () =>{
        dispatch(Register({name:nameVal, email : emailVal, password : passwordVal, password_confirmation : passwordConVal}))
    
    }
    const [nameVal, setnameVal] = useState('')
    const [emailVal, setemailVal] = useState('')
    const [passwordVal, setpasswordVal] = useState('')
    const [passwordConVal, setpasswordConVal] = useState('')

    useEffect(() => {
        if(user != ''){
            dispatch(addToken({email : emailVal, password : passwordVal}))
        }
    }, [user])

    return(
        <div style={styles.loginCardLeft}>
                <h1 style={{margin:20}} onClick={()=> console.log(emailVal, passwordVal)}>Expenso</h1>
                <hr style={{width:'80%', }}/>
                <h2 style={{margin:20}}>Register</h2>
                <form style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center', width:'100%'}}>
                <input style={styles.textInput} type="text" placeholder='Name' onChange = {(value) => setnameVal(value.target.value)} />
                    <input style={styles.textInput} type="text" placeholder='Email' onChange = {(value) => setemailVal(value.target.value)} />
                    <input style={styles.textInput} type="password" placeholder='Password' onChange = {(value) => setpasswordVal(value.target.value)}/>
                    <input style={styles.textInput} type="password" placeholder='Password Confirmation' onChange = {(value) => setpasswordConVal(value.target.value)}/>
                    {isLoading
                    ?<input style={styles.buttonInput} type="button" value="Registering..." />
                    :<input style={styles.buttonInput} type="button" value="Register" onClick={()=>registerAttempt()} />
                    }
                </form>
                {/* <h3 style={{margin:20, textDecoration:'underline'}}>Create new account ?</h3> */}
        </div>
    )
}

export default RegisterForm

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