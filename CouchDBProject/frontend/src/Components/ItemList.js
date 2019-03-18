import React,{Component} from 'react';
import {List, Avatar, Button, Skeleton,} from 'antd';
import PropTypes from 'prop-types'

class ItemList extends Component{

    componentWillMount(){

        //Initialize the data before the page loads
        if(this.props.initLoading){
            this.props.initialLoad();
        }
    }
    
    render(){
        const { initLoading, loading, list } = this.props;

        const loadMore = !initLoading && !loading ? (
            <div style={{
              textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
              <Button onClick={()=>this.props.onLoadMore(list)}>loading more</Button>
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
                    <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                        <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                        </Skeleton>
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
}
export default ItemList;