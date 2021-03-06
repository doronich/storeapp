import { userConstants } from '../constants'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = { loggedIn: user ? true : false, currentUser: user, inProgress: false };

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