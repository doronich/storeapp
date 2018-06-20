import axios from 'axios'
import api from '../api';

export const cartService = {
    order
}

function order(obj){
    return axios.post(`${api.url}/api/order`, obj);
}