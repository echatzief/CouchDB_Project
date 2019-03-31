const profile =(state={email:'',username:'',Address:''},action) =>{
    switch(action.type){
        case 'CHANGE_EMAIL':
            return{
                ...state,
                email:action.email,
            }
        case 'CHANGE_USERNAME':
            return{
                ...state,
                username:action.username,
            }
        case 'CHANGE_ADDRESS':
            return{
                ...state,
                Address:action.Address,
            }
        case 'CHANGE_PROFILE':
            return{
                ...state,
                email:action.email,
                username:action.username,
                Address:action.Address,
            }
        default:
            return state;
    }
}
export default profile;