<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <!-- 一个个tag view就是router-link -->
      <router-link
        class="tags-view-item"
        :class="{
          active: isActive(tag)
        }"
        v-for="(tag, index) in visitedViews"
        :key="index"
        :to="{ path: tag.path, query: tag.query }"
      >
        <span>{{ tag.meta.title }}</span>
        <el-icon class="icon-close" v-if="!isAffix(tag)">
          <CloseBold @click.prevent.stop="closeSelectedTag(tag)" />
        </el-icon>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTagsView } from "@/stores/tagsView"
import { storeToRefs } from "pinia"
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router"
import { CloseBold } from "@element-plus/icons-vue"
import path from "path-browserify"
import { routes } from "@/router"
const fillterAffixTags = (routes: RouteRecordRaw[], basePath = "/") => {
  let tags: RouteLocationNormalized[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      // 把路由路径解析成完整路径，路由可能是相对路径
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        name: route.name,
        path: tagPath,
        meta: { ...route.meta }
      } as RouteLocationNormalized)
    }
    // 深度优先遍历 子路由（子路由路径可能相对于route.path父路由路径）
    if (route.children) {
      const childTags = fillterAffixTags(route.children, route.path)
      if (childTags.length) {
        tags = [...tags, ...childTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const affixTags = fillterAffixTags(routes)
  console.log("affixTags:", affixTags)
  for (const tag of affixTags) {
    if (tag.name) {
      store.addView(tag)
    }
  }
}
const isAffix = (tag: RouteLocationNormalized) => {
  // 有这个属性则此路由固定在开头且不可删除
  return tag.meta && tag.meta.affix
}
onMounted(() => {
  // vue的apionMounted会自动导入
  initTags()
})

const store = useTagsView()
const { visitedViews } = storeToRefs(store)
const route = useRoute()
// 从store里获取 可显示的tags view
// 添加tag
const addTags = () => {
  const { name } = route
  if (name) {
    store.addView(route)
  }
}
watch(
  () => route.path,
  () => {
    addTags()
  },
  { immediate: true }
)
// 是否是当前应该激活的tag
const isActive = (tag: RouteLocationNormalized) => {
  return tag.path === route.path
}
// 关闭当前右键的tag路由
const closeSelectedTag = (view: RouteLocationNormalized) => {
  store.delView(view)
  // 如果移除的view是当前选中状态view, 就让删除后的集合中最后一个tag view为选中态
  if (isActive(view)) {
    toLastView(visitedViews.value, view)
  }
}
const router = useRouter() // vite.config.js中已经自动引入
const toLastView = (
  visitedViews: RouteLocationNormalized[],
  view: RouteLocationNormalized
) => {
  // 得到集合中最后一个项tag view 可能没有
  const lastView = visitedViews[visitedViews.length - 1]
  if (lastView) {
    router.push(lastView.path)
  } else {
    // 集合中都没有tag view时
    // 如果刚刚删除的正是Dashboard 就重定向回Dashboard（首页）
    if (view.name === "Dashboard") {
      router.push({ path: view.path })
    } else {
      // tag都没有了 删除的也不是Dashboard 只能跳转首页
      router.push("/")
    }
  }
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      // height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      color: #495060;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          position: relative;
          display: inline-block;
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
    span {
      vertical-align: middle;
    }
  }
  .icon-close {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -1px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
