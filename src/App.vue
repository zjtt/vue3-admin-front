<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
import { storeToRefs } from "pinia"
import { useAppStore } from "./stores/app"
const store = useAppStore()
const { size } = storeToRefs(store)
</script>
