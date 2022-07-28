const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  target: "node",
  output: {
    clean: true,
    path: path.resolve("dist"),
    filename: "index.js",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
