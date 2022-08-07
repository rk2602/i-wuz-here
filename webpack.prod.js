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
require("dotenv").config();

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        GOOGLE_MAPS_API_KEY: JSON.stringify(process.env.GOOGLE_MAPS_API_KEY),
        ATLAS_SRV: JSON.stringify(process.env.ATLAS_SRV),
        SESSION_SECRET: JSON.stringify(process.env.SESSION_SECRET),
        GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
      },
    }),
  ],
});
