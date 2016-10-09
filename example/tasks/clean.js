import gulp from 'gulp';
import del from 'del';

import { distDir } from './globals/consts';

export default function clean(cb) {
  return del([`${distDir}/*/*`], cb);
}
