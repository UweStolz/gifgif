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

  publicPath: process.env.NODE_ENV === 'production'
    ? '/gifgif/'
    : '/',

  productionSourceMap: false,

  css: {
    sourceMap: true,
  },
};
