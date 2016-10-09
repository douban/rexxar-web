import gulp from 'gulp';

import clean from './tasks/clean';
import deploy from './tasks/deploy';
import devDeploy from './tasks/devDeploy';
import serve from './tasks/serve';

gulp.task('clean', clean);

gulp.task('deploy', ['clean'], deploy);

gulp.task('devDeploy', devDeploy);

gulp.task('serve', ['devDeploy'], serve);
