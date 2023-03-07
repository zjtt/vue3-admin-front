import { useAppStore } from './app'
import { useCounterStore } from './counter'

// // 统一导出useStore方法
export default function useStore() {
  return {
    appStore: useAppStore(),
    counterStore: useCounterStore()
  }
}
