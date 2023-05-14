const path = require("path");

module.exports = {
  entry: "./src/options.js",
  mode: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-options.js",
  },
};
