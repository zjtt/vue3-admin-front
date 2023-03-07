import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', () => {
  // 状态
  const state = reactive({
    siderbar: {
      // sidebar 展开状态
      opened: true,
    },
  })
  const sidebar = computed(() => state.siderbar);
  // actions
  const toggleSidebar = () => {
    state.siderbar.opened = !state.siderbar.opened;
  };
  return { sidebar, toggleSidebar };
})