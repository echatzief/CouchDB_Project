import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Route} from 'react-router-dom'

//Component
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import App from './Components/App'

const render = () => ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/" component={App}/>
        </div>
    </Router>
    ,
    document.getElementById('root')
)
render()