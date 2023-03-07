<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened" />
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
const store = useAppStore()
const { sidebar } = storeToRefs(store)
const toggleSidebar = () => {
  store.toggleSidebar()
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
}
</style>
