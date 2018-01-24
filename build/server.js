'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

var _ErrorHandler = require('./middlewares/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _env = require('./config/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
const config = _env2.default.init();

// IOC容器
const container = (0, _awilix.createContainer)();

container.loadModules([[config.loadModules, _awilix.Lifetime.SCOPED]], {
  formatName: 'camelCase'
});
// 关键一步 将所有的contaniner的service 服务到每一个路由中去
//!!!! Service中心 注入到对应的Contaniner中去
app.use((0, _awilixKoa.scopePerRequest)(container));

// 渲染模板
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false,
  varControls: ['[[', ']]']
}));

// 错误处理日志
_log4js2.default.configure({
  appenders: { webApp: { type: 'file', filename: config.logDir } },
  categories: { default: { appenders: ['webApp'], level: 'error' } }
});

// 记录日志
const logger = _log4js2.default.getLogger('webApp');

// 错误处理中间件
_ErrorHandler2.default.error(app, logger);

// 静态资源目录
app.use((0, _koaStatic2.default)(config.staticDir));

// 路由
app.use((0, _awilixKoa.loadControllers)(config.loadControllers, { cwd: __dirname }));

app.listen(config.port, () => {
  console.log(`server is start port is ${config.port}`);
});