const webpack = require("webpack");

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: "./app.js" // Which file(s) Webpack should parse
  },
  output: {
    filename: "[name].bundle.js", // The filename template
    path: __dirname + "/dist" // Directory for the output file(s)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()]
};
