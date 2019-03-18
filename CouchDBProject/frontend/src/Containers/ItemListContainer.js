import { connect } from 'react-redux';
import ItemList from '../Components/ItemList';
import reqwest from 'reqwest';
import {changeRestaurantList} from '../Actions/index';
import {changeInitLoading} from '../Actions/index';
import {changeLoading} from '../Actions/index';


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

function initializeAtStart(dispatch){
    reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
            console.log(res)
            
            //Change initLoading to false
            dispatch(changeInitLoading())

            //Initialize the data
            dispatch(changeRestaurantList(res.results))
        },
      });
}

function loadMoreData(dispatch,old_data){
    
    reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
            const data = old_data.concat(res.results);
            
            //Change loading to true
            dispatch(changeLoading())

            //Render new data 
            dispatch(changeRestaurantList(data))

            //Change loading to false
            dispatch(changeLoading())
        },
    });
}
const mapStateToProps =(state) => ({
    initLoading:state.initLoading,
    loading:state.loading,
    list:state.list,
})
const mapDispatchToProps = (dispatch) => ({
    initialLoad: ()=>initializeAtStart(dispatch),
    onLoadMore:(old_data)=>loadMoreData(dispatch,old_data),
})

export default connect(mapStateToProps,mapDispatchToProps)(ItemList)