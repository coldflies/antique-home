import axios from 'axios'

axios.defaults.timeout = 30000 //如果30秒内，后台接口无响应，停止请求，并报错

axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data
}, error => {
    if (error.response) {
        // message.error(error.response.message)
    }
})

export default axios