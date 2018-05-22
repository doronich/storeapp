import { userConstants } from '../constants'
import { userActions } from '../actions';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user} : {};

export function authentication(state = initialState, action){
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
                //user: action.user
            };
        case userConstants.REGISTER_REQUEST:
            return {
                loggingIn: true,
                //user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
                error:false
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
                error:false
            };
        case userConstants.LOGIN_FAILURE:
            return {
                error:true
            };
        case userConstants.REGISTER_FAILURE:
            return {
                error:true
            };
        case userConstants.LOGOUT: 
            return {};
        default:
            return state;
    }
}