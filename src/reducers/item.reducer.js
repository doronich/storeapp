import { itemConstants } from '../constants'
const sex = localStorage.getItem('sex');

const initialState = {
    sex: sex ? sex : "F",
    kind: "none",
    subkind: "none",
    brand: "none",
    color: "none",
    priceEnd: 250,
    priceStart: 0,
    name: "",
    items: [],
    total: 0,
    hasNext: false,
    hasPrev: false,
    index: 0,
    loading: false,
    request: {

    }
};

export function item(state = initialState, action) {
    switch (action.type) {
        case itemConstants.FEMALE:
            localStorage.setItem('sex', "F");
            return {
                ...state,
                sex: "F"
            }
        case itemConstants.MALE:
            localStorage.setItem('sex', "M");
            return {
                ...state,
                sex: "M"
            }
        case itemConstants.NAME:
            return {
                ...state,
                name: action.name
            }
        case itemConstants.KIND:
            return {
                ...state,
                kind: action.kind
            }
        case itemConstants.SUBKIND:
            return {
                ...state,
                subkind: action.subkind
            }
        case itemConstants.BRAND:
            return {
                ...state,
                brand: action.brand
            }
        case itemConstants.COLOR:
            return {
                ...state,
                color: action.color
            }
        case itemConstants.PRICESTART:
            return {
                ...state,
                priceStart: action.priceStart
            }
        case itemConstants.PRICEEND:
            return {
                ...state,
                priceEnd: action.priceEnd
            }
        case itemConstants.RESET:
            return {
                ...state,
                kind: "none",
                subkind: "none",
                brand: "none",
                color: "none",
                priceEnd: 250,
                priceStart: 0,
                name: ""
            }
        case itemConstants.SET_CURRENCY:
            return {
                ...state,
                currency: action.data
            }
        case itemConstants.GET_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case itemConstants.GET_ITEMS_SUCCESS:
            console.log(action.data)
            return {
                ...state,
                loading: false,
                hasNext: action.data.hasNext,
                hasPrev: action.data.hasPrev,
                index: action.data.index,
                total: action.data.total,
                items: action.data.res
            }
        case itemConstants.GET_ITEMS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case itemConstants.CHANGE_PROP:
            return {
                ...state,
                [action.name]: action.value
            }

        default: return state
    }
}