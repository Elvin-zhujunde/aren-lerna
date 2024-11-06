const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const { resolve } = require('path')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

function getEntry(globPath, includes) {
  const entries = {}
  let basename
  let tmp
  let pathname

  glob.sync(globPath).forEach(entry => {
    basename = path.basename(entry, path.extname(entry))
    tmp = entry.split('/').splice(-3)
    pathname = basename // 正确输出js和html的路径

    if (includes.includes(tmp[1])) {
      entries[pathname] = {
        entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
        template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
        title: tmp[2],
        filename: tmp[2],
      }
    }
  })
  return entries
}

// vue.config.js
const pages = getEntry('./src/pages/**?/*.html', [
  'admin',
  'index',
  ...(process.env.VUE_APP_MODULES || '').split(/,\s?/),
])

// 配置pages多页面获取当前文件夹下的html和js

module.exports = defineConfig({
  // 基本路径
  pages,
  publicPath: process.env.VUE_APP_PUBLIC_PATH + '/',
  // 输出文件目录
  outputDir: './dist',
  assetsDir: 'static',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,

  configureWebpack: {
    // 开发环境下开启sourcemap
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
  },
  chainWebpack: config => {
    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.js$|.\css|.\less/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        }),
      )
    }
    //---------------------  代码拆分逻辑
    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: 'chunk-common',
          maxSize: 500 * 1000,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -3,
          name: 'chunk-vendors',
          chunks: 'initial',
          enforce: true,
          reuseExistingChunk: true,
          // name(module) {
          //     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          //     return `npm.${packageName.replace('@', '')}`;
          // },
        },
      },
    })
    config
      .plugin('named-chunks')
      .before('html-admin')
      .use(require('webpack/lib/NamedChunksPlugin'), [
        chunk => {
          if (chunk.name) {
            chunksList.push(chunk.name)
            return chunk.name
          }
          const hash = require('hash-sum')
          const joinedHash = hash(Array.from(chunk.modulesIterable, m => m.id).join('_'))
          chunksList.push(`chunk-${joinedHash}`)
          return `chunk-${joinedHash}`
        },
      ])
      .end()
    /**
     * 根据路由驱动页面的 runtime 代码默认情况是包含在 build 后的 app.hash.js 内的，如果我们改动其他路由，就会导致 runtime 代码改变。
     * 从而不光我们改动的路由对应的页面 js 会变，含 runtime 代码的 app.hash.js 也会变，对用户体验是非常不友好的。为了解决这个问题要设定 runtime 代码单独抽取打包：
     */
    config.optimization.runtimeChunk('single')

    config.plugin('html-index').tap(config => {
      config[0].chunks = chunksList
      return config
    })
    config.plugin('html-admin').tap(config => {
      config[0].chunks = chunksList
      return config
    })
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch-admin')
    config.plugins.delete('prefetch-index')
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      },
      // postcss: {
      //     // options here will be passed to postcss-loader
      //     plugins: [require('postcss-px-to-viewport')({
      //         viewportWidth: 1920,
      //         // viewportWidth: 7630,
      //         unitPrecision: 4,
      //         // propList: ['font-size'],
      //     })],
      // },
    },
  },

  devServer: {
    // host: 'sf0001115468e.sf.com',
    port: 3000,
    https: false,
    hot: true,
    hotOnly: true,
    disableHostCheck: true,
    proxy: {
      '/iserver': {
        target: 'http://10.181.37.139:28090',
        ws: false,
        changeOrigin: true,
        // pathRewrite: {
        //     '/': ''
        // }
      },
    },
  },

  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
})
