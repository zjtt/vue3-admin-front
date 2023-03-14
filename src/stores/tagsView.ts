import { defineStore } from "pinia";
import { RouteLocationNormalizedLoaded, RouteRecordName, RouteLocationNormalized } from "vue-router";
export const useTagsView = defineStore("tag", () => {
  const visitedViews = ref<RouteLocationNormalizedLoaded[]>([]);
  // 添加视图
  const addView = (view: RouteLocationNormalizedLoaded) => {
    // 去重
    if (visitedViews.value.some((v) => v.path === view.path)) return;
    // 没有title的处理
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta?.title || "tag-name",
      })
    );
    addCachedView(view);
  };
  // 删除视图
  const delView = (view: RouteLocationNormalizedLoaded) => {
    const i = visitedViews.value.indexOf(view);
    if (i > -1) {
      visitedViews.value.splice(i, 1);
    }
    delCachedView(view);
  };
  const cachedViews = ref<RouteRecordName[]>([]);
  const addCachedView = (view: RouteLocationNormalized) => {
    // keep-alive 内部是根据组件的 name 进行缓存，我们添加到 cachedViews 缓存列表的
    // name 是从每条路由配置的 name 取得值，所以路由组件和路由配置中必须要有一致的name 属性
    if (cachedViews.value.includes(view.name!)) return;
    if (!view.meta.noCache) {
      // 需要缓存
      cachedViews.value.push(view.name!);
    }
  };
  const delCachedView = (view: RouteLocationNormalized) => {
    // 删除缓存
    const index = cachedViews.value.indexOf(view.name!);
    index > -1 && cachedViews.value.splice(index, 1);
  };
  // 删除标签导航所有tag 除了affix为true的
  const delAllView = () => {
    visitedViews.value = visitedViews.value.filter((tag) =>
      tag.meta.affix);
    cachedViews.value = []
  };
  // 关闭其他tag 除了affix为true的和当前右键的tag
  const delOthersViews = (view: RouteLocationNormalized) => {
    visitedViews.value = visitedViews.value.filter(
      (tag) => tag.meta.affix || tag.path === view.path
    );
    cachedViews.value = cachedViews.value.filter((name) => name !==
      view.name);
  };
  return {
    visitedViews, addView, delView,
    cachedViews,
    addCachedView,
    delCachedView,
    delAllView,
    delOthersViews,
  };
});