import { itemConstants } from '../constants'

const initialState = {sex:"F" };

export function item(state=initialState,action){
    switch(action.type){
        case itemConstants.FEMALE:
            return{
                ...state,
                sex:"F"
            }
        case itemConstants.MALE:
            return{
                ...state,
                sex:"M"
            }
        default: return state
    }
}