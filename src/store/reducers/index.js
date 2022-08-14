import { combineReducers } from "redux"
import { ListReducer } from './ListReducer'
import { ContactReducer } from './ContactReducer'

export const rootReducer = combineReducers({
    lists: ListReducer,
    contacts: ContactReducer,
})