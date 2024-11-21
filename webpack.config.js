const path = require('path');

module.exports = {
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve('frontend', 'public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ]
  }
};