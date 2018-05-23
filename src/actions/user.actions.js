import { userConstants } from '../constants'
import { userService} from '../services'
//import { alertActions } from './'
import { history } from '../helpers'

export const userActions = {
    login,
    logout,
    register
}

function login(username, password){
    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(user =>{
                dispatch(success(user));
                history.push('/');
            },
            error => {
                console.log('failure');
                dispatch(failure(error));
            }
        )
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }}
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(creds){
    return dispatch => {
        dispatch(request(creds));

        userService.register(creds)
            .then( user => {
                console.log('success');
                dispatch(success(user));
                history.push('/');
            },
            error => {
                console.log('failure');
                dispatch(failure(error));
                //dispatch(alertActions.error(error));
            }
        )
    }

    function request(user) { return {type:userConstants.REGISTER_REQUEST, user}}
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout(){
    userService.logout();
    return { type: userConstants.LOGOUT };
}
