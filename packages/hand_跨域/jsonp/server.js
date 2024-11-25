const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    const { url } = req
    const query = querystring.parse(url.split('?')[1])
    const { name, age, callback } = query // const callback = query.callback
    // console.log(callback);
    const data = {
        name,
        age,
    }
    // getMsg(data)
    res.end(`${callback}('${JSON.stringify(data)}')`) // getMsg(data)
})

server.listen(3000, () => {
    console.log('服务已启动')
})
