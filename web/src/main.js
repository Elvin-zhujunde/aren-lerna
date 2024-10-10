import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import "@/styles/index.css"
import router from "./router/index"
import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
import "@/styles/index.less"
import * as GobalTools from "./tool/GobalTool"
import 'virtual:uno.css'

// import * as api from "@/api/index"

window._tool = GobalTools
// window._api = api
// import { init } from "./store/map"
// init()
const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(Antd)
app.mount("#app")
