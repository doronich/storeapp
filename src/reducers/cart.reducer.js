import { cartConstants } from '../constants'
const initialState = { items: [] }

export function cart(state = initialState, action) {
    const items = initialState.items;
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            //console.log("add id", action.data)
            items.push(action.data)
            //console.log("ADDED", items)
            return {
                ...state,
                items
            }
        case cartConstants.REMOVE_ITEM:
            //console.log("rem id", action.data)
            items.splice(items.indexOf(action.data), 1)
            //console.log("REMOVED", items)
            return {
                ...state,
                items
            }
        default:
            return {
                ...state
            }
    }
}