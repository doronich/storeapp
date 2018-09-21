import axios from 'axios'
import api from '../api';

export const cartService = {
    order,
    checkForCode
}

function checkForCode(code) {
    return axios.get(`${api.url}/api/order/checkcode`, {
        params: {
            code
        }
    })
}

function order(obj) {
    return axios.post(`${api.url}/api/order`, obj);
}