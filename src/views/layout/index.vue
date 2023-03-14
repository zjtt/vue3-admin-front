<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <!-- <div class="navbar">navbar</div> -->
        <!-- <div class="tags-view">tagsview</div> -->
        <navbar></navbar>
        <tags-view></tags-view>
      </div>
      <!-- <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div> -->
      <app-main></app-main>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppMain from "./components/AppMain.vue"
</script>
<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      // background: cyan;
      .navbar {
        // height: 50px;
        // background: #1890ff;
        display: flex;
        background: #fff;
        border-bottom: 1px solid rgba(0, 21, 41, 0.08);
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* main = 100% - navbar + tagsview */
      min-height: calc(100vh - 84px);
      border: 1px solid red;
    }
  }
}
</style>
