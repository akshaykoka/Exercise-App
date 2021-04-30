const path = require("path");
module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    proxy: "http://localhost:3000",
  },
};
