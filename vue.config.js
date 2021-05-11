/*
 * @Author: your name
 * @Date: 2020-12-25 10:38:09
 * @LastEditTime: 2021-02-03 14:24:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yulei\vue.config.js
 */
module.exports = {
  publicPath: './',
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    },

    disableHostCheck: true,
    proxy: {
      '/apis': {
        //代理地址
        target: 'http://119yb.cc', //测试环境
        changeOrigin: true, //是否跨域run
        ws: true,
        pathRewrite: {
          '^/apis': ''
        }
      },
      '/youdao': {
        //代理地址
        target: 'http://fanyi.youdao.com', //测试环境
        changeOrigin: true, //是否跨域run
        ws: true,
        pathRewrite: {
          '^/youdao': ''
        }
      }
    }
  }
};
