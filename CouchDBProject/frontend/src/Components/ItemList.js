import React,{Component} from 'react';
import {List, Button} from 'antd';
import PropTypes from 'prop-types'

class ItemList extends Component{

    componentWillMount(){

        //Initialize the data before the page loads
        if(this.props.initLoading){
            this.props.initialLoad(this.props.numOfPages,this.props.history);
        }
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
                        <h1>{item.restaurantName}</h1>
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
}
export default ItemList;