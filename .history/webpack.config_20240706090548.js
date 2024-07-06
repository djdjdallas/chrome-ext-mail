const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: "./public/background.js",
    popup: "./public/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    "supabase-js": "supabase",
  },
};
