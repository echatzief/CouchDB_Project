import React,{Component} from 'react'
import Navbar from './Navbar'
import {store} from '../index'
import {changeInitLoading} from '../Actions/index'
import ItemListContainer from '../Containers/ItemListContainer';
import reqwest from 'reqwest';

class App extends Component{

    func = ()=>{
        console.log(store.getState())
    }
    change = ()=>{
        store.dispatch(changeInitLoading())
    }

    componentWillMount(){

        /* Authentication checking */
        if(sessionStorage.getItem('token')!= null){
            
            var tok = sessionStorage.getItem('token');
            console.log(tok)
            reqwest({
                url: '/checkToken',
                method: 'post',
                data:{token:tok},
                success: (res) => {
                    if(res.status === 204){
                        /* If not authenticated go to login */
                        this.props.history.push('/login');
                    }
                },
            });
        }
        else{
            /* If not authenticated go to login */
            this.props.history.push('/login');
        }
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