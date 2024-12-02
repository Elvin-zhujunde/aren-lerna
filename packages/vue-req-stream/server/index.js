import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/stream', (req, res) => {
  const { message } = req.body
  
  // 设置响应头
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Transfer-Encoding', 'chunked')
  
  // 模拟回复内容
  const response = `感谢您的消息："${message}"。这是一个模拟的流式响应，将会一个字一个字地返回。`
  
  let index = 0
  // 模拟流式响应
  const interval = setInterval(() => {
    if (index < response.length) {
      res.write(response[index])
      index++
    } else {
      clearInterval(interval)
      res.end()
    }
  }, 100) // 每100ms发送一个字符
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
}) 