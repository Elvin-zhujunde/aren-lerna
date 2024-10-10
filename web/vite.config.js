import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import path from "path"

import { defineConfig, loadEnv } from "vite"
import VueSetupExtend from "vite-plugin-vue-setup-extend"
import AutoImport from "unplugin-auto-import/vite" // 自动导入
import VueDevTools from 'vite-plugin-vue-devtools'
import pxtovw from "postcss-px-to-viewport"
import UnoCSS from 'unocss/vite'

import { templateCompilerOptions } from '@tresjs/core'

// const my_pxtovw = pxtovw({
//     //这里是设计稿宽度 自己修改
//     unitToConvert: "px", // 要转化的单位
//     viewportWidth: 1260, // UI设计稿的宽度
//     unitPrecision: 6, // 转换后的精度，即小数点位数
//     propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
//     viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
//     fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
//     selectorBlackList: [], // 指定不转换为视窗单位的类名，
//     minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
//     mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
//     replace: true, // 是否转换后直接更换属性值
//     exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
//     landscape: false, // 是否处理横屏情况
// })

// import viteCompression from "vite-plugin-compression" // 代码压缩
// import removeConsole from "vite-plugin-remove-console" // 生产环境移除console
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "")
    return {
        // 静态资源服务的文件夹
        publicDir: "public",
        // base: `${env.VITE_APP_PUBLIC_PATH}/`,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"), // 把 @ 指向到 src 目录去
            },
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
        },
        css: {
            postcss: {
                // plugins: [my_pxtovw],
            },
            preprocessorOptions: {
                less: {
                    math: "always",
                    javascriptEnabled: true,
                    // modifyVars: {},
                    additionalData: `@import '@/styles/themes/theme.less';`,
                },
            },
        },

        build: {
            minify: "terser",
            outDir: "databoard",
            // brotliSize: false,
            // 消除打包大小超过500kb警告
            chunkSizeWarningLimit: 2000,
            // 在生产环境移除console.log
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: false,
                    pure_funcs: ["console.log", "console.info"],
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: {
                    // 最小化拆分包
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            // 通过拆分包的方式将所有来自node_modules的模块打包到单独的chunk中
                            return id.toString().split("node_modules/")[1].split("/")[0].toString()
                        }
                    },
                    // 设置chunk的文件名格式
                    chunkFileNames: chunkInfo => {
                        const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/") : []
                        const fileName1 = facadeModuleId[facadeModuleId.length - 2] || "[name]"
                        // 根据chunk的facadeModuleId（入口模块的相对路径）生成chunk的文件名
                        return `js/${fileName1}/[name].[hash].js`
                    },
                    // 设置入口文件的文件名格式
                    entryFileNames: "js/[name]-[hash].js",
                    // 设置静态资源文件的文件名格式
                    assetFileNames: "[ext]/[name]-[hash].[ext]",
                },
            },

            // Turning off brotliSize display can slightly reduce packaging time
            reportCompressedSize: false,
        },

        plugins: [
            vue({
                ...templateCompilerOptions
            }),
            vueJsx(),
            VueSetupExtend(),
            UnoCSS(),
            // viteCompression(),
            // removeConsole(),
            VueDevTools(),
            AutoImport({
                imports: [
                    "vue",
                    "vue-router",
                    "@vueuse/core",
                    "pinia",
                    // "lodash",
                    // "vue-i18n",
                    // "vue-i18n-ts",
                    {
                        lodash: ["cloneDeep"],
                        // "@vueuse/core": [
                        //     // named imports
                        //     "useMouse", // import { useMouse } from '@vueuse/core',
                        //     "usePreferredDark",
                        //     "useDark",
                        //     "useTitle",
                        //     // alias
                        //     ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
                        // ],

                        "@turf/turf": [["*", "turf"]],
                        axios: [
                            ["default", "axios"], // import { default as axios } from 'axios',
                        ],
                    },
                ],
                // vueTemplate: true,
                // cache: true,
                // dirs: ["src/hooks", "src/components"],
                // dts: "types/auto-imports.d.ts",
            }),
        ],
        optimizeDeps: {
            include: [
                "vue",
                "pinia",
                "vue-router",
                "ant-design-vue/es", //
                "@vueuse/core",
                "@amap/amap-jsapi-loader",
                "@turf/turf",
                "ant-design-vue",
                "cesium",
                "echarts",
                "lodash",
                "md-editor-v3",
            ],
        },

        server: {
            host: true, // host设置为true才可以使用network的形式，以ip访问项目
            port: 3000, // 端口号
            cors: true, // 跨域设置允许
            strictPort: true, // 如果端口已占用直接退出
            // 接口代理
            proxy: {
                "/server": {
                    // 本地 8000 前端代码的接口 代理到 8080 的服务端口
                    target: "http://localhost:8083/",
                    changeOrigin: true, // 允许跨域
                    // rewrite: path1 => path1.replace('/server', '/visualization'),
                },
                "/upload": {
                    // 本地 8000 前端代码的接口 代理到 8080 的服务端口
                    target: "http://localhost:4000/",
                    changeOrigin: true, // 允许跨域
                    // rewrite: path1 => path1.replace('/server', '/visualization'),
                },
            },
        },
    }
})
