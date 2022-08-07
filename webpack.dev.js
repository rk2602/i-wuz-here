/*
|
|--------------------------------------------------------------------------
| webpack.config.js -- Configuration for Webpack
|--------------------------------------------------------------------------
|
| Webpack turns all the clientside HTML, CSS, Javascript into one bundle.js file.
| This is done for performance reasons, as well as for compatability reasons.
|
| You do not have to worry about this file, except for proxy section below.
| All proxies does is route traffic from the hotloader to the backend.
| You must define explicity all routes here, as we do for the /api/* routes.
|
| The rest of this file tell webpack which types of files to bundle (in the rules).
| In addition, it also uses babel to transpile your javascript into code all browsers can use.
| see https://babeljs.io/docs/en/ if this interests you!
|
*/

const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, "./.env"),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./client/dist",
    hot: true,
    proxy: {
      "/api": "http://localhost:3000",
      "/socket.io/*": {
        target: "http://localhost:3000",
        ws: true,
      },
    },
  },
});
