import axios from 'axios';
import api from '../api';
import qs from 'querystring'

export const itemService = {
    addItem,
    updateItem,
    getItem,
    getAllItems,
    deleteItem,
    getReqItems,
    getLast,
    getRandom,
    getCartList
}

function addItem(obj) {
    return axios.post(`${api.url}/api/item`, obj)
}

function getItem(id) {
    return axios.get(`${api.url}/api/item/${id}`)
}

function updateItem(obj) {
    return axios.put(`${api.url}/api/item`, obj);
}

function getAllItems() {
    return axios.get(`${api.url}/api/item/all`)
}

function getReqItems(params) {
    return axios.get(`${api.url}/api/item/q`, { params })
}

function deleteItem(id) {
    return axios.delete(`${api.url}/api/item/${id}`)
}

function getLast(n = 5) {
    return axios.get(`${api.url}/api/item/last?amount=${n}`)
}

function getRandom(n = 6) {
    return axios.get(`${api.url}/api/item/random?amount=${n}`)
}

function getCartList(arr) {
    const url = `${api.url}/api/item/cart`;
    return axios.get(`${url}?${qs.stringify({ itemsId: arr })}`);
}