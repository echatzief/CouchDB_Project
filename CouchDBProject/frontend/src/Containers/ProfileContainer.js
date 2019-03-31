import { connect } from 'react-redux';
import Profile from '../Components/Profile';
import {changeProfile} from '../Actions/index';
import reqwest from 'reqwest';

function initProps(dispatch){

    var tok = sessionStorage.getItem('token');
    reqwest({
        url: '/getPersonalInfoForUser',
        type: 'json',
        method: 'post',
        data:{token:tok},
        success: (res) => {
            if(res.status === 200){
                console.log(res)
                console.log(changeProfile(res.userDetails.email,res.userDetails.username,res.userDetails.Address))
                dispatch(changeProfile(res.userDetails.email,res.userDetails.username,res.userDetails.Address))
                console.log("SUCCESSFULLY.")
            }
            else if(res.status === 204){
                console.log("TOKEN IS NOT VALID.")
            }
        }
    });
}
const mapStateToProps =(state) => ({
    username: state.profile.username,
    email: state.profile.email,
    Address: state.profile.Address,
})
const mapDispatchToProps = (dispatch) => ({
    initializeProps: ()=>initProps(dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Profile)