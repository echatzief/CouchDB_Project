import profile from './profile'
import restaurants from './restaurants'
import { combineReducers } from 'redux'

export default combineReducers({
    restaurants,
    profile,
})