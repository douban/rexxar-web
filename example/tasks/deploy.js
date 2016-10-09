import gulp from 'gulp';
import merge from 'merge-stream';
import jsPipe from './pipes/jsPipe';
import htmlPipe from './pipes/htmlPipe';
import compliePages from './plugins/compliePages';
import generateRoutes from './plugins/generateRoutes';
import { distDir } from './globals/consts';

export default function deploy() {
  return merge(jsPipe(), htmlPipe())
    .pipe(compliePages())
    .pipe(gulp.dest(distDir))
    .pipe(generateRoutes())
    .pipe(gulp.dest(distDir))
}
