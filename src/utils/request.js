import axios from 'axios'

export const baseURL = 'http://120.76.192.186:8080/';
const request = axios.create({
    baseURL,
});

request.interceptors.response.use( res => {
    console.log(res);
    return res.data;
},err => {
    return Promise.reject(err);
})

export default request;