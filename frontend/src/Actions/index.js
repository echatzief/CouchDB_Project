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

//Increase the page number
export const increasePageNumber=()=>({
    type:'INCREASE_PAGE',
})

//Change username 
export const changeUsername = (username)=>({
    type:'CHANGE_USERNAME',
    username:username,
})

//Change Address
export const changeAddress = (Address)=>({
    type:'CHANGE_ADDRESS',
    Address:Address,
})

//Change email
export const changeEmail = (email)=>({
    type:'CHANGE_EMAIL',
    email:email,
})

//Change profile
export const changeProfile = (email,username,Address)=>({
    type:'CHANGE_PROFILE',
    email:email,
    username:username,
    Address:Address,
})