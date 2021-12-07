import * as t from '../types'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const APIURL = 'http://423f-49-124-200-218.ngrok.io'

export const addToken = (data) => dispatch => {
    dispatch({
        type: t.ADD_TOKEN,
    })

    console.log('redux', data.email, data.password)

    try{
        axios.post(`${APIURL}/api/auth/login`,{
            email: data.email,
            password: data.password
        }).then((response) =>{
            // console.log(response)
            dispatch({
                type: t.ADD_TOKEN_SUCCESSFUL,
                payload : {
                    token: response.data.data.access_token,
                    user: response.data.data.user.name,
                    id: response.data.data.user.id
                }
            })
        }).catch(function(error) {
            alert("Login failed, try again")
            dispatch({
                type: t.ADD_TOKEN_FAIL,
            })
             // ADD THIS THROW error
              throw error;
        });
    }catch(error){
    
        console.log('error...', error)
        dispatch({
            type: t.ADD_TOKEN_FAIL,
        })
        throw error;

    }
}

export const removeToken = (token, status) => dispatch => {

    if(status == 'logout'){
        dispatch({
            type: t.REMOVE_TOKEN,
        })
    
        console.log(token) 
    
        try{
            axios.post(`${APIURL}/api/auth/logout`, {} , {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }).then((response) =>{
                // console.log('LOGGED OUT')
                dispatch({
                    type: t.REMOVE_TOKEN_SUCCESSFUL,
                })
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                 dispatch({
                    type: t.REMOVE_TOKEN_FAIL,
                })
                throw error;
            });
        }catch(error){
        
            console.log('error...', error)
            dispatch({
                type: t.REMOVE_TOKEN_FAIL,
            })
            throw error;
    
        }
    } else if (status == 'invalid') {
        dispatch({
        type: t.REMOVE_TOKEN_SUCCESSFUL,
    })
}

}
 

export const Register = (data,props) => dispatch =>{
    dispatch({
        type: t.REGISTER,
    })

    try{
        axios.post(`${APIURL}/api/auth/register`, {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation

        }).then((response) =>{
            dispatch({
                type: t.REGISTER_SUCCESSFUL,
                payload : response.data.user
            })
            alert('Registration successful! Welcome to Expenso!')
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
            dispatch({
                type: t.REGISTER_FAIL
            })
            throw error;
        });
    }catch(error){
    
        console.log('error...', error)
        dispatch({
            type: t.REGISTER_FAIL
        })
        throw error;

    }
}

export const getIncome = (token, id) => dispatch =>{
    dispatch({
        type: t.GET_INCOME
    })

    try{
        axios.post(`${APIURL}/api/getIncome`, {
            user_id : id
        } , {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }).then((response) =>{
            // console.log(response)
            dispatch({
                type: t.GET_INCOME_SUCCESSFUL,
                payload: response.data.data.incomes
            })
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
             dispatch({
                type: t.GET_INCOME_FAIL,
            })
            throw error;
        });
    }catch(error){
        console.log('error...', error)
        dispatch({
            type: t.GET_INCOME_FAIL,
        })
        throw error;
    }
}

export const addIncome = (token, id, type, inputValue, date) => dispatch =>{
dispatch({
    type: t.ADD_INCOME
})

try{
    axios.post(`${APIURL}/api/addIncome`, {
        user_id : id,
        value : inputValue,
        type : type,
        entry_date : date,
    } , {
        headers:{
            Authorization: 'Bearer ' + token
        }
    }).then((response) =>{
        // console.log(response)
        dispatch({
            type: t.ADD_INCOME_SUCCESSFUL
        })
        // alert('Entry added successfully')
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
        dispatch({
            type: t.ADD_INCOME_FAIL,
        })
        throw error;
    });
}catch(error){

    console.log('error...', error)
    dispatch({
        type: t.ADD_INCOME_FAIL,
    })
    throw error;

}
}


