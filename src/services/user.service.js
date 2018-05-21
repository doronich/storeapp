//import { authHeader } from '../helpers';
import axios from 'axios';
import api from '../api'

export const userService = {
    login,
    logout,
}

function login(username, password){
    /* const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    }; */

    const obj = {
        login: username,
        password: password
    }
    return axios.post(`${api.url}/api/Token`, obj)
        .then(response => {
            
            return response.data;
        })
        .then(user=> {
            if (user && user["acces_token"]){
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
        .catch(err=>{
            console.log('error', err);
        });
}

function logout() {
    localStorage.removeItem('user');
}
//