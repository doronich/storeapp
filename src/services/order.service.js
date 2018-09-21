import axios from 'axios';
import api from '../api';

export const orderService = {
    getAll,
    getOrderItems,
    getUsersOrders,
    removeOrder,
    getOrder,
    updateOrder
}

function getAll() {
    return axios.get(`${api.url}/api/order/orders`);
}

function getOrderItems(id) {
    return axios.get(`${api.url}/api/order/${id}`)
}

function getUsersOrders(id) {
    return axios.get(`${api.url}/api/order/userorders?id=${id}`)
}

function removeOrder(id) {
    return axios.delete(`${api.url}/api/order/${id}`)
}

function getOrder(id) {
    return axios.get(`${api.url}/api/order/order?id=${id}`)
}


function updateOrder(obj) {
    return axios.put(`${api.url}/api/order`, obj)
}
