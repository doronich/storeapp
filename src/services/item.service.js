import axios from 'axios';
import api from '../api';

export const itemService = {
    addItem,
    updateItem,
    getItem,
    getAllItems,
    deleteItem,
    getReqItems
}

function addItem(obj){
    const user = getUser();
    return axios.post(`${api.url}/api/item`, obj,user&&{headers:{"Authorization":"Bearer "+user.acces_token}})
}

function getItem(id){
    return axios.get(`${api.url}/api/item/${id}`)
}

function updateItem(obj){
    const user = getUser();
    return axios.put(`${api.url}/api/item`, obj,user&&{headers:{"Authorization":"Bearer "+user.acces_token}});
}

function getAllItems(){
    return axios.get(`${api.url}/api/item/all`)
}

function getReqItems(str){
    
    return axios.get(`${api.url}/api/item/q?${str}`)
}

function getUser(){
    return JSON.parse(localStorage.getItem("user"));
}

function deleteItem(id){
    const user = getUser();
    return axios.delete(`${api.url}/api/item/${id}`,user&&{headers:{"Authorization":"Bearer "+user.acces_token}})
}