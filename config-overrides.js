const webpack = require('webpack');
const {
  useBabelRc,
  removeModuleScopePlugin,
  override,
  addWebpackPlugin 
} = require("customize-cra");
module.exports = override(useBabelRc(), removeModuleScopePlugin(),addWebpackPlugin(
  new webpack.DefinePlugin({
    process: { env: {} },
  })
));