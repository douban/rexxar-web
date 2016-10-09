import webpack from 'webpack';
import argv from '../utils/argv';
import getBaseConfig from '../../webpack.config.js';

import { sources } from '../globals/sources';

let deployConfig = Object.assign({}, getBaseConfig('production'));

deployConfig.entry['vendor'] = ['react', 'react-dom'];
sources.forEach(function(source) {
  let { path, name } = source;
  deployConfig.entry[`${path}/${name}`] = `./src/${path}/${name}.js`;
});

deployConfig.stats = { children: false };

deployConfig.plugins = deployConfig.plugins.concat(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'common/vendor.js',
    minChunks: Infinity
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    comments: false,
    sourceMap: false
  })
);

export default deployConfig;
