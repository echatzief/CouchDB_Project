//Change Init loading
export const changeInitLoading = ()=>({
    type:'CHANGE_INIT_LOADING',
})

//Change Loading
export const changeLoading = ()=>({
    type:'CHANGE_LOADING',
})

//Add a new restaurant
export const addRestaurant = ()=>({
    type:'ADD_RESTAURANT',
})

//Change the list of restaurants
export const changeRestaurantList = (list)=>({
    type:'CHANGE_RESTAURANT_LIST',
    list:list,
})