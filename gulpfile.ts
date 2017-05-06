import { spawn } from 'child_process';
import * as gulp from 'gulp';

import format from './lib/format';
import transpile from './lib/transpile';

// BUILD

gulp.task('build', () =>
  gulp
    .src(
      [
        'node_modules/@material/animation/_*.scss',
        'node_modules/@material/button/mdc-button.scss',
        'node_modules/@material/card/mdc-card.scss',
        'node_modules/@material/elevation/_*.scss',
      ],
      { base: 'node_modules/@material/' },
    )
    .pipe(transpile())
    .pipe(format())
    .pipe(gulp.dest('packages')),
);

// DEV

gulp.task('dev:build', () =>
  gulp.src('node_modules/@material/elevation/_mixins.scss', { base: 'node_modules/@material/'})
    .pipe(transpile())
    .pipe(format())
    .pipe(gulp.dest('packages')),
);

gulp.task('dev', () => {
  gulp.watch('./lib/**/*.ts', () => {
    const cmd = spawn('gulp', ['dev:build'], { stdio: 'inherit' });
  });
});
