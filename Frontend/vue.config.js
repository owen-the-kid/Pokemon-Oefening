export default {
  devServer: {
    proxy: {
      '/Pokemon': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/Pokemon': '' },
      },
    },
  },
}

