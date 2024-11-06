class InterceptorsMange {
    constructor() {
        this.handlers = []
    }

    use(fullfiled, rejected) {
        this.handlers.push({
            fullfiled,
            rejected,
        })
    }
}

class Axios {
    constructor() {
        this.interceptors = {
            request: new InterceptorsMange(),
            response: new InterceptorsMange(),
        }
    }

    request(config) {
        // 拦截器函数
        const chain = [this.sendAjax.bind(this), undefined] // 队列

        // 请求拦截
        this.interceptors.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fullfiled, interceptor.rejected)
        })

        // 响应拦截
        this.interceptors.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fullfiled, interceptor.rejected)
        })

        // 执行队列
        let promise = Promise.resolve(config)
        while (chain.length > 0) {
            promise = promise.then(chain.shift(), chain.shift())
        }
        return promise
    }

    sendAjax(config) {
        return new Promise(resolve => {
            const { url = '', method = 'get', data = {} } = config
            // 发送ajax
            const xhr = new XMLHttpRequest()
            xhr.open(method, url, true)
            xhr.onload = function () {
                console.log(xhr.responseText)
                resolve(xhr.responseText)
            }
            xhr.send(data)
        })
    }
}

const methodsArr = ['get', 'post', 'delete', 'head', 'put', 'options', 'patch']
methodsArr.forEach(met => {
    Axios.prototype[met] = function () {
        // 处理单个方法
        if (['get', 'delete', 'head', 'options'].includes(met)) {
            // 2个参数
            return this.request({
                method: met,
                url: arguments[0],
                ...(arguments[1] || {}),
            })
        }
        // 3个参数
        return this.request({
            method: met,
            url: arguments[0],
            data: arguments[1] || {},
            ...(arguments[2] || {}),
        })
    }
})

const utils = {
    extend(a, b, context) {
        for (const key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context)
                } else {
                    a[key] = b[key]
                }
            }
        }
    },
}

function CreateAxiosFn() {
    const axios = new Axios()
    const req = axios.request.bind(axios)
    utils.extend(req, Axios.prototype, axios)
    utils.extend(req, axios)
    return req
}

const axios = CreateAxiosFn()
