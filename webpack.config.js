const path = require('path');
var ChromeDevPlugin = require("chrome-dev-webpack-plugin");

var sourcePath = path.join(__dirname, "src");

const config = {
  context: path.resolve(sourcePath),
  entry: {
    entry: [path.join(sourcePath, "/index.js")],
    background: [path.join(sourcePath, "/reducers/index.js")]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  watch: true,
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  plugins: [
    new ChromeDevPlugin({
    entry: "./manifest.json"
  })]
}

module.exports = config;
