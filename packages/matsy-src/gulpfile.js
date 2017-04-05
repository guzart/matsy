// @flow

const gulp = require('gulp');
const babel = require('gulp-babel');
const path = require('path');
const fractal = require('./fractal');

const paths = {
  dest: path.resolve('../matsy'),
  src: path.resolve('./src')
};

gulp.task('build:js', () =>
  gulp.src([`${paths.src}/**/*.@(js|jsx)`])
      .pipe(babel({
        babelrc: false,
        ignore: ['node_modules/*'],
        presets: [['env', { targets: { browsers: ['last 2 versions'] } }], 'react'],
        plugins: [
          'transform-flow-strip-types',
          'transform-class-properties',
          'transform-object-rest-spread',
          'transform-runtime'
        ]
      }))
      .pipe(gulp.dest(paths.dest))
);

gulp.task('build:docs', ['build:js'], () => {
  const builder = fractal.web.builder();
  const logger = fractal.cli.console;
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed!');
  });
});

gulp.task('build', ['build:js', 'build:docs']);

gulp.task('dev:build', ['build:js']);
gulp.task('dev:matsy', () => gulp.watch(`${paths.src}/**/*.@(js|jsx)`, ['dev:build']));
gulp.task('dev:fractal', ['dev:build'], () => fractal.cli.exec('start --sync'));

gulp.task('dev', ['dev:build', 'dev:matsy', 'dev:fractal']);

gulp.task('default', ['build']);
