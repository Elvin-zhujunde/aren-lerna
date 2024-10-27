const router = require('koa-router')();
const uploadHost = `http://localhost:${4000}/`
const fs = require('fs')
const path = require('path')
async function upload (ctx) {
    // 处理接收的文件片段
    let body = ctx.request.body
    let files = ctx.request.files ? ctx.request.files.fileChunk : []
    // 最终结果
    let resule = []
    // 
    let fileToken = ctx.request.body.token
    let fileIndex = ctx.request.body.index
    if (files && !Array.isArray(files)) {
        // 如果files不是一个数组的话，那么就把他装到数组里面去
        files = [files]
    }
    files && files.forEach(item => {
        let path = item.path.replace(/\\/g, '/');
        let fname = item.name
        let nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken;
        if (item.size > 0 && path) {
            let extArr = fname.split('.')
            // let ext = extArr[extArr.length - 1] // mp3
            fs.renameSync(path, nextPath)
            resule.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1))
        }
    })

    // 合并文件
    if (body.type === 'merge') {
        let filename = body.filename,
            chunkCount = body.chunkCount,
            folder = path.resolve(__dirname, '../static') + '\\';
        // 创建一个文件读写流
        let writeStream = fs.createWriteStream(`${folder}${filename}`)  //参数为文件路径
        let cindex = 0
        // 真正的去做合并的操作
        function fnMergeFile () {
            // 合并后的文件的文件名
            let fname = `${folder}${cindex}-${fileToken}`
            // 
            let readStream = fs.createReadStream(fname)
            // 将读取到的文件资源放到写文件的流里去
            readStream.pipe(writeStream, { end: false })
            readStream.on('end', function () {   //end 事件代表结束，只要监听到了end 就说明之后没有文件可读了

                fs.unlink(fname, function (err) {
                    if (err) {
                        throw err
                    }
                })
                if (cindex + 1 < chunkCount) {
                    // 读到下一个文件
                    cindex += 1
                    // 递归调用
                    fnMergeFile()
                }
            })
        }
        await fnMergeFile();
        ctx.body = 'merge ok 200'

    } else {
        // 给前端返回
        ctx.body = {
            fileUrl: resule
        }
    }

}

module.exports = (app) => {

    // 文件上传功能接口
    router.post('/upload', upload);

    app.use(router.routes()).use(router.allowedMethods());
};