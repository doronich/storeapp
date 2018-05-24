import axios from 'axios';
import api from '../api'

export const userService = {
    login,
    register,
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

function register(creds) {
    return axios.post(`${api.url}/api/Register`, creds)
        .catch(err => {
            console.log('error', err);
            return err;
        })
        .then(response => {
            return response.data;
        })

}

