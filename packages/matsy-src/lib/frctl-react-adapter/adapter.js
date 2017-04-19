// const babel = require('babel-core');
const debug = require('debug')('matsy:frctl-react-adapter');
const Adapter = require('@frctl/fractal').Adapter;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const ts = require('typescript');
const vm = require('vm');

const { cleanFilepath } = require('./utils');
const compilerOptions = ts.parseJsonConfigFileContent({
  compilerOptions: {
    allowJs: true,
    jsx: 'react',
    module: 'commonjs',
    moduleResolution: 'node',
    target: 'ES5'
  }
}, ts.sys, '../tsconfig.js');

function compile(code) {
  const result = ts.transpileModule(code, { filename: 'input.jsx', compilerOptions: compilerOptions.options });
  return result.outputText;
}

function getSandbox() {
  return {
    exports: {},
    process: { env: { NODE_ENV: 'production' } },
    // fixes interop between nodejs and typescript default imports
    require: (name) => {
      var mod = require(name); // eslint-disable-line
      if (mod.default) {
        return mod;
      }

      return { default: mod };
    },
    window: { navigator: { userAgent: 'Node' } }
  };
}

function clearRequireCache() {
  debug(Object.keys(require.cache).filter(id => !/node_modules/.test(id)));
  Object.keys(require.cache)
    .filter(id => /packages\/matsy\/(?!node_modules)/.test(id))
    .forEach(id => delete require.cache[id]);
}

function compileComponent(tplPath, tplCode) {
  clearRequireCache();
  debug(`COMPILE: ${cleanFilepath(tplPath)}`);
  const sandbox = getSandbox();
  vm.runInNewContext(`${compile(tplCode)}`, sandbox);
  const Component = sandbox.exports.default;
  return Component;
}

class ReactAdapter extends Adapter {
  constructor(engineName, instance, source, app) {
    super(instance, source);
    this.fractal = app;
    this.engineName = engineName;
    this.instance = instance;
    this.source = source;
    this.cache = {};
  }

  render(tplPath, tplCode, tplContext, meta) {
    debug(`RENDERING: ${cleanFilepath(tplPath)}`);

    try {
      const Component = compileComponent(tplPath, tplCode);
      const { engineName, fractal, instance, source } = this;
      const props = Object.assign({},
        { engineName, fractal, instance, source, filePath: tplPath, meta },
        tplContext
      );

      const element = React.createElement(Component, props);
      const html = ReactDOMServer.renderToStaticMarkup(element);
      return Promise.resolve(html);
    } catch (error) {
      debug(error);
      return Promise.reject(error.message);
    }
  }
}

module.exports = ReactAdapter;
