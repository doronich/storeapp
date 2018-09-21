import Axios from 'axios';
import { history } from '../helpers';

Axios.interceptors.response.use(null, (error) => {
    if (error.response && error.response.status === 401) {
        history.push('/login')
        return Promise.reject(error);
    }
    return Promise.reject(error);
})

const createSetAuthInterceptor = () => config => {
    const options = getOptions();
    if (options && options.access_token) {
        config.headers.Authorization = options.access_token;
    } else {
        config.headers.Authorization = null;
    }
    return config;
}

const setAuthCb = createSetAuthInterceptor()

function getOptions() {
    return JSON.parse(localStorage.getItem('user'))
}

Axios.interceptors.request.use(setAuthCb)