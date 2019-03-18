import React,{Component} from 'react'
import Navbar from './Navbar'
import {store} from '../index'
import {changeInitLoading} from '../Actions/index'
import ItemListContainer from '../Containers/ItemListContainer';

class App extends Component{

    func = ()=>{
        console.log(store.getState())
    }
    change = ()=>{
        store.dispatch(changeInitLoading())
    }
    render(){
        return(
            <div>
                <Navbar/>
                <ItemListContainer/>
                <button onClick={this.func}>Store</button>
                <button onClick={this.change}>Change</button>
            </div>
        )
    }
}

export default App