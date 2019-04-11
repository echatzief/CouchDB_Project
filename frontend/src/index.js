import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore} from 'redux'
import allReducers from './Reducers/allReducers'

//Component
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import App from './Components/App'
import AddRestaurant from './Components/AddRestaurant'
import ProfileContainer from './Containers/ProfileContainer';

//Create store
const store = createStore(allReducers);

const render = () => ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signUp" component={SignUp}/>
                <Route exact path="/" component={App}/>
                <Route exact path="/addRestaurant" component={AddRestaurant}/>
                <Route exact path="/personalInfo" component={ProfileContainer}/>
            </div>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
)

render()
store.subscribe(render)