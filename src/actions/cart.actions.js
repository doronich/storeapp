import { cartConstants } from '../constants'



const addItemToCart = (item) => ({ type: cartConstants.ADD_ITEM, data: item })
const removeItemFromCart = (item) => ({ type: cartConstants.REMOVE_ITEM, data: item })
const clearCart = () => ({ type: cartConstants.CLEAR })

export const cartAcitons = {
    addItemToCart,
    removeItemFromCart,
    clearCart
}