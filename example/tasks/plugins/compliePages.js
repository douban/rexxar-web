import path from 'path';
import through2 from 'through2';
import jade from 'jade';
import revHash from 'rev-hash';
import vinylFile from 'vinyl';
import { distDir, remotePath } from '../globals/consts';

export default function compilePages() {

  let assetsMap = new Map();
  let pageList = new Set();

  let collect = function(file, enc, cb) {
    // 收集三类文件，记下所需信息
    switch (path.extname(file.path)) {
      case '.css':
      case '.js':
        assetsMap.set(file.relative, file);
        break;
      case '.jade':
        let page = {
          func: jade.compileFile(file.path, { pretty: true }),
          path: file.sPath,
          name: file.sName
        };
        pageList.add(page);
        break;
      default:
        throw new Error('Compile Error: Unexpected file extname');
    }
    return cb();
  }

  let emit = function(cb) {
    // 推入vendorjs
    let vendorFile = assetsMap.get('common/vendor.js');
    vendorFile.stem = `${vendorFile.stem}-${vendorFile.hash}`;

    this.push(vendorFile);

    // 编译jade。1：内嵌js和css；2: 写入vendorjs地址
    for (let page of pageList) {
      let vendorSrc = `${remotePath}/common/${vendorFile.basename}`;

      let html = page.func({
        css: assetsMap.get(`${page.path}/${page.name}.css`).contents.toString('utf8'),
        js: assetsMap.get(`${page.path}/${page.name}.js`).contents.toString('utf8'),
        vendorSrc
      });

      let file = new vinylFile({
        base: path.join(__dirname, distDir),
        cwd: __dirname,
        path: path.join(__dirname, distDir, page.path, `${page.name}.html`),
        contents: new Buffer(html)
      });

      file.hash = revHash(file.contents);
      file.fileSymbol = `${page.path}/${page.name}`;
      file.stem = `${file.stem}-${file.hash}`;

      this.push(file);
    }

    return cb();
  }

  return through2.obj(collect, emit);

}
