const path = require('path')
const myPlugin = require('./myPlugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './index.js',
    },
    plugins: [
        new myPlugin({ aren: '阿亻' })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve('./myloader.js'),
                        // loader的配置选项 option
                        options: {
                            name: 'junde',
                        },
                    },
                ],
            },
        ],
    },
    output: {
        // 从path拿到路径，生成一个dist文件夹，文件名叫做main.js
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
}
