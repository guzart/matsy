// @flow

const path = require('path');

// change the mount point of the theme, so that it's compatible with github pages
const mandelbrot = require('@frctl/mandelbrot')({
  favicon: 'fractal/favicon.ico',
  lang: 'en-gb',
  styles: ['default'],
  static: {
    mount: 'fractal'
  }
});

const fractal = require('@frctl/fractal').create(); // eslint-disable-line
const reactAdapter = require('./lib/frctl-react-adapter');

const paths = {
  components: path.resolve(__dirname, './src'),
  dest: path.resolve(__dirname, '../../docs'),
  docs: path.resolve(__dirname, './docs'),
  static: path.resolve(__dirname, './public')
};

fractal.set('project.title', 'Matsy Component Library');

fractal.components.engine(reactAdapter);
fractal.components.set('default.preview', '@preview');
fractal.components.set('path', paths.components);
fractal.components.set('ext', '.react');
fractal.components.set('default.display', {
  padding: '1rem'
});

fractal.docs.set('path', paths.docs);

fractal.web.theme(mandelbrot);
fractal.web.set('static.path', paths.static);
fractal.web.set('builder.dest', paths.dest);

module.exports = fractal;
