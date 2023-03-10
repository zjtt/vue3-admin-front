<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon
      icon-class="404"
      class-name="custom-class"
      @click="sayHi"
    ></svg-icon>
    <br />
    <br />
    <br />
    <!-- input 输入内容切换路由还在 -->
    缓存测试 <input type="text" />
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="Pick a day"
      :disabled-date="disabledDate"
      :shortcuts="shortcuts"
    />
  </div>
</template>
<script setup lang="ts">
// import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance()!
const sayHi = () => {
  proxy?.$message.success("恭喜你，这是一条成功消息")
}
const size = ref<"default" | "large" | "small">("default")

const value2 = ref("")

const shortcuts = [
  {
    text: "Today",
    value: new Date()
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>
<style lang="scss">
.custom-class {
  // 自定义样式404
  font-size: 200px;
  color: green;
}
</style>
