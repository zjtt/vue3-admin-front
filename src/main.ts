import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router/index"
import { createPinia } from "pinia"
// import ElementPlus from "element-plus" // 这里我们直接全量引入
// import "element-plus/dist/index.css"
// 初始化css，重置css默认样式,保持各个浏览器统一
import "normalize.css/normalize.css"
// 全局css
import "@/styles/index.scss"
// 自定义 svg 图标，封装成 icon 组件像 element-ui icon 组件似得，通过图标名称来使用图标，也可自定义类名控制
// 引入icon插件
import initSvgIcon from "@/icons/index"
// svg 雪碧图。
import "virtual:svg-icons-register"
// 注册element-plus
import installElementPlus from "./plugins/element"

const app = createApp(App)
// app.use(ElementPlus)
app.use(installElementPlus)
// 使用icon组件
app.use(initSvgIcon)
app.use(router).use(createPinia()).mount("#app")
