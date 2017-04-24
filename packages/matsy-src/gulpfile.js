const gulp = require('gulp');
const path = require('path');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const fractal = require('./fractal');

const paths = {
  dest: path.resolve('./dist'),
  src: path.resolve('./src')
};

gulp.task('build:js', () =>
  tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(paths.dest))
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
gulp.task('dev:matsy', () => gulp.watch(`${paths.src}/**/*.@(ts|tsx)`, ['dev:build']));
gulp.task('dev:fractal', ['dev:build'], () => fractal.cli.exec('start --sync'));

gulp.task('dev', ['dev:build', 'dev:matsy', 'dev:fractal']);

gulp.task('default', ['build']);
