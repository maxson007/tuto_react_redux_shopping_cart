import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:"https://storage.googleapis.com/dukalangu-4c375.appspot.com/images/products/5ec3afa79528e_5eacf125bdb45_art-cultulre-tourisme-aux-comores-2000x1250.jpg"},
        {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: "https://raw.githubusercontent.com/AyaBellazreg/React-Shopping-Cart/master/Shopping-Cart/src/images/item2.jpg"},
        {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: "https://raw.githubusercontent.com/AyaBellazreg/React-Shopping-Cart/master/Shopping-Cart/src/images/item3.jpg"},
        {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:"https://raw.githubusercontent.com/AyaBellazreg/React-Shopping-Cart/master/Shopping-Cart/src/images/item4.jpg"},
        {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: "https://raw.githubusercontent.com/AyaBellazreg/React-Shopping-Cart/master/Shopping-Cart/src/images/item5.jpg"},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: "https://raw.githubusercontent.com/AyaBellazreg/React-Shopping-Cart/master/Shopping-Cart/src/images/item6.jpg"}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{

    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item= state.addedItems.find(item=> action.id === item.id)
        if(existed_item)
        {
            addedItem.quantity += 1
            return{
                ...state,
                total: state.total + addedItem.price
            }
        }
        else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }

        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return{
            ...state,
            total: newTotal
        }
    }
    if(action.type=== SUB_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }

    }
    return state
}

export default cartReducer
