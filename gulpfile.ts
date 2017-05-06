import { spawn } from 'child_process';
import * as gulp from 'gulp';

import buildComponents from './lib/buildComponents';
import buildElevation from './lib/buildElevation';

// BUILD

gulp.task('build:components', () =>
  gulp
    .src(
      ['node_modules/@material/button/mdc-button.scss', 'node_modules/@material/card/mdc-card.scss'],
      { base: 'node_modules/@material/' },
    )
    .pipe(buildComponents())
    .pipe(gulp.dest('packages')),
);

gulp.task('build:deps', () =>
  gulp
    .src(
      ['node_modules/@material/animation/_*.scss', 'node_modules/@material/elevation/_*.scss'],
      { base: 'node_modules/@material/' },
    )
    .pipe(buildElevation())
    .pipe(gulp.dest('packages')),
);

gulp.task('build', ['build:components', 'build:deps']);

// DEV

gulp.task('dev:build', () =>
  gulp.src('node_modules/@material/elevation/_mixins.scss')
    .pipe(buildElevation())
    .pipe(gulp.dest('packages/matsy-elevation')),
);

gulp.task('dev', () => {
  gulp.watch('./lib/**/*.ts', () => {
    const cmd = spawn('gulp', ['dev:build'], { stdio: 'inherit' });
  });
});
