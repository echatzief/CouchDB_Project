import React,{Component} from 'react'
import Navbar from '../Components/Navbar'
import {Form, Input,Slider, Cascader, Button,Select} from 'antd';
import reqwest from 'reqwest';
const cities =[{
    value:'Volos',
    label:'Volos',
},{
    value:'Athens',
    label:'Athens',
},{
    value:'Thessaloniki',
    label:'Thessaloniki',
},{
    value:'Larissa',
    label:'Larissa',
},{
    value:'Giannena',
    label:'Giannena',
},]

const categories =[{
    value:'Chinese',
    label:'Chinese',
},{
    value:'Coffee',
    label:'Coffee',
},{
    value:'Burgers',
    label:'Burgers',
},{
    value:'Pizza',
    label:'Pizza',
},]
class AddRestaurant extends Component{
    constructor(props){
        super(props)
        this.state={
            select:'10 min',
        }
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
    handleSelect = (value)=>{
        this.setState({
            select:value.label,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var restaurant={
                    restaurantName:values.restaurantName,
                    Address:values.Address,
                    phone:values.phone,
                    priceRange:values.priceRange,
                    city:values.city[0],
                    category:values.category[0],
                    estimatedDeliveryTime:this.state.select,
                }
                console.log(this.state.select)
                console.log(restaurant)
                var tok = sessionStorage.getItem('token');
                reqwest({
                    url: '/addNewRestaurant',
                    method: 'post',
                    data:{restaurant:restaurant,token:tok},
                    success: (res) => {
                        console.log(res)
                        if(res.status === 200 ){
                            console.log("Successfully Added.")
                            window.location.reload();
                        }
                        else  if(res.status === 204 ){
                            console.log("Wrong token")
                            /* If not authenticated go to login */
                            this.props.history.push('/login');
                        }
                        else{
                            console.log("Restaurant already exists!!!")
                        }
                    },
                });
            }
        });
    }
    checkIfNumber = (rule, value, callback)=>{

        var isNumber =  !/\D/.test(value);

        if (value && !isNumber) {
            callback('Enter a numeric value!');
        } else {
            callback();
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Navbar/>
                <div className="container text-center mt-5 mb-5" style={{width:'50%'}}>
                    <h1>Enter a new Restaurant</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="Restaurant : ">
                            {getFieldDecorator('restaurantName', {
                                rules: [{
                                    required: true, message: 'Please input your restaurant name!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Address : ">
                            {getFieldDecorator('Address', {
                                rules: [{
                                    required: true, message: 'Please input your address!',
                                }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' },{
                                    validator: this.checkIfNumber,
                                }],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label="City : ">
                            {getFieldDecorator('city', {
                                initialValue: ['Volos'],
                                rules: [{ type: 'array', required: true, message: 'Please select your city!' }],
                            })(
                                <Cascader options={cities} />
                            )}
                        </Form.Item>
                        <Form.Item label="Category : ">
                            {getFieldDecorator('category', {
                                initialValue: ['Coffee'],
                                rules: [{ type: 'array', required: true, message: 'Please select your category!' }],
                            })(
                                <Cascader options={categories} />
                            )}
                        </Form.Item>
                        <Form.Item label="Price Range : ">
                            {getFieldDecorator('priceRange')(
                                <Slider marks={{25: '0 - 25 $', 50: '26 - 50 $', 75: '51 - 75 $', 100: 'Expensive'}}/>
                            )}
                        </Form.Item>
                        <Form.Item label="Estimated Delivery Time : ">
                            <Select labelInValue defaultValue={{ key: '10' }} style={{ width: 120 }} onChange={this.handleSelect}>
                                <Select.Option value="10">10 min</Select.Option>
                                <Select.Option value="20">20 min</Select.Option>
                                <Select.Option value="30">30 min</Select.Option>
                                <Select.Option value="40">40 min</Select.Option>
                            </Select>,           
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        </Form>
                </div>
            </div>
        )
    }
}

const WrappedAddRestaurant = Form.create()(AddRestaurant);
export default WrappedAddRestaurant;