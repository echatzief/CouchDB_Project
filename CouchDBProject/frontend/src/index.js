import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore} from 'redux'
import restaurants from '../src/Reducers/restaurants'

//Component
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import App from './Components/App'
import AddRestaurant from './Components/AddRestaurant'

//Create store
export const store = createStore(restaurants);

const render = () => ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/" component={App}/>
                <Route exact path="/addRestaurant" component={AddRestaurant}/>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
)
render()