// 二次封装
import Axios from 'axios'   //引入axios插件
import configevn from "./evn"
import { Message } from 'element-ui'

// 创建axios实例
const servie = Axios.create({
    // 设置基地址
    baseURL: configevn.prod.baseURL,
    // timeout: 5000
})
// 创建请求拦截器
servie.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 创建响应拦截器
servie.interceptors.response.use(
    (res) => {
        console.log('res::', res)
        const {
            meta: { msg, status: code },
            data: result
        } = res.data
        const successArr = [200, 201, 204]
        if (successArr.includes(code)) {
            Message({
                message: msg,
                type: "success"
            })
            if (res.config.url === "/login") {
                sessionStorage.setItem('token', result.token)
            }
            return result
        }
        Message({
            message: msg,
            type: 'error'
        })
        return Promise.reject(msg)
    }, (error) => {
        return Promise.reject(error)
    }

)
export default servie 