import axios from 'axios'
import { Notify } from 'vant';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://loaclhost:4000';
}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'http://localhost:4000';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://118.178.235.143:4000';
}
axios.defaults.timeout = 10000;
// 跨域请求可以携带Cookie
axios.defaults.withCredentials = true
// 默认请求方式
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
//请求头上面的token
axios.defaults.headers['token'] = sessionStorage.getItem('token') || ''

axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => res, (err) => {
    console.log('err', err);
})
export default axios