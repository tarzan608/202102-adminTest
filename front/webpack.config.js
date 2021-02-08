const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
  optimization: {
    minimizer: [],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      //변경될 문자: 변경할 문자 ex) WEB_VERSION: '"1.0.0"',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
      // $: 'jquery',
    }),
  ],
  devServer: {
    // https: {
    //   key: fs.readFileSync('*.key path'),
    //   cert: fs.readFileSync('*.pem path'),
    //   passphrase: 'password'
    // },
    contentBase: path.join(__dirname, 'public/'),
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
  },
};
