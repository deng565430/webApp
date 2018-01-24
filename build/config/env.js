'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));
var path = _interopDefault(require('path'));

// 开发环境配置

const server = {
  port: 80
};

let config = {
  viewDir: path.join(__dirname, "..", "views"),
  staticDir: path.join(__dirname, "..", "assets"),
  logDir: path.join(__dirname, "..", "logs/webApp.log"),
  loadModules: path.join(__dirname, "..", "models/*.js"),
  loadControllers: path.join(__dirname, "..", "controllers/*.js")
};

const dev = {
  init: function() {
    {
      return config = _.extend(config, server);
    }
  }
};

module.exports = dev;
