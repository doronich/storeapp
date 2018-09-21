import axios from 'axios';
import api from '../api';
import { getToken } from '../helpers';

export const userService = {
    login,
    register,
    checkToken,
    getUser,
    changePassword,
    changeUserInfo
}

function changeUserInfo(obj) {
    return axios.put(`${api.url}/api/user/update`, obj)
}

function getUser(username) {
    const config = getToken();
    return axios.get(`${api.url}/api/user/user`, {
        ...config,
        params: {
            username
        },
    })
}

function changePassword(obj) {
    return axios.post(`${api.url}/api/ChangePassword`, obj)
}

function login(username, password) {
    const obj = {
        login: username,
        password: password
    }
    return axios.post(`${api.url}/api/Token`, obj)
        .catch(err => {
            console.log('error', err);
            return err;
        })
        .then(response => {
            if (response) {
                return response.data;
            }

        })
}

function checkToken() {
    return axios.post(`${api.url}/api/checkToken`)
        .then(resp => console.log(resp));
}

function register(creds) {
    return axios.post(`${api.url}/api/Register`, creds)
        .catch(err => {
            console.log('error', err);
            //return err;
        })
        .then(response => {
            if (response) return response.data;

        })

}

