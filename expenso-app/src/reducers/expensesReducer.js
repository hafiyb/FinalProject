import React from "react"

import * as t from '../types'

const defaultState = {
    isLoading : false,
    status : 0,
    expenses : {},
}

const expensesReducer = (state = defaultState,action) =>{
    switch(action.type){
        case t.GET_EXPENSES :
            return state = {
                isLoading : true,
                status : 0,
                expenses : state.expenses
            }
        case t.GET_EXPENSES_SUCCESSFUL :
            return state = {
                isLoading : false,
                status : 0,
                expenses : action.payload
            }
        case t.GET_EXPENSES_FAIL :
            return state = {
                isLoading : false,
                status : 0,
                expenses : state.expenses
            }
        case t.ADD_EXPENSES :
            return state = {
                isLoading : true,
                status : 0,
                expenses : state.expenses
            }
        case t.ADD_EXPENSES_SUCCESSFUL :
            return state = {
                isLoading : false,
                status : 0,
                expenses : state.expenses
            }
        case t.ADD_EXPENSES_FAIL :
            return state = {
                isLoading : false,
                status : 0,
                expenses : state.expenses
            }
        case t.REMOVE_EXPENSES :
            return state = {
                isLoading : true,
                status : 0,
                expenses : state.expenses
            }
        case t.REMOVE_EXPENSES_SUCCESSFUL :
            return state = {
                isLoading : false,
                status : 0,
                expenses : state.expenses
            }
        case t.REMOVE_EXPENSES_FAIL :
            return state = {
                isLoading : false,
                status : 0,
                expenses : state.expenses
            }
        default :
            return state
    }

}

export default expensesReducer