<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened" />
    <breadcrumb></breadcrumb>
    <div class="right-menu">
      <screenfull class="right-menu-item hover-effect"></screenfull>
      <!-- element组件size切换 -->
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select class="right-menu-item hover-effect" />
      </el-tooltip>
      <avatar />
    </div>
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
  display: flex;
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
