import gulp from 'gulp';
import through2 from 'through2';
import env from 'gulp-env';
import gulpWebpack from 'webpack-stream';
import revHash from 'rev-hash';
import deployConfig from '../webpackConfig/deployConfig';

export default function jsPipe() {

  return gulp.src('')
    .pipe(env.set({
      NODE_ENV: 'production' // disable hmr in Babel configuration
    }))
    .pipe(gulpWebpack(deployConfig))
    .pipe(through2.obj(function(file, enc, cb) {
      if (file.basename === 'vendor.js') {
        file.hash = revHash(file.contents);
      }
      this.push(file);
      return cb();
    }))

}
