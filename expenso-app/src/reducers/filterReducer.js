import React from "react";

import * as t from '../types'

const defaultState = {
    dateFrom : 0,
    dateTo : 0 
}

const filterReducer = (state = defaultState, action ) =>{
    switch(action.type){
        case t.DATE_FILTER:
            console.log(action.payload.dateFrom)
            console.log(action.payload.dateTo)
            return state = {
                dateFrom : action.payload.dateFrom,
                dateTo : action.payload.dateTo
            }
        case 'CLEAR_FILTER':
            return state = defaultState
        default : 
            return state        
    }
}


export default filterReducer