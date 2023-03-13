<template>
  <div class="app-main">
    <!-- Component是从子组件传过来的变量 -->
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="includes">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { useTagsView } from "@/stores/tagsView"
import { storeToRefs } from "pinia"
const store = useTagsView()
const { cachedViews } = storeToRefs(store)
const includes = computed(() => {
  return cachedViews.value as string[]
})
const route = useRoute()
</script>
<style lang="scss" scoped>
.app-main {
  /* navbar 50px */
  min-height: calc(100vh - 50px);
}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
