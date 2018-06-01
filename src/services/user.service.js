import axios from 'axios';
import api from '../api';

export const userService = {
    login,
    register,
    checkToken
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
            return response.data;
        })
}

function checkToken(){
    const user = JSON.parse(localStorage.getItem('user'))
    return axios.post(`${api.url}/api/checkToken`, user?user.username:"da", user&&{headers:{"Authorization":"Bearer "+user.acces_token}});
}

function register(creds) {
    return axios.post(`${api.url}/api/Register`, creds)
        .catch(err => {
            console.log('error', err);
            //return err;
        })
        .then(response => {
            return response.data;
        })

}

