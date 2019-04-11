import { connect } from 'react-redux';
import ItemList from '../Components/ItemList';
import reqwest from 'reqwest';
import {changeRestaurantList} from '../Actions/index';
import {changeInitLoading} from '../Actions/index';
import {increasePageNumber} from '../Actions/index'
import {changeLoading} from '../Actions/index';
import {changeProfile} from '../Actions/index';

function initProps(dispatch,history){

    var tok = sessionStorage.getItem('token');
    reqwest({
        url: '/getPersonalInfoForUser',
        type: 'json',
        method: 'post',
        data:{token:tok},
        success: (res) => {
            if(res.status === 200){
                dispatch(changeProfile(res.userDetails.email,res.userDetails.username,res.userDetails.Address))
            }
            else if(res.status === 204){
                history.push('/login');
            }
        }
    });
}

function initializeAtStart(dispatch,numOfPages,history){

    var tok = sessionStorage.getItem('token');
    reqwest({
        url: '/getRestaurants',
        type: 'json',
        method: 'post',
        data:{numOfPages:numOfPages,token:tok},
        success: (res) => {

            if(res.status === 200){
            
                //Change initLoading to false
                dispatch(changeInitLoading())
    
                //Initialize the data
                dispatch(changeRestaurantList(res.results))

                //Increase the page number
                dispatch(increasePageNumber())
            }
            else if(res.status === 204){
                history.push('/login');
            }
        },
    });
}

function loadMoreData(dispatch,old_data,numOfPages,history){

    var tok = sessionStorage.getItem('token');
    reqwest({
        url: '/getRestaurants',
        type: 'json',
        method: 'post',
        data:{numOfPages:numOfPages,token:tok},
        success: (res) => {

            if(res.status === 200){
                const data = old_data.concat(res.results);
                
                //If no result then remove the button
                if(res.results.length===0){

                    //Change loading to false
                    dispatch(changeLoading())
                }
                //Change loading to true
                dispatch(changeLoading())

                //Render new data 
                dispatch(changeRestaurantList(data))

                //Change loading to false
                dispatch(changeLoading())

                //Increase the page number
                dispatch(increasePageNumber())
            }
            else if(res.status === 204){
                history.push('/login');
            }
        },
    });
}
const mapStateToProps =(state) => ({
    initLoading:state.restaurants.initLoading,
    loading:state.restaurants.loading,
    list:state.restaurants.list,
    numOfPages:state.restaurants.numOfPages,
    username: state.profile.username,
    email: state.profile.email,
    Address: state.profile.Address,
})
const mapDispatchToProps = (dispatch) => ({
    initialLoad: (numOfPages,history)=>initializeAtStart(dispatch,numOfPages,history),
    onLoadMore:(old_data,numOfPages,history)=>loadMoreData(dispatch,old_data,numOfPages,history),
    initializeProps: (history)=>initProps(dispatch,history),
})

export default connect(mapStateToProps,mapDispatchToProps)(ItemList)