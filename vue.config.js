module.exports = {
    pwa: {
      name: 'Libria',
      themeColor: '#ffffff',
      msTileColor: '#ffffff',
      backgroundColor: '#ffffff',
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
          target: 'http://localhost:1324',
          changeOrigin: true
        }
      }
    }
  }
  