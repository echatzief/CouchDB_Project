import React,{Component} from 'react'
import Navbar from '../Components/Navbar'
import {Avatar, Card} from 'antd';
import reqwest from 'reqwest';
import PropTypes from 'prop-types';

class Profile extends Component{

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

        //Initialize the fields 
        this.props.initializeProps();
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container text-center mt-5 mb-5" style={{width:'50%'}}>
                    <Avatar size={70} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    <Card style={{marginTop:'7%'}}>
                        <p>Username: {this.props.username}</p>
                        <p>Password: ******</p>
                        <p>E-mail: {this.props.email}</p>
                        <p>Address: {this.props.Address}</p>
                    </Card>
                </div>
            </div>
        )
    }
}

Profile.propTypes={
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
    initializeProps:PropTypes.func.isRequired,
}

export default Profile;