import express from 'express';
import serveIndex from 'serve-index';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import devConfig from './webpackConfig/devConfig';
import { serveIp, servePort, servePath } from './globals/consts';

export default function serve(cb) {

  let app = express();
  let compiler = webpack(devConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: `${servePath}/`,
    stats: {
      assets: false,
      colors: true,
      chunks: false,
      children: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));

  app.use('/', express.static('dev_serve'), serveIndex('dev_serve'));

  app.listen(servePort, serveIp, function() {
    console.log(`[webpack-dev-server] http://${serveIp}:${servePort}/`);
  });

}
