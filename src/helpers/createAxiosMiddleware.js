import { userConstants } from '../constants/user.constants'
import axios from 'axios'

const createAxiosMiddleware = (axios) => ({ dispatch, getState }) => {
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            dispatch({ type: userConstants.LOGOUT })
        }
    })

    return (next) => (action) => next(action)
}

export default createAxiosMiddleware(axios)