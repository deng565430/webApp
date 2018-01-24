import { route, GET } from "awilix-koa"; // or `awilix-router-core`

@route("/*")
export default class IndexAPI {
  constructor({ indexService }) {
    this.indexService = indexService;
  }

  @route("")
  @GET()
  async getIndex(ctx) {
    ctx.body = await ctx.render("index");
  }
}
