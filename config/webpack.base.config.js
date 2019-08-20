const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');

const paths = {
  SRC_DIR: path.resolve(__dirname, '../../src'),
  BUILD_DIR: path.resolve(__dirname, '../../dist'),
};

module.exports = env => {
  const isDevelopment = env.mode !== "development";
  console.log("base load", env.mode);
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  
  return {
    mode: env.mode,
    context: path.resolve(__dirname, '../src'),
    entry: "./index.js",
    output: {
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                // localIdentName: '[name]__[local]___[hash:base64:5]',
                // camelCase: true,
                sourceMap: isDevelopment
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module.(s(a|c)ss)$/,
          loader: [
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images/",
                name: "[name][hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(svg)$/,
          exclude: /fonts/ /* dont want svg fonts from fonts folder to be included */,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                noquotes: true
              }
            }
          ]
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          exclude: /images/ /* dont want svg images from image folder to be included */,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts/",
                name: "[name][hash].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        filename: "./index.html"
      }),
      new ExtractTextPlugin("style.css"),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
      }),
      new FriendlyErrorsWebpackPlugin(),
      new WebpackBar(),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      compress: true,
      port: 3000,
      noInfo: true,
      quiet: true,
      clientLogLevel: 'warning',
      stats: 'errors-only',
      hot: true,
      open: true
    }
  };
};
