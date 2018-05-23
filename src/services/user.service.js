//import { authHeader } from '../helpers';
import axios from 'axios';
import api from '../api'

export const userService = {
    login,
    logout,
    register,
}

function login(username, password){
    const obj = {
        login: username,
        password: password
    }
    return axios.post(`${api.url}/api/Token`, obj)
        .catch(err=>{
            console.log('error', err);
        })
        .then(response => {
            
            return response.data;
        })
        .then(user=> {
            if (user && user["acces_token"]){
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
        
}

function register(creds){
    return axios.post(`${api.url}/api/Register`, creds)
        .catch(err=>{
            console.log('error', err);
        })
        .then(response => {    
            return response.data;
        })
        .then(user=> {
            if (user && user["acces_token"]){
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}
