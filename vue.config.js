module.exports = {

  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * publicPath: process.env.NODE_ENV==='production'?"https://cdn.aliyun.com/front/":'front/',
   */
  // 基本路径
  publicPath: '/',//从 Vue CLI 3.3 起baseUrl已弃用，请使用publicPath
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  //compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {
  },
  configureWebpack: () => {
  },
  // 如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // css相关配置
  // css: {
  //   //  是否使用css分离插件 ExtractTextPlugin
  //   extract: true,
  //   // 开启 CSS source maps?
  //   sourceMap: false,
  //   // css预设器配置项
  //   loaderOptions: {},
  //   // 启用 CSS modules for all css / pre-processor files.
  //   modules: false
  // },
  //
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'vue',
    host: 'localhost',
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: { // 设置代理
      '/api': {
        target: 'http://www.xxxxx.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    disableHostCheck: true
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
