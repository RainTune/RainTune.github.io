module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  parallel: false,// 解决打包thread-loader报错问题
  // publicPath: process.env.NODE_ENV === "production" ? "/demo-main-vue/" : "/",
  publicPath: "/demo-main-vue/",
  configureWebpack: {
    externals: {
      AMap: "AMap",
      AMapUI: "AMapUI"
    }
  },
};
