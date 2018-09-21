import axios from 'axios'
import api from '../api'

export const favsService = {
    getFavs,
    deleteFav,
    addFav,
    getFavIds
}

function getFavs(id) {
    return axios.get(`${api.url}/api/favitem?userid=${id}`)
}

function deleteFav(userId, itemId) {
    return axios.delete(`${api.url}/api/favitem`, {
        params: {
            userId,
            itemId
        }
    })
}

function addFav(userId, itemId) {
    return axios.post(`${api.url}/api/favitem`, {
        userId,
        itemId
    })
}

function getFavIds(id) {
    return axios.get(`${api.url}/api/favitem/ids?userid=${id}`)
}