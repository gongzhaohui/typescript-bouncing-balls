var coreConfig = require('./karma.conf');

module.exports = function (config) {
  coreConfig(config);
  config.set({
    autowatch: false,
    singleRun: true
  });
}
