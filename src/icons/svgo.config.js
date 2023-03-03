// svgo 是 svg 压缩处理优化工具。我们很多网上下载或者 Sketch 导出的 svg 会有很多冗余
// 无用的信息，大大的增加了 svg 的尺寸，我们可以使用 svgo 对它进行优化。
module.exports = {
  plugins: [
    "preset-default", // 默认插件配置
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke)"
      }
    }
  ]
}
