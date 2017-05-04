import { spawn } from 'child_process';
import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';

import buildComponents from './lib/buildComponents';

gulp.task('build:button', () =>
  gulp.src('node_modules/@material/button/mdc-button.scss')
    .pipe(plumber())
    .pipe(buildComponents)
    .pipe(gulp.dest('packages/matsy-button')),
);

gulp.task('build:card', () =>
  gulp.src('node_modules/@material/card/mdc-card.scss')
    .pipe(plumber())
    .pipe(buildComponents)
    .pipe(gulp.dest('packages/matsy-card')),
);

gulp.task('build', ['build:card']);

gulp.task('dev', () => {
  gulp.watch('./lib/**/*.ts', () => {
    const cmd = spawn('gulp', ['build'], { stdio: 'inherit' });
  });
});
