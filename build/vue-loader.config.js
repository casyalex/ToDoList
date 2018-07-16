module.exports = (isDEV) => {
  return {
    preserveWhitespace: true, //控制vue的template 末尾空格是否渲染 true为不渲染
    extractCSS: !isDEV, //extract-text-webpack-plugin 的预览版在webpack4中 有bug，vue模板中的CSS始终提取，并且貌似不更新了。 现在主流改用 mini-css-extract-plugin
    // hotReload: true    //控制热重载开关，true为使用热重载，false是刷新页面，不用热重载
  }
}