import axios from 'axios'
import { history } from '../helpers'

const createAxiosMiddleware = (axios) => ({ dispatch, getState }) => {
    axios.interceptors.response.use(null, (error) => {
        if (!error.response) return;
        if (error.response.status === 401) {
            history.push('/login')
            dispatch({ type: userConstants.LOGOUT })
        }
    })

    return (next) => (action) => next(action)
}

export default createAxiosMiddleware(axios)