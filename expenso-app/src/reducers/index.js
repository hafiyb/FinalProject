import { combineReducers } from "redux";
import tokenReducer from './tokenReducer.js'
import incomeReducer from "./incomeReducer.js";
import expensesReducer from "./expensesReducer.js";
import filterReducer from "./filterReducer.js";


const rootReducer = combineReducers({
    token : tokenReducer,
    income : incomeReducer,
    expenses : expensesReducer,
    filter : filterReducer
})

export default rootReducer