import gulp from 'gulp';
import merge from 'merge-stream';
import htmlPipe from './pipes/htmlPipe';
import buildForDev from './plugins/buildForDev';

export default function devDeploy() {
  return merge(htmlPipe())
    .pipe(buildForDev())
    .pipe(gulp.dest('dev_serve'))
}
