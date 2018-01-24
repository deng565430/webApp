import Koa from 'koa';
import router from 'koa-simple-router';
import render from 'koa-swig';
import save from 'koa-static';
import co from 'co';
import log4js from 'log4js';
import { createContainer, asClass, Lifetime } from "awilix";
import { loadControllers, scopePerRequest } from "awilix-koa";
import ErrorHandler from "./middlewares/ErrorHandler";
import dev from './config/env';

const app = new Koa();
const config =  dev.init();

// IOC容器
const container = createContainer();

container.loadModules(
  [
    [config.loadModules, Lifetime.SCOPED]
  ],
  {
    formatName: 'camelCase'
  }
)
// 关键一步 将所有的contaniner的service 服务到每一个路由中去
//!!!! Service中心 注入到对应的Contaniner中去
app.use(scopePerRequest(container))

// 渲染模板
app.context.render = co.wrap(render({
  root: config.viewDir,
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false,
  varControls: ['[[', ']]']
}));

// 错误处理日志
log4js.configure({
  appenders: { webApp: { type: 'file', filename: config.logDir } },
  categories: { default: { appenders: ['webApp'], level: 'error' } }
});

// 记录日志
const logger = log4js.getLogger('webApp');

// 错误处理中间件
ErrorHandler.error(app, logger);

// 静态资源目录
app.use(save(config.staticDir));

// 路由
app.use(loadControllers(config.loadControllers, { cwd: __dirname }));

app.listen(config.port, () => {
  console.log(`server is start port is ${config.port}`);
});
