"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const ErrorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        ctx.status = error.status || 500;
        ctx.body = 500;
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (404 !== ctx.status) return;
      logger.error("没有找到地址");
      ctx.status = 404;
      ctx.body = 404;
    });
  }
};

exports.default = ErrorHandler;