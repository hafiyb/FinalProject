import React from "react"

import * as t from '../types'

const defaultState = {
    isLoading : false,
    status : 0,
    incomes : {},
}

const incomeReducer = (state = defaultState,action) =>{
    switch(action.type){
        case t.GET_INCOME :
            return state = {
                isLoading : true,
                status : 0,
                incomes : state.incomes
            }
        case t.GET_INCOME_SUCCESSFUL :
            return state = {
                isLoading : false,
                status : 0,
                incomes : action.payload
            }
        case t.GET_INCOME_FAIL :
            return state = {
                isLoading : false,
                status : 0,
                incomes : state.incomes
            }
        case t.ADD_INCOME :
            return state = {
                isLoading : true,
                status : 0,
                incomes : state.incomes
            }
        case t.ADD_INCOME_SUCCESSFUL :
            return state = {
                isLoading : false,
                status : 0,
                incomes : state.incomes
            }
        case t.ADD_INCOME_FAIL :
            return state = {
                isLoading : false,
                status : 0,
                incomes : state.incomes
            }
        case t.REMOVE_INCOME :
            return state = {
                isLoading : true,
                status : 0,
                incomes : state.incomes
            }
        case t.REMOVE_INCOME_SUCCESSFUL :
            return state = {
                isLoading : false,
                status : 0,
                incomes : state.incomes
            }
        case t.REMOVE_INCOME_FAIL :
            return state = {
                isLoading : false,
                status : 0,
                incomes : state.incomes
            }
        default :
            return state
    }

}

export default incomeReducer