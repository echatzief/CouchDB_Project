import { connect } from 'react-redux';
import ItemList from '../Components/ItemList';
import reqwest from 'reqwest';
import {changeRestaurantList} from '../Actions/index';
import {changeInitLoading} from '../Actions/index';
import {increasePageNumber} from '../Actions/index'
import {changeLoading} from '../Actions/index';


function initializeAtStart(dispatch,numOfPages,history){

    console.log("Num Of Pages:"+numOfPages);
    var tok = sessionStorage.getItem('token');
    console.log(tok)
    reqwest({
        url: '/getRestaurants',
        type: 'json',
        method: 'post',
        data:{numOfPages:numOfPages,token:tok},
        success: (res) => {

            if(res.status === 200){
                console.log(res)
            
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

function loadMoreData(dispatch,old_data,numOfPages,history,loading){
    console.log("Num Of Pages:"+numOfPages);

    var tok = sessionStorage.getItem('token');
    console.log(tok)
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

                    console.log("LOADING FALSE");
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
    initLoading:state.initLoading,
    loading:state.loading,
    list:state.list,
    numOfPages:state.numOfPages,
})
const mapDispatchToProps = (dispatch) => ({
    initialLoad: (numOfPages,history)=>initializeAtStart(dispatch,numOfPages,history),
    onLoadMore:(old_data,numOfPages,history,loading)=>loadMoreData(dispatch,old_data,numOfPages,history,loading),
})

export default connect(mapStateToProps,mapDispatchToProps)(ItemList)