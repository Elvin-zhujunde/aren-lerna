const express = require('express')

const app = new express()

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.get('/getTest', (req, res) => {
    const data = {
        name: '张三',
        age: 18,
    }
    res.json(data)
})

app.listen(5000, () => {
    console.log('服务已启动')
})
