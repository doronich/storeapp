import { itemConstants } from '../constants'
const sex = localStorage.getItem('sex');
const initialState = { sex: sex ? sex : "F", kind: "none", subkind: "none", brand: "none", color: "none", priceEnd: 500, priceStart: 0, name:"" };

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
                name:action.name
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
                priceEnd: 300,
                priceStart: 0,
                name:""
            }
        default: return state
    }
}