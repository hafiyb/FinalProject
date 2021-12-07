import { ActivityIndicatorComponent } from 'react-native'
import * as t from '../types'

const defaultState = {
    isLoading : false,
    token : '',
    user: '',
    id: ''
}

const tokenReducer = (state = defaultState,action) =>{
    switch(action.type){
        case t.ADD_TOKEN:
            return state = {
                isLoading: true,
                token : '',
                user: '',
                id: ''
            }
        case t.ADD_TOKEN_SUCCESSFUL:
            return state = {
                isLoading:false,
                token : action.payload.token,
                user: action.payload.user,
                id : action.payload.id
            } 
        case t.ADD_TOKEN_FAIL:
            return state = {
                isLoading: false,
                token : '',
                user: '',
                id: ''
            } 

        case 'CLEAR_TOKEN':{
            return state = defaultState
        }

        case t.REGISTER:
            return state = {
                isLoading: true,
                token : '',
                user: '',
                id: ''
            }
        case t.REGISTER_SUCCESSFUL:
            return state = {
                isLoading: false,
                token : '',
                user: action.payload.name,
                id: action.payload.id
            }
        case t.REGISTER_FAIL:
            return state = {
                isLoading: false,
                token : '',
                user: '',
                id: ''
            }

        case t.REMOVE_TOKEN:
            return state = {
                isLoading: true,
                token : state.token,
                user : state.user,
                id: state.id
            }
        case t.REMOVE_TOKEN_SUCCESSFUL:
            return state = {
                isLoading: false,
                token : '',
                user: '',
                id: ''
            } 
        case t.REMOVE_TOKEN_FAIL:
            return state = {
                isLoading: false,
                token : state.token,
                user : state.user,
                id: state.id
            } 
        default:
            return state
    }
}

export default tokenReducer