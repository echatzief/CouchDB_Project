import React,{Component} from 'react'
import {Form, Input,Button,Icon,Modal} from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import reqwest from 'reqwest';

const { Title } = Typography;

function info() {
    Modal.error({
        title: 'Credentials Error',
        content: 'Choose other credentials.',
    });
}

class SignUp extends Component{

    constructor(props){
        super(props)
        this.state={
            confirmDirty: false,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            reqwest({
                url: '/createUser',
                method: 'post',
                data:{user:values},
                success: (res) => {
                    if(res.status === 200){
                       this.props.history.push('/login');
                    }
                    else{
                        info()
                    }
                },
            });
          }
        });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="container text-center" style={{marginTop:'2%',width:'50%'}}>
                <Title>Sign Up</Title>
                <Form  onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [{
                                type:'email',message: 'The input is not valid E-mail!',
                            },{ 
                                required: true, message: 'Please input your E-mail!' }],
                             })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Password">
                        {getFieldDecorator('password', {
                            rules: [{
                            required: true, message: 'Please input your password!',
                            }],
                        })(
                            <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Confirm Password">
                        {getFieldDecorator('confirm_pass', {
                            rules: [{
                            required: true, message: 'Please input your password!',
                            },{
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                        )}
                    </Form.Item>
                    <Form.Item label="Username">
                        {getFieldDecorator('username', {
                            rules: [{ 
                                required: true, message: 'Please input your Username!' }],
                             })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                        )}
                    </Form.Item>
                    <Form.Item label="Address">
                        {getFieldDecorator('Address', {
                            rules: [{ 
                                required: true, message: 'Please input your Username!' }],
                             })(
                            <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form>
            </div>
        )
    }
}

const WrappedSignUp = Form.create({ name: 'normal_login' })(SignUp);
export default WrappedSignUp