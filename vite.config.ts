import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
// 用来根据导入的 svg 文件自动生成 symbol 标签并插入 html,生成 svg 雪碧图。
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
// 自动导入vue或vue-router的api
import AutoImport from "unplugin-auto-import/vite"
// 自动导入组件
import Components from "unplugin-vue-components/vite"
// element-plus按需导入
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 按需导入elementui样式
import ElementPlus from "unplugin-element-plus/vite"
// 方便给组件添加name属性
import DefineOptions from "unplugin-vue-define-options/vite";
// import {
//   createStyleImportPlugin,
//   ElementPlusResolve
// } from "vite-plugin-style-import"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    vue(),
    DefineOptions(), // 方便给组件添加name属性
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")], // icon存放的目录
      symbolId: "icon-[name]", // symbol的id
      inject: "body-last", // 插入的位置
      customDomId: "__svg__icons__dom__" // svg的id
    }),
    // 自动导入
    AutoImport({
      imports: ["vue", "vue-router"], // 顺便自动导入 vue vue-router
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false }, // 改成true生成一次后禁用即可
      dts: "src/auto-import.d.ts" // 生成的全局变量放到此目录下
    }),
    Components({
      // 默认只针对src/components目录实现自动导入
      dirs: ["src/components", "src/layout/components"], // 后面布局组件也有相关的组件期望自动导入
      dts: "src/components.d.ts",
      resolvers: [ElementPlusResolver()] // 生成的组件的类型放到这里
    }),
    ElementPlus()
  ],
  server: {
    open: true
  }
})
