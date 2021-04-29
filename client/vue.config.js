module.exports = {
  lintOnSave: false,
  outputDir: "../docs",
  devServer: {
    proxy: "http://localhost:3000",
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/docs/1.0/'
    : '/'
};
