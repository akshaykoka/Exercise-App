module.exports = {
  lintOnSave: false,
  outputDir: "../docs",
  devServer: {
    proxy: "http://localhost:3000",
  },
};
