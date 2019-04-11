import React,{Component} from 'react';
import {List, Button} from 'antd';
import PropTypes from 'prop-types'
import reqwest from 'reqwest';
import { Rate } from 'antd';
import { Collapse } from 'antd';


const itemStyle={
    paddingTop:'2%',
    paddingBottom:'2%',
    border:'2px solid black',
    borderRadius:'10px',
}
class ItemList extends Component{

    constructor(props){
        super(props)
        this.changeRateAndPost = this.changeRateAndPost.bind(this)
        this.state={
            rateVal:0,
        }
    }
    componentWillMount(){

        /* Initialize the data before the page loads */
        if(this.props.initLoading){
            this.props.initialLoad(this.props.numOfPages,this.props.history);
        }

        /* Initialize the profile details */
        this.props.initializeProps(this.props.history)
    }

    /* Change the rating and send the request */
    changeRateAndPost(val,rest){

        var tok = sessionStorage.getItem('token');
        this.setState({
            rateVal:val,
        },()=>{

            reqwest({
                url: '/rateRestaurant',
                method: 'post',
                data:{restaurantName:rest,token:tok,username:this.props.username,rate:this.state.rateVal},
                success: (res) => {
        
                    if(res.status === 200){
                        window.location.reload();
                    }
                },
            });
        })  
    }

    render(){
        const { initLoading, loading, list } = this.props;

        const loadMore = !initLoading && !loading ? (
            <div style={{
              textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
              <Button onClick={()=>this.props.onLoadMore(list,this.props.numOfPages,this.props.history)}>loading more</Button>
            </div>
        ) : null;

        return(
            <div className="container text-center mt-5">
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <div className="container" style={itemStyle}>
                            <div className="row">
                                <div className="col-sm">
                                    <h1>{item.restaurantName}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{item.category}</h2>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm">
                                    <h3>Τοποθεσία</h3>
                                </div>
                                <div className="col-sm">
                                    <h3>Χρόνος Παράδοσης</h3>
                                </div>
                                <div className="col-sm">
                                    <h3>Τηλέφωνο</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <h3>{item.city}</h3>
                                </div>
                                <div className="col-sm">
                                    <h3>{item.estimatedDeliveryTime}</h3>
                                </div>
                                <div className="col-sm">
                                    <h3>{item.phone}</h3>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm">
                                    <h3>Εύρος Τιμών</h3>
                                </div>
                                <div className="col-sm">
                                    <h3>Διεύθυνση</h3>
                                </div>
                                <div className="col-sm">
                                   
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <h3>{item.priceRange}</h3>
                                </div>
                                <div className="col-sm">
                                    <h3>{item.Address}</h3>
                                </div>
                                <div className="col-sm">
                                    <Rate value={this.state.rateVal} onChange={(val)=>this.changeRateAndPost(val,item.restaurantName)}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm">
                                    <Collapse accordion>
                                        <Collapse.Panel header="Rating Details">
                                            {item.rating.map(it => <p>{it.username} : {it.rate}</p>)}
                                        </Collapse.Panel>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            /> 
            </div>   
        )
    }
}

ItemList.propTypes={
    initLoading:PropTypes.bool.isRequired,
    loading:PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    initialLoad: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    numOfPages:PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Address: PropTypes.string.isRequired,
    initializeProps:PropTypes.func.isRequired,
}
export default ItemList;