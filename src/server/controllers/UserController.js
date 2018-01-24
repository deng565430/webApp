import { route, GET } from "awilix-koa"; // or `awilix-router-core`

@route("/users")
export default class UserAPI {
  constructor({ userService }) {
    this.userService = userService;
  }

  @route("/:id")
  @GET()
  async getUser(ctx) {
    const result = await this.userService.get(ctx.params.id);
    console.log(result);
    ctx.body = await ctx.render("index", { data: result });
  }
}
