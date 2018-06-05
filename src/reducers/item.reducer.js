import { itemConstants } from '../constants'
const sex = localStorage.getItem('sex');
const initialState = { sex: sex ? sex : "F",kind:2, subkind:"" };

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
        default: return state
    }
}