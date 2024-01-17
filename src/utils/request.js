import axios from 'axios'

export const baseURL = '/'
const request = axios.create({
  baseURL,
})

request.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  },
)

export default request
