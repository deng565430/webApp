import _ from "lodash";
import path from "path";
import local from "./local";

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
    if (process.env.NODE_ENV === "development") {
      return config = _.extend(config, local);
    }
    if (process.env.NODE_ENV === "production") {
      return config = _.extend(config, server);
    }
  }
};

export default dev;
