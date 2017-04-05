const ReactAdapter = require('./adapter');

module.exports = function reactAdapter(engineName, instance) {
  return {
    register(source, app) {
      return new ReactAdapter(engineName, instance, source, app);
    }
  };
};
