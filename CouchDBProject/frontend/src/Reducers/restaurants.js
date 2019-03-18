const restaurants =(state={initLoading:true,loading:false,list:[]},action) =>{
    switch(action.type){
        case 'CHANGE_INIT_LOADING':
            return{
                ...state,
                initLoading:!state.initLoading,
            }
        case 'CHANGE_LOADING':
            return{
                ...state,
                loading:!state.loading,
            }
        case 'CHANGE_RESTAURANT_LIST':
            return{
                ...state,
                list:action.list,
            }
        default:
            return state;
    }
}
export default restaurants