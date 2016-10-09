import path from 'path';
import through2 from 'through2';
import vinylFile from 'vinyl';
import { routesMap, routes } from '../globals/routes';
import { uriMap } from '../globals/sources';
import { distDir, remotePath } from '../globals/consts';

export default function generateRoutes() {

  let fileNameMap = new Map();

  let collect = function(file, enc, cb) {
    if (file.extname === '.html') {
      fileNameMap.set(file.fileSymbol, file.relative);
      console.log(`EMIT: ${file.fileSymbol} => ${file.relative}`);
    }
    return cb();
  }

  let emit = function(cb) {
    let time = new Date();
    let deployTime = time.toUTCString();

    for (let [key, value] of uriMap) {
      let fileName = fileNameMap.get(value);

      let items = /partial\.douban\.com/.test(key) ? routes.partial_items : routes.items;

      if (routesMap.has(key)) {
        // 如果是原routes已有的uri
        let { remoteFile, index } = routesMap.get(key);
        let remoteFileName = remoteFile.replace(`${remotePath}/`, '');

        if (remoteFileName !== fileName) {
          // 如果hash有变
          items[index].remote_file = `${remotePath}/${fileName}`;
          items[index].deploy_time = deployTime;
        }
      } else {
        // 如果是新增的uri
        items.push({
          deploy_time: deployTime,
          remote_file: `${remotePath}/${fileName}`,
          uri: key
        });
      }
    }

    routes['deploy_time'] = deployTime;

    let file = new vinylFile({
      base: path.join(__dirname, distDir),
      cwd:  __dirname,
      path: path.join(__dirname, `${distDir}/routes.json`)
    });

    file.contents = new Buffer(JSON.stringify(routes, null, 2) + '\n');
    this.push(file);

    return cb();
  }

  return through2.obj(collect, emit);
}
