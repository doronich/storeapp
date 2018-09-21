import { favsConstants } from "../constants";

const initState = {
    items: [],
    loaded: true,
    changed: true,
};

export function fav(state = initState, action) {

    switch (action.type) {
        case favsConstants.GET_FAVS_REQUEST:
            return {
                ...state,
                loaded: false
            }
        case favsConstants.GET_FAVS_SUCCESS:
            return {
                ...state,
                items: action.items,
                loaded: true,
                changed: false
            }
        case favsConstants.GET_FAVS_FAILURE:
            return {
                ...state,
                loaded: true
            }
        case favsConstants.DELETE_FAV_SUCCESS:
            const { items } = state;
            const newItems = items.filter(i => i.id !== action.itemId)
            return {
                ...state,
                items: newItems,
                changed: true
            }
        case favsConstants.ADD_FAV_SUCCESS:
            return {
                ...state,
                changed: true
            }
        default:
            return state;
    }
}