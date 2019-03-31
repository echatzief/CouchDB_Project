import React,{Component} from 'react'
import Navbar from '../Components/Navbar'
import {Avatar, Card,Button,Row,Col,Drawer,Icon,Input} from 'antd';
import reqwest from 'reqwest';
import PropTypes from 'prop-types';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            visibleEditUsername:false,
            visibleEditPassword:false,
            visibleEditEmail:false,
            visibleEditAddress:false,
            inputField:'',
        };

        this.handleSumbit = this.handleSumbit.bind(this);
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

        //Initialize the fields 
        this.props.initializeProps();
    }

    /* Username */
    showDrawerUsername = ()=>{
        this.setState({
            visibleEditUsername: true,
        });
    }
    closeDrawerUsername = ()=>{
        this.setState({
            visibleEditUsername: false,
        });
    }

    /* Password */
    showDrawerPassword = ()=>{
        this.setState({
            visibleEditPassword: true,
        });
    }
    closeDrawerPassword = ()=>{
        this.setState({
            visibleEditPassword: false,
        });
    }
    
    /* Email */
    showDrawerEmail = ()=>{
        this.setState({
            visibleEditEmail: true,
        });
    }
    closeDrawerEmail = ()=>{
        this.setState({
            visibleEditEmail: false,
        });
    }

    /* Address */
    showDrawerAddress = ()=>{
        this.setState({
            visibleEditAddress: true,
        });
    }
    closeDrawerAddress = ()=>{
        this.setState({
            visibleEditAddress: false,
        });
    }

    /* Change the input */
    changeInput = (e)=>{
        this.setState({
            inputField:e.target.value,
        })
    }

    /* Handle the submittion */
    handleSumbit(){
        console.log("State: "+this.state.inputField);

        //Reset the field
        this.setState({
            inputField:'',
        })
    }
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container text-center mt-5 mb-5" style={{width:'50%'}}>
                    <Avatar size={70} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    <Card style={{marginTop:'7%'}}>
                        <Row>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}><p>Username: {this.props.username}</p></Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Button type="primary" size="small" onClick={this.showDrawerUsername}>Edit</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}><p>Password: ******</p></Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Button type="primary" size="small" onClick={this.showDrawerPassword}>Edit</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}><p>E-mail: {this.props.email}</p></Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Button type="primary" size="small" onClick={this.showDrawerEmail}>Edit</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}><p>Address: {this.props.Address}</p></Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                                <Button type="primary" size="small" onClick={this.showDrawerAddress}>Edit</Button>
                            </Col>
                        </Row>
                    </Card>
                    <Drawer
                        title="Change Username"
                        width={720}
                        onClose={this.closeDrawerUsername}
                        visible={this.state.visibleEditUsername}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                    >
                        <div className="container text-center mt-5 mb-5">
                            <Input prefix={<Icon type="user" 
                                style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" 
                                value={this.state.inputField} onChange={this.changeInput}
                            />
                            <div className="mt-5 mb-5">
                                <Button type="primary" onClick={this.handleSumbit}>Change</Button>
                            </div>
                        </div>
                    </Drawer>
                    <Drawer
                        title="Change Password"
                        width={720}
                        onClose={this.closeDrawerPassword}
                        visible={this.state.visibleEditPassword}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                    >
                        <div className="container text-center mt-5 mb-5">
                            <Input prefix={<Icon type="lock" 
                                style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" 
                                value={this.state.inputField} onChange={this.changeInput}
                            />
                            <div className="mt-5 mb-5">
                                <Button type="primary" onClick={this.handleSumbit}>Change</Button>
                            </div>
                        </div>
                    </Drawer>
                    <Drawer
                        title="Change Email"
                        width={720}
                        onClose={this.closeDrawerEmail}
                        visible={this.state.visibleEditEmail}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                    >
                        <div className="container text-center mt-5 mb-5">
                            <Input prefix={<Icon type="mail" 
                                style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" 
                                value={this.state.inputField} onChange={this.changeInput}
                            />
                            <div className="mt-5 mb-5">
                                <Button type="primary" onClick={this.handleSumbit}>Change</Button>
                            </div>
                        </div>
                    </Drawer>
                    <Drawer
                        title="Change Address"
                        width={720}
                        onClose={this.closeDrawerAddress}
                        visible={this.state.visibleEditAddress}
                        style={{
                            overflow: 'auto',
                            height: 'calc(100% - 108px)',
                            paddingBottom: '108px',
                        }}
                    >
                        <div className="container text-center mt-5 mb-5">
                            <Input prefix={<Icon type="home" 
                                style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Address" 
                                value={this.state.inputField} onChange={this.changeInput}
                            />
                            <div className="mt-5 mb-5">
                                <Button type="primary" onClick={this.handleSumbit}>Change</Button>
                            </div>
                        </div>
                    </Drawer>
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