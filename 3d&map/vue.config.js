module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  publicPath: "./",
  outputDir: "../dist",
  configureWebpack: {
    externals: {
      AMap: "AMap",
      AMapUI: "AMapUI"
    }
  }
};
