import { userConstants } from '../constants'
//import { userActions } from '../actions';
//import { userService } from '../services/'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = { loggedIn: user ? true : false, currentUser: user, token: null, inProgress: false };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN:
        case userConstants.REGISTER:

            return {
                ...state,
                inProgress: true
            }
        case userConstants.SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.user));
            return {
                ...state,
                loggedIn: true,
                inProgress: false,
                currentUser: action.user
            }
        case userConstants.ERROR:
            return {
                ...state,
                inProgress: false,
            }
        case userConstants.LOGOUT:
            localStorage.removeItem('user')
            return {
                ...state,
                loggedIn: false,
                currentUser: null
            };
        default:
            return state;
    }
}