export const removeIncome = (token, id) => dispatch =>{
    dispatch({
        type: t.REMOVE_INCOME
    })

    console.log(id)

    try{
        axios.post(`${APIURL}/api/removeIncome`, {
            id : id,
        } , {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }).then((response) =>{
            // console.log(response)
            dispatch({
                type: t.REMOVE_INCOME_SUCCESSFUL
            })
            // alert('Entry removed successfully')
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
            dispatch({
                type: t.REMOVE_INCOME_FAIL,
            })
            throw error;
        });
    }catch(error){
    
        console.log('error...', error)
        dispatch({
            type: t.REMOVE_INCOME_FAIL,
        })
        throw error;
    
    }
}

export const getExpenses = (token, id) => dispatch =>{
    dispatch({
        type: t.GET_EXPENSES
    })

    try{
        axios.post(`${APIURL}/api/getExpenses`, {
            user_id : id
        } , {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }).then((response) =>{
            // console.log(response)
            dispatch({
                type: t.GET_EXPENSES_SUCCESSFUL,
                payload: response.data.data.expenses
            })
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
             dispatch({
                type: t.GET_EXPENSES_FAIL,
            })
            throw error;
        });
    }catch(error){
    
        console.log('error...', error)
        dispatch({
            type: t.GET_EXPENSES_FAIL,
        })
        throw error;

    }
}

export const addExpenses = (token, id, type, inputValue, date) => dispatch =>{
dispatch({
    type: t.ADD_EXPENSES
})

try{
    axios.post(`${APIURL}/api/addExpenses`, {
        user_id : id,
        value : inputValue,
        type : type,
        entry_date : date,
    } , {
        headers:{
            Authorization: 'Bearer ' + token
        }
    }).then((response) =>{
        // console.log(response)
        dispatch({
            type: t.ADD_EXPENSES_SUCCESSFUL
        })
        // alert('Entry added successfully')
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
         dispatch({
            type: t.ADD_EXPENSES_FAIL,
        })
        throw error;
    });
}catch(error){

    console.log('error...', error)
    dispatch({
        type: t.ADD_EXPENSES_FAIL,
    })
    throw error;

}
}


export const removeExpenses = (token, id) => dispatch =>{
    dispatch({
        type: t.REMOVE_EXPENSES
    })

    console.log(id)

    try{
        axios.post(`${APIURL}/api/removeExpenses`, {
            id : id,
        } , {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            }).then((response) =>{
            // console.log(response)
            dispatch({
                type: t.REMOVE_EXPENSES_SUCCESSFUL
            })
            // alert('Entry removed successfully')
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            dispatch({
                type: t.REMOVE_EXPENSES_FAIL,
            })
             // ADD THIS THROW error
            throw error;
        });
    }catch(error){
    
        console.log('error...', error)
        dispatch({
            type: t.REMOVE_EXPENSES_FAIL,
        })
        throw error;
    
    }

}

export const dateFilter = (dateFrom, dateTo) => dispatch =>{
    dispatch({
        type: t.DATE_FILTER,
        payload : {
            dateFrom : dateFrom,
            dateTo : dateTo 
        }
    })

    console.log('dispatching filter')
}



// export const checkToken = (token) => {
//     try{
//         console.log(token)
//         axios.get('http://127.0.0.1:8000/api/auth/user-profile' , {
//             headers:{
//                 Authorization: 'Bearer ' + token
//             }})
//         .then((response) =>{
//             console.log('this is check profile', response)
//             // dispatch({
//                 if()
//             // })
//         }).catch((error) => {
//                 console.log('error...',error.response.data.Error);
    
//             })
//         }catch(error){
//             console.log('error...', error)
    
//         }

//     }

    //     .catch(function(error) {
    //         console.log('There has been a problem with your fetch operation: ' + error.message);
    //          // ADD THIS THROW error
    //         throw error;
    //     });
    // }catch(error){
    
    //     console.log('error...', error)

    //     throw error;

    // }
