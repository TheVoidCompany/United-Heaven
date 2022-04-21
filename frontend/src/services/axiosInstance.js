import axios from 'axios';

axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, x-auth-token',
        'x-auth-token': localStorage.getItem('token'),
    }
});

export default axiosClient;