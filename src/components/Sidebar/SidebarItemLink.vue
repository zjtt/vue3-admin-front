<template>
  <!-- 用到了 component 动态组件 并以插槽形式包裹 SIdebarItem 组件 -->
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>
<script lang="ts" setup>
// 在这个组件里来判断 是否是带协议链接 如果是带协议链接 menu-item 里，就用 a 标签渲染
// 否则用 router-link 渲染 （注意 el-menu 路由模式不必开启 无需增添 router 属性）
import { isExternal } from "@/utils/validate"
// 针对路径是外链 就渲染为a标签 如果是正常路由路径 就渲染为 router-link
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
// 判断接收的路径 是不是外链
const isExt = computed(() => isExternal(props.to))
const type = computed(() => {
  if (isExt.value) {
    return "a"
  }
  return "router-link"
})
const linkProps = computed(() => {
  if (isExt.value) {
    return {
      // a 标签的一些原生属性
      href: props.to,
      target: "_blank",
      rel: "noopener"
    }
  }
  // router-link只需一个to props
  return {
    to: props.to
  }
})
</script>
