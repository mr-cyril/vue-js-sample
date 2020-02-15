const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins:
      process.env.NODE_ENV !== "production"
        ? [new MomentLocalesPlugin({ localesToKeep: ["en", "ru"] })]
        : [new MomentLocalesPlugin({ localesToKeep: ["en", "ru"] })]
  }
};
