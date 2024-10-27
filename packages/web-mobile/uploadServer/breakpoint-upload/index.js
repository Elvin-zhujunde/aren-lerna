
const Koa = require('koa2')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const router = require('./routes');

const path = require('path')
const cors = require('koa2-cors')
const app = new Koa()
// const port = process.env.port || '3000'
// 允许跨域
app.use(cors({
    credentials: true,//默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器许可Cookie可以包含在请求中
}));
// 先处理一下
app.use(koaBody({
    // 把文件暴露出来
    formidable: {
        uploadDir: path.resolve(__dirname, './static')
    },
    // 支持文件上传
    multipart: true
}))
// 允许koa读取静态文件
app.use(koaStatic(
    path.resolve(__dirname, './static')
))
router(app);
app.listen(4000, () => {
    console.log('服务已启动');
})