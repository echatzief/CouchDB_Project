import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'


class Navbar extends Component{
    render(){
        return(
            <Menu mode="horizontal" theme="dark">
                <Menu.Item key="shop">
                    <Link to="/"><Icon type="shop" theme="filled" />Restaurants</Link>
                </Menu.Item>
                <Menu.Item key="add">
                    <Link to="/addRestaurant"><Icon type="plus-circle" theme="filled" />Add a Restaurant</Link>
                </Menu.Item>
                <Menu.Item key="personal">
                    <Link to="/personalInfo"><Icon type="info-circle" theme="filled" />Personal Info</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default Navbar;