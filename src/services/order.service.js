import axios from 'axios';
import api from '../api';

export const orderService = {
    getAll
}

function getAll(){
    const user = getUser();
    return axios.get(`${api.url}/api/order`,{headers:{"Authorization":"Bearer "+user.acces_token}});
}

function getUser(){
    return JSON.parse(localStorage.getItem("user"));
}