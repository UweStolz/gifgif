module.exports = {
  transpileDependencies: [
    'vuetify',
  ],

  pwa: {
    name: 'GIFGIF',
    themeColor: '#D0021B',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },

  productionSourceMap: false,

  css: {
    sourceMap: true,
  },
};
