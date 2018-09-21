import { cartConstants } from '../constants'
const initialState = { items: [180, 191, 189] }

export function cart(state = initialState, action) {
    const items = state.items;
    const { data } = action;
    switch (action.type) {
        case cartConstants.ADD_ITEM:
            if (!items.includes(data)) {
                items.push(data)
            }
            return {
                ...state,
                items
            }
        case cartConstants.REMOVE_ITEM:
            items.splice(items.indexOf(data), 1)
            return {
                ...state,
                items
            }
        case cartConstants.CLEAR:
            return {
                ...state,
                items: []
            }
        default:
            return {
                ...state
            }
    }
}