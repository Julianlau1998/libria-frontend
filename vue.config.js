module.exports = {
    pwa: {
      name: 'Libria',
      themeColor: '#ffffff',
      msTileColor: '#ffffff',
      backgroundColor: '#c6c6c6',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'default',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: 'src/service-worker.js'
      }
    },
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      proxy: {
        '^/api/*': {
          target: 'http://192.168.178.58:1325',
          changeOrigin: true
        }
      }
    }
  }
  