import webpack from 'webpack';
import getBaseConfig from '../../webpack.config.js';

import { sources } from '../globals/sources';
import { servePath } from '../globals/consts';

let devConfig = Object.assign({}, getBaseConfig('development'));

devConfig.plugins = devConfig.plugins.concat(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

devConfig.output.path = __dirname + '/dev_serve';
devConfig.output.publicPath = `${servePath}/`;

sources.forEach(function(source) {
  let { path, name } = source;
  devConfig.entry[`${path}/${name}`] = [
    'webpack-hot-middleware/client?path=' + devConfig.output.publicPath + '__webpack_hmr',
    `./src/${path}/${name}.js`
  ];
});

export default devConfig;
