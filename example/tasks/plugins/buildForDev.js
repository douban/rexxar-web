import path from 'path';
import through2 from 'through2';
import jade from 'jade';
import vinylFile from 'vinyl';
import argv from '../utils/argv';
import { uriMap } from '../globals/sources';
import { servePath } from '../globals/consts';

// 调试模式下，生成到dev_serve
export default function buildForDev() {

  let collect = function(file, enc, cb) {
    // 生成HTML
    let html = jade.renderFile(file.path, {
      mode: 'dev',
      scriptSrc: `${servePath}/${file.sPath}/${file.sName}.js`
    });

    let htmlFile = new vinylFile({
      base: path.join(__dirname, 'dev_serve'),
      cwd: __dirname,
      path: path.join(__dirname, 'dev_serve', file.sPath, `${file.sName}.html`),
      contents: new Buffer(html)
    })
    this.push(htmlFile);

    return cb();
  }

  let emit = function(cb) {
    // 生成routes
    let time = new Date();
    let deployTime = time.toUTCString();

    let devRoutes = { items: [], partial_items: [] };

    for (let [key, value] of uriMap) {
      let items = /partial\.douban\.com/.test(key) ? devRoutes.partial_items: devRoutes.items;
      items.push({
        deploy_time: deployTime,
        remote_file: `${servePath}/${value}.html`,
        uri: key
      })
    }

    let routesFile = new vinylFile({
      base: path.join(__dirname, 'dev_serve'),
      cwd:  __dirname,
      path: path.join(__dirname, 'dev_serve/routes.json')
    });

    routesFile.contents = new Buffer(JSON.stringify(devRoutes, null, 2) + '\n');
    this.push(routesFile);

    return cb();
  }

  return through2.obj(collect, emit);

}
