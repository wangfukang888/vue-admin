const path = require('path')

module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  publicPath: './',
  // 输出文件目录`
  devServer: {
    proxy: {
      '/apis/': {
        target: 'http://47.106.108.145/lss/api/v1/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/apis/': '/'
        },
        onProxyRes(proxyRes) {
          const cookies = proxyRes.headers['set-cookie']
          if (cookies == null || cookies.length === 0) {
            delete proxyRes.headers['set-cookie']
            return
          }
          for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].match(/^JSESSIONID=[^;]+;[\s\S]*path=\/[^;]+/)) {
              cookies[i] = cookies[i].replace(/path=\/[^;]+/, 'path=/')
            }
          }
          proxyRes.headers['set-cookie'] = cookies
        }
      }
    }
  },
  css: {  // 一次配置，全局使用，这个scss 因为每个文件都要引入
    loaderOptions: {
      scss: {
        prependData: `@import "~css/def.scss";`
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    resolve: {
      alias: {
        'com': path.resolve(__dirname, './src/components'),
        'css': path.resolve(__dirname, './src/assets/css'),
        'img': path.resolve(__dirname, './src/assets/img'),
        'api': path.resolve(__dirname, './src/api'),
      }
    }
  },
  chainWebpack: config => {
    // config.module
    // .rule('images')
    //   .use('url-loader')
    //     .loader('url-loader')
    //     .tap(options => Object.assign(options, { limit: 10240 }))
  }
}
