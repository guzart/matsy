import { spawn } from 'child_process';
import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';

import buildComponents from './lib/buildComponents';
import buildElevation from './lib/buildElevation';

// TODO: abstract to also render card
gulp.task('build:button', () =>
  gulp.src('node_modules/@material/button/mdc-button.scss')
    .pipe(plumber())
    .pipe(buildComponents)
    .pipe(gulp.dest('packages/matsy-button')),
);

gulp.task('build:animation', () =>
  gulp.src('node_modules/@material/animation/_variables.scss')
    .pipe(plumber())
    .pipe(buildElevation())
    .pipe(gulp.dest('packages/matsy-animation')),
);

gulp.task('build:elevation', () =>
  gulp.src('node_modules/@material/elevation/_variables.scss')
    .pipe(plumber())
    .pipe(buildElevation())
    .pipe(gulp.dest('packages/matsy-elevation')),
);

gulp.task('build', ['build:animation', 'build:elevation']);

gulp.task('dev', () => {
  gulp.watch('./lib/**/*.ts', () => {
    const cmd = spawn('gulp', ['build'], { stdio: 'inherit' });
  });
});
