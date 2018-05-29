import axios from 'axios';
import api from '../api';

export const itemService = {
    addItem,
}

function addItem(obj){
    const user = JSON.parse(localStorage.getItem("user"));
    return axios.post(`${api.url}/api/item`, obj,user&&{headers:{"Authorization":"Bearer "+user.acces_token}});

}
