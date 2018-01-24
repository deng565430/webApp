require("babel-core/register")({
  presets: ["env", ["latest-node", { target: "current" }]],
  plugins: ["transform-decorators-legacy", "transform-es2015-modules-commonjs"]
});

require("babel-polyfill");
require("./server");
