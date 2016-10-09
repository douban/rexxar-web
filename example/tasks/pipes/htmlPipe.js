import gulp from 'gulp';
import through2 from 'through2';
import { sources } from '../globals/sources';

export default function htmlPipe() {
  return sources.map(function(source) {
    return gulp.src(`./src/${source.path}/${source.name}.jade`)
      .pipe(through2.obj(function(file, enc, cb) {
        // 存一下path&name
        file.sPath = source.path;
        file.sName = source.name;
        this.push(file);
        return cb();
      }))
  });
}
