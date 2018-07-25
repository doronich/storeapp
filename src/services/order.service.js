import axios from 'axios';
import api from '../api';

export const orderService = {
    getAll,
    getOrderItems
}

function getAll(){
    const user = getUser();
    return axios.get(`${api.url}/api/order/orders`,{headers:{"Authorization":"Bearer "+user.acces_token}});
}

function getOrderItems(id){
    const user = getUser();
    return axios.get(`${api.url}/api/order/${id}`,{headers:{"Authorization":"Bearer "+user.acces_token}})
}

function getUser(){
    return JSON.parse(localStorage.getItem("user"));
}
