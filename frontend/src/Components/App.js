import React,{Component} from 'react'
import Navbar from './Navbar'
import ItemListContainer from '../Containers/ItemListContainer';
import reqwest from 'reqwest';

class App extends Component{

    componentWillMount(){

        /* Authentication checking */
        if(sessionStorage.getItem('token')!= null){
            
            var tok = sessionStorage.getItem('token');
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
            </div>
        )
    }
}

export default App