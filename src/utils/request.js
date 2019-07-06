import axios from 'axios'
import { Toast,Indicator } from 'mint-ui';
import config from '../../config.js'
// create an axios instance
const service = axios.create({
  baseURL: config.api, // url = base url + request url
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.msg){
      return Promise.reject(new Error(res.code))
    }
    return res.data
  },
  error => {
    Indicator.close()
    console.log('err' + error) // for debug
    Toast(error);
    return Promise.reject(error)
  }
)

export default service
