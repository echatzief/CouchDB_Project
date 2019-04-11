import { connect } from 'react-redux';
import Profile from '../Components/Profile';
import {changeProfile} from '../Actions/index';
import reqwest from 'reqwest';

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
                history.push('/login')
            }
        }
    });
}
function changeFields(dispatch,username,email,Address){
    dispatch(changeProfile(email,username,Address));
}
const mapStateToProps =(state) => ({
    username: state.profile.username,
    email: state.profile.email,
    Address: state.profile.Address,
})
const mapDispatchToProps = (dispatch) => ({
    initializeProps: (history)=>initProps(dispatch,history),
    changeFields: (username,email,Address)=>changeFields(dispatch,username,email,Address)
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)