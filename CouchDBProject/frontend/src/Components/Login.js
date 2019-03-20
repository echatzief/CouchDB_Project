import React,{Component} from 'react'
import { Form, Icon, Input, Button,Modal} from 'antd';
import 'antd/dist/antd.css';
import { Typography } from 'antd';
import reqwest from 'reqwest';

const { Title } = Typography;

function info() {
    Modal.error({
        title: 'Wrong authentication',
        content: 'Enter correct credentials to login.',
    });
}
class Login extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            
            reqwest({
                url: '/authenticateUser',
                method: 'post',
                data:{user:values},
                success: (res) => {
                    console.log("User wanna login.");
                    console.log(res);
                    if(res.status == 'OK'){

                        /* Save the token to use it for the authentication */
                        
                        /* Redirect to homepage */
                        this.props.history.push('/');
                    }
                    else{
                        info()
                    }
                },
            });
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="container text-center" style={{marginTop:'10%',width:'50%'}}>
                <Title>Login</Title>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <span>  Or <a href="/signUp"> register now!</a> </span>
                    </Form.Item>
                </Form>
        </div>
        )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm